package no.employees

import java.net.{URI, URL}
import java.util
import javax.servlet.{ServletContext, FilterConfig}

import org.eclipse.jetty.servlets.CrossOriginFilter
import slick.jdbc.JdbcBackend._
import unfiltered.filter.Plan

import scala.util.Properties

class EmployeesCrossOriginFilter extends CrossOriginFilter {

  override def init(filterConfig: FilterConfig) {
    val allowedOriginsConfig: String =  "*"
    val allowedMethodsConfig: String = "GET,POST,HEAD"
    val allowedHeadersConfig = "X-Requested-With,Content-Type,Accept,Origin, Authorization"
    val preflightMaxAgeConfig: String = "1800"
    val allowedCredentialsConfig: String =  "true"
    val exposedHeadersConfig: String = ""
    val chainPreflightConfig: String =  "false"

    super.init(new FilterConfig {
      def getFilterName: String = "cross-origin"

      def getInitParameterNames: util.Enumeration[String] = null

      def getInitParameter(name: String): String = {
        name match {
          case CrossOriginFilter.ALLOWED_ORIGINS_PARAM => allowedOriginsConfig
          case CrossOriginFilter.ALLOWED_METHODS_PARAM => allowedMethodsConfig
          case CrossOriginFilter.ALLOWED_HEADERS_PARAM => allowedHeadersConfig
          case CrossOriginFilter.PREFLIGHT_MAX_AGE_PARAM => preflightMaxAgeConfig
          case CrossOriginFilter.ALLOW_CREDENTIALS_PARAM => allowedCredentialsConfig
          case CrossOriginFilter.EXPOSED_HEADERS_PARAM => exposedHeadersConfig
          case CrossOriginFilter.CHAIN_PREFLIGHT_PARAM => chainPreflightConfig
          case _ => null
        }
      }
      def getServletContext: ServletContext = null


    })
  }
}

object Application extends App {
  unfiltered.jetty.Server.http(Properties.envOrElse("PORT", "8081").toInt).plan(new EmployeesCrossOriginFilter)
    .plan(ComponentRegistry.EmployeePlan).resources(getStaticDir()).run()

  def getStaticDir(): URL = {
    val resourceDirMarker = "index.html"
    val resourceMarkerPath: URL = this.getClass().getClassLoader.getResource(resourceDirMarker);
    // Need parent dir
    new URL(resourceMarkerPath.toString.replace(resourceDirMarker, ""))
  }

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
      case None => "jdbc:postgresql://horton.elephantsql.com:5432/ymzbexfr?user=ymzbexfr&password=v64te7Ce6pvw7GanC9V6N7dI81ZZaAdV"
    }
  }
  val driver: String = "org.postgresql.Driver"
}

trait DataSourceComponent {
  val jdbcURL: String
  val driver: String
  val database: DatabaseDef = Database.forURL(jdbcURL, driver = driver)
}

object ComponentRegistry extends EmployeeRepoComponent with DataSourceComponent with EmployeeHandlerComponent with RoutingComponent {

  override lazy val driver: String = DatabaseConfig.driver
  override lazy val jdbcURL = DatabaseConfig.jdbcUrl

  val employeeRepo = new EmployeeRepo
  val employeeHandler = new EmployeeHandler
  val routing = new Routing

  object EmployeePlan extends Plan {
    def intent = routing.employeeIntent
  }
}
