package no.employees

import linx.Linx
import linx.Root

object Paths {

  val Static = Root / "index.html"
  val Api = Root / "api"
  val Employees = Api / "employees"
  val Employee = Employees / 'employeeid

  object -/ {
    def apply(linx: Linx[_, _]): String = apply(linx.toString())
    def apply(url: String): String = url.drop(1)
  }
}
