package no.employees.data

import java.net.URL

import linx.Linx

case class Entity[A](id: Int, value: A)
case class Employee(firstName: String, lastName: String)

case class ResourceDescription(name: String, link: Linx[_, _], baseUrl: URL)

