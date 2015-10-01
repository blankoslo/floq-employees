package no.employees

import java.net.{URI, URL}
import java.util
import javax.servlet.{ServletContext, FilterConfig}

import no.employees.scripts.Frontend
import no.employees.scripts.Frontend.Error
import org.eclipse.jetty.servlets.CrossOriginFilter
import slick.jdbc.JdbcBackend._
import unfiltered.filter.Plan

import scala.sys.process.Process
import scala.util.Properties
import scalaz.{\/-, -\/}

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
    .plan(HttpsForcerPlan).plan(ComponentRegistry.EmployeePlan).resources(getStaticDir()).run()

  def getStaticDir(): URL = {
    val resourceDirMarker = "index.html"
    val resourceMarkerPath: URL = this.getClass().getClassLoader.getResource(resourceDirMarker);
    // Need parent dir
    new URL(resourceMarkerPath.toString.replace(resourceDirMarker, ""))
  }

}

object LocalApplication extends App {
  private var frontendCompileProcess: Option[Process] = None

  def beforeStart(): Unit = {
    frontendCompileProcess = Frontend.runNpmWatch() match {
      case -\/(Error(msg)) => println(s"WARNING: Failed to initiate frontend compile. Error msg: $msg"); None
      case \/-(compileProcess) => println("Starting npm watch/compile"); Some(compileProcess)
    }
  }

  def getStaticDir(): URL = {
    val resourceDirMarker = "index.html"
    val resourceMarkerPath: URL = this.getClass().getClassLoader.getResource(resourceDirMarker);
    // Need parent dir
    new URL(resourceMarkerPath.toString.replace("build/resources/main/" + resourceDirMarker, "frontend/public"))
  }

    beforeStart()
    unfiltered.jetty.Server.http(Properties.envOrElse("PORT", "8081").toInt).plan(new EmployeesCrossOriginFilter)
      .plan(ComponentRegistry.EmployeePlan).resources(getStaticDir()).run()
}

object DatabaseConfig {

  def transformDatabaseUrl(originalUrl: String) : String = {
    val dbUri = new URI(originalUrl)
    val username: String = dbUri.getUserInfo.split(":"){0};
    val password: String = dbUri.getUserInfo.split(":"){1};
    "jdbc:postgresql://" + dbUri.getHost + ':' + dbUri.getPort + dbUri.getPath + "?user=" + username + "&password=" + password;
  }

  val jdbcUrl = {
    val databaseUrl : Option[String] = Option(System.getenv("DATABASE_URL"))
    databaseUrl match{
      case Some(value) => transformDatabaseUrl(value)
      case None => "jdbc:postgresql://horton.elephantsql.com:5432/ymzbexfr?user=ymzbexfr&password=v64te7Ce6pvw7GanC9V6N7dI81ZZaAdV" //default to DEV-db 
    }
  }
  val driver: String = "org.postgresql.Driver"
}

trait DataSourceComponent {
  val jdbcURL: String
  val driver: String
  val database: DatabaseDef = Database.forURL(jdbcURL, driver = driver)
}

trait EnvironmentComponent {
  object Environments extends Enumeration {
    type Environment = Value
    val DEV, TEST, PROD = Value
  }

  private val envString = Option(System.getenv("ENV")).getOrElse("DEV").toUpperCase
  val env = Environments.withName(envString)
}

object ComponentRegistry extends EmployeeRepoComponent with DataSourceComponent with EmployeeHandlerComponent with RoutingComponent with EnvironmentComponent {

  override lazy val driver: String = DatabaseConfig.driver
  override lazy val jdbcURL = DatabaseConfig.jdbcUrl

  val employeeRepo = new EmployeeRepo
  val employeeHandler = new EmployeeHandler
  val routing = new Routing

  object EmployeePlan extends Plan {
    def intent = routing.employeeIntent
  }
}
