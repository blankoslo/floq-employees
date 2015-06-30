package no.employees

import javax.servlet.http.HttpServletRequest

import unfiltered.directives.Directive
import unfiltered.Cycle.Intent
import unfiltered.filter.request.ContextPath
import Paths._
import linx._

trait Routing { this: HandlersComponent =>

  private val Intent = Directive.Intent.Mapping[HttpServletRequest, String] { case ContextPath(_, path) => path }

  def employeeIntent: Intent[HttpServletRequest, Any] = Intent {
    case Root() => handlers.handleRoot
    case Api() => handlers.handleDescriptions
    case Employee(employeeId) => handlers.handleEmployees(Some(employeeId))
    case Employees() => handlers.handleEmployees(None)
  }
}
