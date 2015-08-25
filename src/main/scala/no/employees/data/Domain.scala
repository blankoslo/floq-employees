package no.employees.data

import java.net.URL
import java.time.LocalDate

import linx.Linx
import no.employees.data.Genders.Gender

object Genders extends Enumeration {
  type Gender = Value
  val Male, Female, Other = Value
}

case class Entity[A](id: Int, value: A)

case class Employee(firstName: String,
                    lastName: String,
                    phone: String,
                    gender: Gender,
                    birthDate: LocalDate,
                    dateOfEmployment: Option[LocalDate] ,
                    terminationDate: Option[LocalDate],
                    emergencyContactName: Option[String],
                    emergencyContactPhone: Option[String],
                    emergencyContactRelation: Option[String],
                    address: Option[String],
                    postalCode: Option[String],
                    city: Option[String]);

case class ResourceDescription(name: String, link: Linx[_, _], baseUrl: URL)

case class GoogleVerifyResponse(aud: String,
                                 hd: Option[String],
                                 email: String,
                                 name: String)