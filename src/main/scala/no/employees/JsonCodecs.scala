package no.employees

import java.text.SimpleDateFormat
import java.time.{LocalTime, LocalDate}
import java.time.format.DateTimeFormatter

import argonaut.Argonaut._
import argonaut.{DecodeResult, DecodeJson, CodecJson, EncodeJson}
import linx.VariableLinx
import no.employees.data.{Genders, ResourceDescription, Employee, Entity}


object JsonCodecs {

  implicit def entitySeq[A](implicit ev: EncodeJson[A]): EncodeJson[Seq[A]] = EncodeJson(a => jArray(a.toList.map(ev.encode(_))))

  implicit def formatter: DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

  implicit def localDateEncoder: EncodeJson[LocalDate] =
    EncodeJson(s => jString(s.format(formatter)))

  implicit def localDateDecoder: DecodeJson[LocalDate] =
    implicitly[DecodeJson[String]].map(a => LocalDate.parse(a.toString, formatter)) setName "java.time.LocalDate"


  implicit def genderCodec: CodecJson[Genders.Gender] = CodecJson({
    case Genders.Male => "male".asJson
    case Genders.Female => "female".asJson
    case Genders.Other => "other".asJson
  }, c => c.focus.string match {
    case Some("male") => DecodeResult.ok(Genders.Male)
    case Some("female") => DecodeResult.ok(Genders.Female)
    case Some("other") => DecodeResult.ok(Genders.Other)
    case _ => DecodeResult.fail("Could not decode Gender enum", c.history)
  })

  implicit def employeeCodec: CodecJson[Employee] = casecodec13(Employee.apply, Employee.unapply)(
    "firstName", "lastName", "phone", "gender", "birthDate", "dateOfEmployment", "terminationDate", "emergencyContactName",
    "emergencyContactPhone", "emergencyContactRelation", "address", "postalCode", "city")

  implicit def EntityEncodeJson[A](implicit ev: EncodeJson[A]): EncodeJson[Entity[A]] = {
    EncodeJson(entity => {
      val aJson = ev.encode(entity.value)
      aJson.deepmerge(("id" := entity.id) ->: jEmptyObject)
    })
  }

  implicit def EntityDecodeJson[A](implicit ev: DecodeJson[A]): DecodeJson[Entity[A]] = DecodeJson(json => for {
    res <- ev.decode(json)
    id <- (json --\ "id").as[Int]
  } yield Entity(id, res))

  implicit def ResourceDescriptionEncodeJson: EncodeJson[ResourceDescription] = EncodeJson((desc: ResourceDescription) =>
    ("name" := desc.name) ->:
      (desc.link match {
        case l: VariableLinx[_, _] => "template" := desc.baseUrl.toString + desc.link
        case _ => "href" := desc.baseUrl.toString + desc.link
      })
      ->: jEmptyObject)
}
