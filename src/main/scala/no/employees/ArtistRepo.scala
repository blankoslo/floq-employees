package no.employees

import no.employees.data.EmployeesPostgresDriver.api._

import no.employees.data.DbTables._
import slick.dbio.DBIO

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, Future}
import scalaz.{-\/, \/-, \/}

trait EmployeeRepoComponent {this: DataSourceComponent =>

  def employeeRepo: EmployeeRepo

  class EmployeeRepo {
    type Error = String

    def createEmployee(employee: Employee): \/[Error, Entity[Employee]] = {
        runDbAction(employees += employee)
    }

    def getEmployees: \/[Error, Seq[Entity[Employee]]]
        runDbAction(employees.list)
    }

    protected def runDbAction[A](action: DBIO[A]): \/[Error, A] = {
      val future: Future[\/[Error, A]] = database.run(action).map(\/-(_))
      future.onFailure{case (t: Throwable) => -\/(t.toString)}
      Await.result(future, Duration.Inf)
    }

  }

}
