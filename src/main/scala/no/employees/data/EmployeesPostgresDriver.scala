package no.employees.data

import com.github.tminglei.slickpg.{PgEnumSupport, ExPostgresDriver, PgArgonautSupport, PgDate2Support}

object EmployeesPostgresDriver extends ExPostgresDriver with PgDate2Support with PgArgonautSupport with PgEnumSupport {
  override val pgjson = "json"

  override val api = EmployeesDbAPI

  trait GenderEnumImplicits {
    implicit val genderTypeMapper = createEnumJdbcType("gender", Genders)
    implicit val genderListTypeMapper = createEnumListJdbcType("gender", Genders)
    implicit val genderColumnExtensionMethodsBuilder = createEnumColumnExtensionMethodsBuilder(Genders)

  }

  object EmployeesDbAPI extends API
  with DateTimeImplicits
  with ArgonautJsonImplicits
  with GenderEnumImplicits

}