package no.employees

import javax.sql.DataSource
import org.h2.jdbcx.JdbcDataSource;
import slick.driver.JdbcDriver.simple._

trait InMemDBEnvironment extends EmployeeRepoComponent with PlanComponent with DataSourceComponent {

  val dataSource: DataSource = {
    val ds = new JdbcDataSource
    ds.setURL("jdbc:h2:mem:test1")
    ds
  }

  val employeeRepo = new EmployeeRepo
  val employeePlan = new EmployeePlan
}

trait DBTestData{this: InMemDBEnvironment =>

  def createAllTables(implicit session: Session) = {
    employeeRepo.employees.ddl.create
  }
}
