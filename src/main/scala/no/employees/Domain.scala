package no.employees

case class Entity[A](id: Int, value: A)
case class Employee(id: Option[Int], firstName: String, lastName: String)

