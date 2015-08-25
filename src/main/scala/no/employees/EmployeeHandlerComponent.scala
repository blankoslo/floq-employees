package no.employees

import java.net.{URL, URI}
import javax.servlet.http.HttpServletRequest

import no.employees.data.{GoogleVerifyResponse, Genders, Employee, ResourceDescription}
import unfiltered.directives.Directives._
import unfiltered.directives.{Directive, Directives}
import unfiltered.request._
import unfiltered.response._
import JsonCodecs._
import scala.concurrent.Await
import scala.concurrent.duration.Duration
import scalaz._, Scalaz._
import argonaut._, Argonaut._
import dispatch.Defaults._
import dispatch.{Http, Req, host, _}

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


    //todo verify app id?
    def signIn(): RespDirective = for {
      _ <- GET
      _ <- commit
      params <- queryParams
      token <- toDirective(params.get("id_token").flatMap(strings => strings.headOption))
      verifyResponse <- verifyToken(token)
      _ <- isDomainCorrect(verifyResponse)
    } yield JsonContent ~> Ok

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


    def getEmployees: RespDirective = for {
      _ <- GET
      _ <- commit
      employees <- toDirective(employeeRepo.getEmployeesFromRepo)
    } yield JsonContent ~> ResponseString(employees.asJson.toString)

    private def isDomainCorrect(googleVerifyResponse: GoogleVerifyResponse) = googleVerifyResponse.hd match {
      case Some("jdo.no") => Directives.success()
      case _ => Directives.failure(Unauthorized ~> ResponseString("Wrong domain"))
    }

    private def verifyToken(token: String): Directive[Any, ResponseFunction[Any], GoogleVerifyResponse] = {
      val verifyReq = url("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + token)
      val verifyResponseFuture: Future[Res] = Http(verifyReq)
      val verifyResponse: Res = Await.result(verifyResponseFuture, Duration(10, "sec"))

      verifyResponse.getStatusCode match {
        case 200 => parseBody[GoogleVerifyResponse](verifyResponse.getResponseBody)
        case _ => Directives.failure(Unauthorized ~> ResponseString("Invalid token"))
      }
    }

    private def toDirective[A, B](result: \/[A, B]): Directive[Any, ResponseFunction[Any], B] = result match {
      case \/-(success) => Directives.success(success)
      case -\/(failure) => Directives.failure(InternalServerError ~> ResponseString(failure.toString))
    }

    private def toDirective[A](maybeA: Option[A]): Directive[Any, ResponseFunction[Any], A] = maybeA match {
      case Some(a) => Directives.success(a)
      case None => Directives.failure(NotFound)
    }

    def parseBody[A](body: String)(implicit ev: DecodeJson[A]): Directive[Any, ResponseFunction[Any], A] = Parse.decodeEither[A](body)(ev) match {
      case -\/(failure) => Directives.failure(InternalServerError ~> ResponseString(failure.toString))
      case \/-(client) => Directives.success(client)
    }
  }
}
