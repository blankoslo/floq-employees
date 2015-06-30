package no.employees

import argonaut.Argonaut._
import argonaut.{DecodeJson, CodecJson, EncodeJson}
import linx.VariableLinx
import no.employees.data.{ResourceDescription, Employee, Entity}


object JsonCodecs {

  implicit def entitySeq[A](implicit ev: EncodeJson[A]): EncodeJson[Seq[A]] = EncodeJson(a => jArray(a.toList.map(ev.encode(_))))

  implicit def sourceCodec: CodecJson[Employee] = casecodec2(Employee.apply, Employee.unapply)("firstName", "lastName")

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
