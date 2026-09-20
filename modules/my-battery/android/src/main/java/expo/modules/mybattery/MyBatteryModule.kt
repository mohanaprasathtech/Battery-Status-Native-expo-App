package expo.modules.mybattery

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.ui.ExpoUIView
import expo.modules.kotlin.records.recordFromMap
import expo.modules.ui.ModifierRegistry
import android.os.BatteryManager
import android.content.Context
import android.content.Intent
import android.content.IntentFilter

class MyBatteryModule : Module() {

  private val context
  get()=requireNotNull(appContext.reactContext)
  override fun definition() = ModuleDefinition {
    Name("MyBattery")

    Function("getBatteryLevel") {
      val batteryManager = context.getSystemService(Context.BATTERY_SERVICE) as BatteryManager
      return@Function batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
    }

    Function("isPluggedIn") {
      // ACTION_BATTERY_CHANGED is a sticky broadcast: passing a null receiver
      // returns the last broadcast Intent immediately instead of registering.
      val status = context.registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))
      val plugged = status?.getIntExtra(BatteryManager.EXTRA_PLUGGED, 0) ?: 0
      return@Function plugged != 0
    }

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

    View(MyBatteryView::class) {
      // Defines an event that the view can send to JavaScript.
      Events("onTap")
    }

    Class(MyBatteryModuleSharedObject::class) {
      Constructor {
        val instance = MyBatteryModuleSharedObject(appContext)
        return@Constructor instance
      }

      Property("count")
        .get { ref: MyBatteryModuleSharedObject ->
          ref.count
        }
        .set { ref: MyBatteryModuleSharedObject, count: Int ->
          ref.count = count
        }
    }

    ExpoUIView<MyBatteryComposeViewProps>("MyBatteryComposeView") {
      Content { props ->
        MyBatteryComposeViewContent(props)
      }
    }

    OnCreate {
      ModifierRegistry.register("myBatteryComposeModifier") { params, _, _, _ ->
        recordFromMap<MyBatteryComposeModifierParams>(params).toModifier()
      }
    }
  }
}
