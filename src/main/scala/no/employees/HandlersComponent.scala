package no.employees

import java.net.{URL, URI}
import javax.servlet.http.HttpServletRequest

import no.employees.data.ResourceDescription
import unfiltered.directives.Directives._
import unfiltered.directives.{Directive, Directives}
import unfiltered.request._
import unfiltered.response._
import JsonCodecs._
import scalaz._, Scalaz._
import argonaut._, Argonaut._

trait HandlersComponent {
  this: EmployeeRepoComponent =>

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
        ResourceDescription("spots", Paths.Employees, base),
        ResourceDescription("spot", Paths.Employee, base))))
    } yield JsonContent ~> ResponseString(descriptions.asJson.toString)

    def handleEmployees(employeeId: Option[String]): RespDirective = {
      employeeId match {
        //case Some(_) => _
        case None => getEmployees
      }
    }

    //  def putSpot(spotId: Int): RespDirective = for {
    //    _ <- PUT
    //    _ <- commit
    //    body <- requestBody
    //    spot <- parseBody[Spot](body)
    //    spotEntity <- toDirective(updateSpotInRepo(spotId, spot))
    //  } yield JsonContent ~> ResponseString(spotEntity.asJson.toString)
    //
    //  def deleteSpot(spotId: Int): RespDirective = for {
    //    _ <- DELETE
    //    _ <- commit
    //    _ <- toDirective(deleteSpotFromRepo(spotId))
    //
    //  } yield NoContent
    //
    //  def postSpot: RespDirective = for {
    //    _ <- POST
    //    _ <- commit
    //    body <- requestBody
    //    spot <- parseBody[Spot](body)
    //    spotEntity <- toDirective(saveSpotToRepo(spot))
    //  } yield JsonContent ~> ResponseString(spotEntity.asJson.toString)

    def getEmployees: RespDirective = for {
      _ <- GET
      _ <- commit
      spots <- toDirective(employeeRepo.getEmployeesFromRepo)
    } yield JsonContent ~> ResponseString(spots.asJson.toString)

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
