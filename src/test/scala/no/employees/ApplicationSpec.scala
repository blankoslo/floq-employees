package no.employees

import no.employees.data.{Genders, Employee}
import org.junit.runner.RunWith
import org.scalatest.FunSuite
import org.scalatest.junit.JUnitRunner
import slick.backend.DatabaseConfig


@RunWith(classOf[JUnitRunner])
class ApplicationSpec extends FunSuite {

  test("Sending a URL to the transformUrl-function should return a correctly formed URL") {

    val originalUrl = "postgres://chjm:S6_VzWYkWzWxCK9ppUn4jVv6yUNX-r@horton.elephantsql.com:5432/chjm"

    val transformedUrl = DatabaseConfig.transformDatabaseUrl(originalUrl)

    assert(transformedUrl == "jdbc:postgresql://horton.elephantsql.com:5432/chjm?user=chjm&password=S6_VzWYkWzWxCK9ppUn4jVv6yUNX-r")
  }

}
