import SwiftUI
import ExpoModulesCore
import ExpoUI

final class ExpoBatterySwiftUIViewProps: UIBaseViewProps {
  @Field var title: String = ""
}

struct ExpoBatterySwiftUIView: ExpoSwiftUI.View {
  @ObservedObject public var props: ExpoBatterySwiftUIViewProps

  var body: some View {
    VStack {
      Text(props.title)
        .font(.headline)
      Children()
    }
  }
}
