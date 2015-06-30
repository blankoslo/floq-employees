package no.employees

import java.net.{URI, URL}

import slick.jdbc.JdbcBackend._
import unfiltered.filter.Plan

import scala.util.Properties



trait Application extends App {



  unfiltered.jetty.Server.http(Properties.envOrElse("PORT", "8081").toInt)
    .plan(ComponentRegistry.EmployeePlan).run()
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

object ComponentRegistry extends EmployeeRepoComponent with DataSourceComponent with HandlersComponent with Routing {

  override lazy val driver: String = DatabaseConfig.driver
  override lazy val jdbcURL = DatabaseConfig.jdbcUrl

  val employeeRepo = new EmployeeRepo
  val handlers = new Handlers

  object EmployeePlan extends Plan {
    def intent = employeeIntent
  }
}
