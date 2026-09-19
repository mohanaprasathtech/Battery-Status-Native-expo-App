package expo.modules.battery

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.ui.ExpoUIView
import expo.modules.kotlin.records.recordFromMap
import expo.modules.ui.ModifierRegistry

class ExpoBatteryModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoBattery")

    Events("onChange")

    Constant("PI") {
      Math.PI
    }

    Function("hello") {
      "Hello world! 👋"
    }

    AsyncFunction("setValueAsync") { value: String ->
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    View(ExpoBatteryView::class) {
      // Defines an event that the view can send to JavaScript.
      Events("onTap")
    }

    Class(ExpoBatteryModuleSharedObject::class) {
      Constructor {
        val instance = ExpoBatteryModuleSharedObject(appContext)
        return@Constructor instance
      }

      Property("count")
        .get { ref: ExpoBatteryModuleSharedObject ->
          ref.count
        }
        .set { ref: ExpoBatteryModuleSharedObject, count: Int ->
          ref.count = count
        }
    }

    ExpoUIView<ExpoBatteryComposeViewProps>("ExpoBatteryComposeView") {
      Content { props ->
        ExpoBatteryComposeViewContent(props)
      }
    }

    OnCreate {
      ModifierRegistry.register("expoBatteryComposeModifier") { params, _, _, _ ->
        recordFromMap<ExpoBatteryComposeModifierParams>(params).toModifier()
      }
    }
  }
}
