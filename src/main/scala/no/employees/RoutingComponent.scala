package no.employees

import javax.servlet.http.HttpServletRequest

import unfiltered.directives.Directive
import unfiltered.Cycle.Intent
import unfiltered.filter.request.ContextPath
import Paths._
import linx._

trait RoutingComponent { this: EmployeeHandlerComponent =>

  def routing: Routing

  class Routing {

    private val Intent = Directive.Intent.Mapping[HttpServletRequest, String] { case ContextPath(_, path) => path }

    def employeeIntent: Intent[HttpServletRequest, Any] = Intent {
      case Root() => employeeHandler.handleRoot
      case Api() => employeeHandler.handleDescriptions
      case Employee(employeeId) => employeeHandler.handleEmployees(Some(employeeId))
      case Employees() => employeeHandler.handleEmployees(None)
      case Genders() => employeeHandler.getGenders
      case Signin() => employeeHandler.signIn()
    }
  }
}
