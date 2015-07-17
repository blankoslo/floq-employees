package no.employees.data

import java.time.LocalDate

import no.employees.data.Genders.Gender
import slick.lifted.TableQuery
import EmployeesPostgresDriver.api._

object DbTables {

  class Employees(tag: Tag) extends Table[Entity[Employee]](tag, "employees") {
    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def firstName = column[String]("first_name")
    def lastName = column[String]("last_name")
    def phone = column[String]("phone")
    def gender = column[Gender]("gender")
    def birthDate = column[LocalDate]("birth_date")
    def dateOfEmployment = column[Option[LocalDate]]("date_of_employment")
    def terminationDate = column[Option[LocalDate]]("termination_date")
    def emergencyContactName = column[Option[String]]("emergency_contact_name")
    def emergencyContactPhone = column[Option[String]]("emergency_contact_phone")
    def emergencyContactRelation = column[Option[String]]("emergency_contact_relation")
    def address = column[Option[String]]("address")
    def postalCode = column[Option[String]]("postal_code")
    def city = column[Option[String]]("city")

    def * = (id, (firstName, lastName, phone, gender, birthDate, dateOfEmployment, terminationDate, emergencyContactName,
      emergencyContactPhone, emergencyContactRelation, address, postalCode, city)).shaped <>( {
      case (id, employeeInfo) => Entity(id, Employee.tupled.apply(employeeInfo))
    }, { (employee: Entity[Employee]) => {
      Some((employee.id, Employee.unapply(employee.value).get))
    }
    })
  }
  val employeeQuery = TableQuery[Employees]
}
