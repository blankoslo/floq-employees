package no.employees

import java.net.URL
import javax.servlet.http.HttpServletRequest

import argonaut.{Parse, DecodeJson}
import dispatch._
import no.employees.data.{GoogleVerifyResponse, User}
import unfiltered.directives.{Directives, Directive}
import unfiltered.Cycle.Intent
import unfiltered.filter.request.ContextPath
import Paths._
import linx._
import unfiltered.request.{Authorization, GET}
import unfiltered.response._

import unfiltered.request._
import unfiltered.directives.Directives._

import scala.concurrent.Await
import scala.concurrent.duration.Duration
import scalaz.{-\/, \/-, \/}

import dispatch.Defaults._
import dispatch.{Http, Req, host, _}

import JsonCodecs._

trait AuthenticationModule {

  private val baseUrl: Directive[HttpServletRequest, Nothing, URL] = request[HttpServletRequest].map(req => {
    val requestUrl = new URL(req.underlying.getRequestURL.toString)
    new URL(requestUrl.getProtocol, requestUrl.getHost, requestUrl.getPort, "")
  })

    //todo verify app id?
    def withAuth = for {
      tokenIterator <- headers("Authorization")
      token <- toDirective(tokenIterator.toSeq.headOption, Unauthorized)
      googleResponse <- verifyToken(token)
      _ <- isDomainCorrect(googleResponse)
    } yield User("yo", "yo")


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

  private def toDirective[A](maybeA: Option[A], error: ResponseFunction[Any]): Directive[Any, ResponseFunction[Any], A] = maybeA match {
    case Some(a) => Directives.success(a)
    case None => Directives.failure(error)
  }

  def parseBody[A](body: String)(implicit ev: DecodeJson[A]): Directive[Any, ResponseFunction[Any], A] = Parse.decodeEither[A](body)(ev) match {
    case -\/(failure) => Directives.failure(InternalServerError ~> ResponseString(failure.toString))
    case \/-(client) => Directives.success(client)
  }


}


trait RoutingComponent extends AuthenticationModule{ this: EmployeeHandlerComponent =>

  def routing: Routing

  class Routing {

    private val Intent = Directive.Intent.Mapping[HttpServletRequest, String] { case ContextPath(_, path) => path }

    def employeeIntent: Intent[HttpServletRequest, Any] = Intent {
      case Api() => withAuth.flatMap(employeeHandler.handleDescription)
      case Employee(employeeId) => withAuth.flatMap(employeeHandler.handleEmployees(Some(employeeId)))
      case Employees() => withAuth.flatMap(employeeHandler.handleEmployees(None))
      case Genders() => employeeHandler.getGenders
    }
  }
}
