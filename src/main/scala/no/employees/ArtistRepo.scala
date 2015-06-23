package no.employees

import slick.driver.JdbcDriver.simple._
import slick.jdbc.JdbcBackend.Database.dynamicSession

trait EmployeeRepoComponent {this: DataSourceComponent =>

  def employeeRepo: EmployeeRepo

  class EmployeeRepo {

    class Employees(tag: Tag) extends Table[Employee](tag, "employees") {
      def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
      def firstName = column[String]("first_name")
      def lastName = column[String]("last_name")
      def * = (id.?, firstName, lastName) <> (Employee.tupled, Employee.unapply)
    }

    val employees = TableQuery[Employees]

    def createEmployee(employee: Employee) = {
      Database.forDataSource(dataSource) withDynSession  {
        employees += employee
      }
    }

    def getEmployees() : List[Employee] = {
      Database.forDataSource(dataSource) withDynSession  {
        employees.list
      }
    }
  }
}
