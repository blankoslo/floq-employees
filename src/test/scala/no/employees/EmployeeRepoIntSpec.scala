import org.junit.runner.RunWith
import org.scalatest.junit.JUnitRunner
import org.scalatest.FunSuite

@RunWith(classOf[JUnitRunner])
class ExampleSuite extends FunSuite {
  test("An empty Set should have size 0") {
    assert(Set.empty.size == 0)
  }
}