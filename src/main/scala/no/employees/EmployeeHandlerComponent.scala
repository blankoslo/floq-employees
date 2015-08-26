package no.employees

import java.net.{URL, URI}
import javax.servlet.http.HttpServletRequest


import dispatch.Defaults._
import dispatch.{Http, Req, host, _}
import no.employees.data._
import unfiltered.directives.Directives._
import unfiltered.directives.{Directive, Directives}
import unfiltered.request._
import unfiltered.response._
import JsonCodecs._
import scala.concurrent.Await
import scala.concurrent.duration.Duration
import scalaz._, Scalaz._
import argonaut._, Argonaut._


trait RequestHandler {

  val requestBody: Directive[Any, Nothing, JsonField] = request[Any].map(Body.string)

  val baseUrl: Directive[HttpServletRequest, Nothing, URL] = request[HttpServletRequest].map(req => {
    val requestUrl = new URL(req.underlying.getRequestURL.toString)
    new URL(requestUrl.getProtocol, requestUrl.getHost, requestUrl.getPort, "")
  })

  def toDirective[A, B](result: \/[A, B]): Directive[Any, ResponseFunction[Any], B] = result match {
    case \/-(success) => Directives.success(success)
    case -\/(failure) => Directives.failure(InternalServerError ~> ResponseString(failure.toString))
  }

  def toDirective[A](maybeA: Option[A], error: ResponseFunction[Any]): Directive[Any, ResponseFunction[Any], A] = maybeA match {
    case Some(a) => Directives.success(a)
    case None => Directives.failure(error)
  }

  def parseBody[A](body: String)(implicit ev: DecodeJson[A]): Directive[Any, ResponseFunction[Any], A] = Parse.decodeEither[A](body)(ev) match {
    case -\/(failure) => Directives.failure(InternalServerError ~> ResponseString(failure.toString))
    case \/-(client) => Directives.success(client)
  }

}

trait EmployeeHandlerComponent extends RequestHandler{ this: EmployeeRepoComponent =>

  def employeeHandler: EmployeeHandler

  class EmployeeHandler {

    type RespDirective = Directive[HttpServletRequest, ResponseFunction[Any], ResponseFunction[Any]]
    type AuthRespDirective = (User) => Directive[HttpServletRequest, ResponseFunction[Any], ResponseFunction[Any]]

    def handleDescription: AuthRespDirective = t =>
      for {
        _ <- GET
        _ <- commit
        base <- baseUrl

        descriptions <- toDirective(\/-(List(
          ResourceDescription("genders", Paths.Genders, base),
          ResourceDescription("employees", Paths.Employees, base),
          ResourceDescription("employee", Paths.Employee, base))))
      } yield JsonContent ~> ResponseString(descriptions.asJson.toString)

    def getGenders: AuthRespDirective = t =>
      for {
        _ <- GET
        _ <- commit
      } yield JsonContent ~> ResponseString(Genders.values.asJson.toString)


    def handleEmployees(employeeId: Option[String]): AuthRespDirective = t => {
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
  }
}
