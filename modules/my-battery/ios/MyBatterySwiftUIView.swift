import SwiftUI
import ExpoModulesCore
import ExpoUI

final class MyBatterySwiftUIViewProps: UIBaseViewProps {
  @Field var title: String = ""
}

struct MyBatterySwiftUIView: ExpoSwiftUI.View {
  @ObservedObject public var props: MyBatterySwiftUIViewProps

  var body: some View {
    VStack {
      Text(props.title)
        .font(.headline)
      Children()
    }
  }
}
