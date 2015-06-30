//package no.employees
//
//import javax.sql.DataSource
//import no.employees.data.DbTables
//import org.h2.jdbcx.JdbcDataSource;
//import slick.driver.JdbcDriver.simple._
//
//trait InMemDBEnvironment extends EmployeeRepoComponent with HandlersComponent with DataSourceComponent {
//
//  val dataSource: DataSource = {
//    val ds = new JdbcDataSource
//    ds.setURL("jdbc:h2:mem:test1")
//    ds
//  }
//
//  val employeeRepo = new EmployeeRepo
//}
//
//trait DBTestData{this: InMemDBEnvironment =>
//
//  def createAllTables(implicit session: Session) = {
//    DbTables.employeeQuery.ddl.create
//  }
//}
