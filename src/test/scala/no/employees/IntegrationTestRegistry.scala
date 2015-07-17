package no.employees

import unfiltered.filter.Plan

trait IntegrationTestRegistry extends EmployeeRepoComponent with EmployeeHandlerComponent with DataSourceComponent with RoutingComponent {

  val employeeRepo = new EmployeeRepo
  val employeeHandler = new EmployeeHandler
  val routing = new Routing

  object EmployeePlan extends Plan {
    def intent = routing.employeeIntent
  }

  override lazy val driver: String = DatabaseConfig.driver
  override lazy val jdbcURL = "jdbc:postgresql://horton.elephantsql.com:5432/laxvgaoy?user=laxvgaoy&password=aGv3zZYWNsehP-kL0ly7k3B9xNvxgGdv"

}
