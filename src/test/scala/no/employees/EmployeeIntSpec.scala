package no.employees

import java.time.LocalDate

import argonaut.Argonaut._
import argonaut._
import dispatch.Defaults._
import dispatch.{Http, Req, host, _}
import no.employees.JsonCodecs._
import no.employees.data.{Entity, DbTables, Employee, Genders}
import org.json4s.DefaultFormats
import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatest.{BeforeAndAfterEach, BeforeAndAfterAll, FunSuite}
import no.employees.data.EmployeesPostgresDriver.api._

import scala.concurrent.{Future, Await}
import scala.concurrent.duration.Duration
import scalaz.{-\/, \/-, \/}

@RunWith(classOf[JUnitRunner])
class EmployeeIntSpec extends FunSuite with IntegrationTestRegistry with BeforeAndAfterEach {

  val server = unfiltered.jetty.Server.anylocal.plan(EmployeePlan).start()
  lazy val myHost = host("localhost", server.portBindings.head.port)
  implicit val formats = DefaultFormats

  override def beforeEach: Unit = {
    val action = DbTables.employeeQuery.delete
    val future = database.run(action).map(\/-(_))
    future.onFailure { case (t: Throwable) => -\/(t.toString) }
    Await.result(future, Duration.Inf)
  }

  test("Post to vote should return created code") {
    val json = Employee("firstname", "lastname", "40221672", Genders.Female, LocalDate.now, Some(LocalDate.now), Some(LocalDate.now),
      Some(""), Some(""), Some(""), Some(""), Some(""), Some("")).asJson.toString
    val req = TestHelper.setJsonHeaders(myHost / "api" / "employees").setBody(json).POST

    assert(Await.result(Http(req), Duration(3, "sec")).getStatusCode == 201)
  }

  test("Post to vote should create employee in db") {
    val json = Employee("", "lastname", "40221672", Genders.Male, LocalDate.now, Some(LocalDate.now), Some(LocalDate.now),
      Some(""), Some(""), Some(""), Some(""), Some(""), Some("")).asJson.toString
    val req = TestHelper.setJsonHeaders(myHost / "api" / "employees").setBody(json).POST

    Await.result(Http(req), Duration(3, "sec"))

    employeeRepo.getEmployeesFromRepo match {
      case \/-(success) => assert(success.length == 1)
      case -\/(failure) => failure
    }
  }
}

object TestHelper {
  def setJsonHeaders(endpoint: Req): Req = {
    endpoint.setHeader("Content-Type", "application/json;charset=UTF-8")
      .setHeader("Accept", "application/json")
  }
}

