import ExpoModulesCore
import ExpoUI

public class ExpoBatteryModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoBattery")

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

    View(ExpoBatteryView.self) {
      Events("onTap")
    }

    Class(ExpoBatteryModuleSharedObject.self) {
      Constructor { () -> ExpoBatteryModuleSharedObject in
        return ExpoBatteryModuleSharedObject()
      }

      Property("count") { (ref: ExpoBatteryModuleSharedObject) -> Int in
        return ref.count
      }
      .set { (ref: ExpoBatteryModuleSharedObject, count: Int) in
        ref.count = count
      }
    }

    ExpoUIView(ExpoBatterySwiftUIView.self)

    OnCreate {
      ViewModifierRegistry.register("expoBatterySwiftUIModifier") { params, appContext, _ in
        return try ExpoBatterySwiftUIModifier(from: params, appContext: appContext)
      }
    }

    OnDestroy {
      ViewModifierRegistry.unregister("expoBatterySwiftUIModifier")
    }
  }
}
