# Navigation Landscape

There are many ways to handle navigation in React Native. This document goes over the various built-in options

## NavigationExperimental
We tentatively support adoption of the new navigation API because it allows developers to easily reason about the navigation of their app. It enables mixed use of native and JS navigation views, and greatly increases the customizability of JS-driven animations and gestures.

## Navigator - Legacy
Originally released alongside React Native, `<Navigator>` is a JS implementation of an animated navigation view with a customizable header. 

Navigator has a stateful API, which goes against the React philosophy of single directional data flow. Instead of defining the current navigation state, Navigator asks the developer to define the initial set of routes, and provides a way to mutate them. In complicated apps with several nested navigators, this can be tedious to manage.

The Navigator animation code predates the Animated library, so customization is obscure and complicated. Additionally, the gesture logic is tightly integrated with the Navigator component, which makes it impossible to customize the gestures. 

## NavigatorIOS - Needs Support
A component that bridges to a native iOS navigation controller. While it allows developers to use the native header and back-swipe gesture, they can not be very well customized.

NavigatorIOS also suffers from a stateful API similar to Navigator. Because NavigatorIOS is not widely used at Facebook, it is maintained by the community. Contributors are welcome to switch it to a declaritive API that can be used with the Navigation library.
