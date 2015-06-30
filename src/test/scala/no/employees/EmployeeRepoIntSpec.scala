package no.employees

import dispatch.Req
import org.junit.runner.RunWith
import org.specs2.mutable.Specification
import org.specs2.runner.JUnitRunner
import org.specs2.specification.{BeforeExample, Before, Fragments, Step}

import slick.driver.JdbcDriver.simple._

object databaseSetup extends InMemDBEnvironment with DBTestData  {

  implicit val session = DatabaseConfig.forDataSource(dataSource).createSession()

  lazy val createDb = {
    createAllTables
    println("creating the database")
  }

  def cleanEmployeeTable = {
    employeeRepo.employees.ddl.drop
    employeeRepo.employees.ddl.create
  }

  lazy val closeSession = {
    session.close
    println("closing session")
  }
}

@RunWith(classOf[JUnitRunner])
class EmployeeRepoIntSpec extends Specification with InMemDBEnvironment with BeforeExample {

  sequential

  lazy val dbSetup = databaseSetup
  override def map(fs: =>Fragments) = Step(dbSetup.createDb)  ^ fs ^ Step(dbSetup.closeSession)

  override def before = {
    println("cleaning employeeRepo table")
    dbSetup.cleanEmployeeTable
  }

  "getEmployees" should {
    "return 0 employeeRepo, if 0 is created" in {
      employeeRepo.getEmployees().length must beEqualTo(0)
    }
    "returns the same employeeRepo that is created" in {
      val employee = Employee(Some(1), "name-1", "img-1")
      employeeRepo.createEmployee(employee)
      employeeRepo.getEmployees().head must beEqualTo(employee)
    }
    "return 1 employeeRepo, if 1 is created" in {
      employeeRepo.createEmployee(Employee(Some(1), "name-1", "img-1"))
      employeeRepo.getEmployees().length must beEqualTo(1)
    }
    "return 3 employeeRepo, if 3 is created" in {
      employeeRepo.createEmployee(Employee(Some(1), "name-1", "img-1"))
      employeeRepo.createEmployee(Employee(Some(2), "name-2", "img-2"))
      employeeRepo.createEmployee(Employee(Some(3), "name-3", "img-3"))
      employeeRepo.getEmployees().length must beEqualTo(3)
    }
  }
}

object TestHelper {
  def setJsonHeaders(endpoint: Req): Req = {
    endpoint.setHeader("Content-Type", "application/json;charset=UTF-8")
      .setHeader("Accept", "application/json")
  }
}

