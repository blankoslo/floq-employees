package no.employees.data

import com.github.tminglei.slickpg.{ExPostgresDriver, PgArgonautSupport, PgDate2Support}

object EmployeesPostgresDriver extends ExPostgresDriver with PgDate2Support with PgArgonautSupport {
  override val pgjson = "json"

  override val api = EmployeesDbAPI

  object EmployeesDbAPI extends API
  with DateTimeImplicits
  with ArgonautJsonImplicits
}