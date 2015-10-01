package no.employees.scripts

import java.io.File

import scala.sys.process.{Process, ProcessLogger}
import scalaz.{-\/, \/, \/-}

object Frontend {

  case class Error(msg: String)

  case class Result(result: Int) {
    def isSuccess = result == 0
  }

  def runNpmBuild(): \/[Error, Result] = runNpmCommand("build").map(p => Result(p.exitValue()))

  def runNpmWatch(): \/[Error, Process] =  runNpmCommand("watch")

  private val getProjectRootPath: \/[Error, String] = {
    val maybeProjectRoot = for {
      className <- Frontend.getClass.getName.split('.').lastOption.map(_ + ".class")
      path <- Option(this.getClass.getResource(className)).map(_.getPath)
      projectRoot <- path.split("build").headOption
    } yield projectRoot
    maybeProjectRoot.map(\/-(_)).getOrElse(-\/(Error("Failed to find project root path")))
  }

  private def runNpmCommand(npmCommand: String): \/[Error, Process] = {
    for {
      projectRoot <- getProjectRootPath
      buildScript <- \/-(projectRoot + "buildfrontend.bash")
      p <- \/-(Process(s"$buildScript $npmCommand", new File(projectRoot)).run(ProcessLogger(s => println(s))))
    } yield p
  }
}
