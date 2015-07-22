package no.employees

import java.net.{URL, URI}
import javax.servlet.http.HttpServletRequest

import no.employees.data.{Genders, Employee, ResourceDescription}
import unfiltered.directives.Directives._
import unfiltered.directives.{Directive, Directives}
import unfiltered.request._
import unfiltered.response._
import JsonCodecs._
import scalaz._, Scalaz._
import argonaut._, Argonaut._

trait EmployeeHandlerComponent { this: EmployeeRepoComponent =>

  def employeeHandler: EmployeeHandler

  class EmployeeHandler {

    type RespDirective = Directive[HttpServletRequest, ResponseFunction[Any], ResponseFunction[Any]]
    private val requestBody: Directive[Any, Nothing, JsonField] = request[Any].map(Body.string)

    private val baseUrl: Directive[HttpServletRequest, Nothing, URL] = request[HttpServletRequest].map(req => {
      val requestUrl = new URL(req.underlying.getRequestURL.toString)
      new URL(requestUrl.getProtocol, requestUrl.getHost, requestUrl.getPort, "")
    })

    def handleRoot: RespDirective = for {
      _ <- GET
      _ <- commit
    } yield HtmlContent ~> ResponseString(
        <html>
          <head>
            <meta charset="utf-8"/>
            <link type="text/css" rel="stylesheet" href="dist/main.bundle.css"/>
            <title>Employees</title>
          </head>
          <body>
            <script src="dist/app.bundle.js"></script>
          </body>
        </html>.toString
      )

    def handleDescriptions: RespDirective = for {
      _ <- GET
      _ <- commit
      base <- baseUrl

      descriptions <- toDirective(\/-(List(
        ResourceDescription("genders", Paths.Genders, base),
        ResourceDescription("employees", Paths.Employees, base),
        ResourceDescription("employee", Paths.Employee, base))))
    } yield JsonContent ~> ResponseString(descriptions.asJson.toString)

    def getGenders: RespDirective = for {
      _ <- GET
      _ <- commit
    } yield JsonContent ~> ResponseString(Genders.values.asJson.toString)
    
    def handleEmployees(employeeId: Option[String]): RespDirective = {
      employeeId match {
        //case Some(_) => _
        case None => getEmployees | postEmployee
      }
    }

    def postEmployee: RespDirective = for {
      _ <- POST
      _ <- commit
      body <- requestBody
      employee <- parseBody[Employee](body)
      employeeEntity <- toDirective(employeeRepo.saveEmployeeToRepo(employee))
    } yield JsonContent ~> Created ~> ResponseString(employeeEntity.asJson.toString)

    def putSpot(employeeId: Int): RespDirective = for {
        _ <- PUT
        _ <- commit
        body <- requestBody
        employee <- parseBody[Employee](body)
        employeeEntity <- toDirective(employeeRepo.updateEmployeeInRepo(employeeId, employee))
      } yield JsonContent ~> Created ~> ResponseString(employeeEntity.asJson.toString)

    def deleteSpot(employeeId: Int): RespDirective = for {
        _ <- DELETE
        _ <- commit
        _ <- toDirective(employeeRepo.deleteEmployeeFromRepo(employeeId))
      } yield NoContent


    def getEmployees: RespDirective = for {
      _ <- GET
      _ <- commit
      employees <- toDirective(employeeRepo.getEmployeesFromRepo)
    } yield JsonContent ~> ResponseString(employees.asJson.toString)

    private def toDirective[A, B](result: \/[A, B]): Directive[Any, ResponseFunction[Any], B] = result match {
      case \/-(success) => Directives.success(success)
      case -\/(failure) => Directives.failure(InternalServerError ~> ResponseString(failure.toString))
    }

    def parseBody[A](body: String)(implicit ev: DecodeJson[A]): Directive[Any, ResponseFunction[Any], A] = Parse.decodeEither[A](body)(ev) match {
      case -\/(failure) => Directives.failure(InternalServerError ~> ResponseString(failure.toString))
      case \/-(client) => Directives.success(client)
    }
  }
}
