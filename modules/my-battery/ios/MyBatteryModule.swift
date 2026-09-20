import ExpoModulesCore
import ExpoUI
import UIKit

public class MyBatteryModule: Module {
  public func definition() -> ModuleDefinition {
    Name("MyBattery")

    Function("getBatteryLevel") { () -> Int in
      UIDevice.current.isBatteryMonitoringEnabled = true
      let level = UIDevice.current.batteryLevel
      // iOS returns -1 when the level is unknown (e.g. on the Simulator).
      return level < 0 ? -1 : Int((level * 100).rounded())
    }

    Events("onChange")

    Constant("PI") {
      Double.pi
    }

    Function("hello") {
      return "Hello world! 👋"
    }

    AsyncFunction("setValueAsync") { (value: String) in
      self.sendEvent("onChange", [
        "value": value
      ])
    }

    View(MyBatteryView.self) {
      Events("onTap")
    }

    Class(MyBatteryModuleSharedObject.self) {
      Constructor { () -> MyBatteryModuleSharedObject in
        return MyBatteryModuleSharedObject()
      }

      Property("count") { (ref: MyBatteryModuleSharedObject) -> Int in
        return ref.count
      }
      .set { (ref: MyBatteryModuleSharedObject, count: Int) in
        ref.count = count
      }
    }

    ExpoUIView(MyBatterySwiftUIView.self)

    OnCreate {
      ViewModifierRegistry.register("myBatterySwiftUIModifier") { params, appContext, _ in
        return try MyBatterySwiftUIModifier(from: params, appContext: appContext)
      }
    }

    OnDestroy {
      ViewModifierRegistry.unregister("myBatterySwiftUIModifier")
    }
  }
}
