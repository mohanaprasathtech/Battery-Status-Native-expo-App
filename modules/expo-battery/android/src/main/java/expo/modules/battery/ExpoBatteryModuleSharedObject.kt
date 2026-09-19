package expo.modules.battery

import expo.modules.kotlin.AppContext
import expo.modules.kotlin.sharedobjects.SharedObject

class ExpoBatteryModuleSharedObject(appContext: AppContext) : SharedObject(appContext) {
  var count: Int = 0

  override fun sharedObjectDidRelease() {
    super.sharedObjectDidRelease()
  }
}
