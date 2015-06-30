package no.employees

import java.net.{URI, URL}
import javax.sql.DataSource

import org.postgresql.ds.PGSimpleDataSource
import slick.jdbc.JdbcBackend._

import unfiltered.jetty.Http

import scala.util.Properties

object Application extends App {

  unfiltered.jetty.Server.http(Properties.envOrElse("PORT", "8081").toInt)
    .plan(ComponentRegistry.employeePlan).run()
}

object DatabaseConfig {
  val jdbcUrl = {
    val databaseUrl : Option[String] = Option(System.getenv("DATABASE_URL"))
    databaseUrl match{
      case Some(value) => {
        val dbUri = new URI(value)
        val username: String = dbUri.getUserInfo().split(":"){0};
        val password: String = dbUri.getUserInfo().split(":"){1};
        "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath();
      }
      case None => "jdbc:postgresql://horton.elephantsql.com:5432/tbbuzxgh?user=tbbuzxgh&password=NrwbB3-z2afCRu4yOaz7sX-nxEdgy7Cb"
    }
  }

  val driver: String = "org.postgresql.Driver"
}

trait DataSourceComponent {
  val jdbcURL: String
  val driver: String
  val database: DatabaseDef = Database.forURL(jdbcURL, driver = driver)
}

object ComponentRegistry extends EmployeeRepoComponent with DataSourceComponent with PlanComponent {

  val dataSource : DataSource = {
    val databaseUrl : Option[String] = Option(System.getenv("DATABASE_URL"))
    databaseUrl match{
      case Some(value) => {
        val dbUrl = new URI(value)
        val ds = new PGSimpleDataSource
        ds.setUser(dbUrl.getUserInfo.split(":"){0})
        ds.setPassword(dbUrl.getUserInfo.split(":"){1})
        ds.setServerName(dbUrl.getHost)
        ds.setPortNumber(dbUrl.getPort)
        ds.setDatabaseName(dbUrl.getPath.tail) //remove leading slash
        ds
      }
      case None => {
        //fallback for dev
        val ds = new PGSimpleDataSource
        ds.setDatabaseName("ymzbexfr")
        ds.setUser(Properties.envOrElse("DB_USER", "ymzbexfr"))
        ds.setPassword(Properties.envOrElse("DB_PASSWORD", "v64te7Ce6pvw7GanC9V6N7dI81ZZaAdV"))
        ds.setServerName("horton.elephantsql.com")
        ds.setPortNumber(5432)
        ds
      }
    }
  }

  val employeeRepo = new EmployeeRepo
  val employeePlan = new EmployeePlan
}
