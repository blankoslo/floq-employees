package no.employees

import org.json4s.DefaultFormats
import org.json4s.native.Serialization.{read, write}
import org.slf4j.{Logger, LoggerFactory}
import unfiltered.filter.Plan
import unfiltered.request._
import unfiltered.response.{ResponseString, _}

trait PlanComponent{this: EmployeeRepoComponent =>
  def employeePlan: EmployeePlan

  class EmployeePlan extends Plan {
    implicit val formats = DefaultFormats
    val logger : Logger = LoggerFactory.getLogger("nbrno.EmployeePlan")

    def intent = {
      case GET(Path("/api/employees")) => {
        JsonContent ~> ResponseString(write(employeeRepo.getEmployees()))
      }
    }
  }
}
