package no.employees.data

import no.employees.{Entity, Employee}
import slick.lifted.TableQuery
import EmployeesPostgresDriver.api._

import scalaz.Alpha.O

object DbTables {

  class Employees(tag: Tag) extends Table[Employee](tag, "employees") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def firstName = column[String]("first_name")
    def lastName = column[String]("last_name")
    def * = (id, (firstName, lastName)).shaped <>( {
      case (id, employeeInfo) => Entity(id, Employee.tupled.apply(employeeInfo))
    }, { (employee: Entity[Employee]) => {
      Some((employee.id, Employee.unapply(employee.value).get))
    }
    })
  }

  val employees = TableQuery[Employees]
}
