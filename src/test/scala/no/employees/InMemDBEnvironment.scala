package no.employees

import javax.sql.DataSource
import no.employees.data.{EmployeesPostgresDriver, DbTables}
import org.h2.jdbcx.JdbcDataSource;
import EmployeesPostgresDriver.api._
import slick.jdbc.JdbcBackend.DatabaseDef
import unfiltered.filter.Plan

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, Future}
import scalaz.{-\/, \/-, \/}

import scala.concurrent.ExecutionContext.Implicits.global

trait InMemDBEnvironment extends EmployeeRepoComponent with EmployeeHandlerComponent with DataSourceComponent with RoutingComponent {

//  val dataSource: DataSource = {
//    val ds = new JdbcDataSource
//    ds.setURL("jdbc:h2:mem:test1")
//    ds
//  }

  val employeeRepo = new EmployeeRepo
  val employeeHandler = new EmployeeHandler
  val routing = new Routing

  object EmployeePlan extends Plan {
    def intent = routing.employeeIntent
  }

  override lazy val driver: String = DatabaseConfig.driver
  override lazy val jdbcURL = "jdbc:postgresql://horton.elephantsql.com:5432/laxvgaoy?user=laxvgaoy&password=aGv3zZYWNsehP-kL0ly7k3B9xNvxgGdv"

}

trait DBTestData{this: InMemDBEnvironment =>

  def createAllTables = {


  }
}
