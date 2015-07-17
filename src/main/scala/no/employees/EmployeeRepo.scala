package no.employees

import no.employees.data.EmployeesPostgresDriver.api._

import no.employees.data.DbTables._
import no.employees.data.{Employee, Entity}

import slick.dbio.DBIO

import scala.concurrent.{Await, Future}
import scalaz.{-\/, \/-, \/}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration.Duration

trait EmployeeRepoComponent {this: DataSourceComponent =>

  def employeeRepo: EmployeeRepo
  
  class EmployeeRepo {
    type Error = String

    def saveEmployeeToRepo(employee: Employee): \/[Error, Entity[Employee]] = {
        runDbAction((employeeQuery.returning(employeeQuery.map(_.id))) += Entity(0, employee)).map(id => Entity(id, employee))
    }

    def getEmployeesFromRepo: \/[Error, Seq[Entity[Employee]]] = {
        runDbAction(employeeQuery.result)
    }

    def deleteEmployeeFromRepo(id: Int): \/[Error, Unit] = {
      validateOnlyOneRowAffected(runDbAction(employeeQuery.filter(_.id === id).delete), Unit)
    }

    def updateEmployeeInRepo(employeeId: Int, employee: Employee): \/[Error, Employee] = {
      validateOnlyOneRowAffected(runDbAction(employeeQuery.filter(_.id === employeeId).update(Entity(employeeId, employee))), employee)
    }

    protected def runDbAction[A](action: DBIO[A]): \/[Error, A] = {
      val future: Future[\/[Error, A]] = database.run(action).map(\/-(_))
      future.onFailure{case (t: Throwable) => -\/(t.toString)}
      Await.result(future, Duration.Inf)
    }

    private def validateOnlyOneRowAffected[A](dbResult: \/[Error, Int], returnValue: A): \/[Error, A] = {
      dbResult match {
        case \/-(1) => \/-(returnValue)
        case \/-(_) => -\/("Rows affected is not exactly 1")
        case failure@ -\/(_) => failure
      }
    }
  }
}
