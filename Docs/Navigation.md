# Navigation

There are many ways to handle navigation in React Native. This document goes over the existing options and how they compare with the new Navigation library

## Navigation
We tentatively support adoption of the new navigation API because it allows developers to easily reason about the navigation of their app. It enables mixed use of native and JS navigation views, and greatly increases the customizability of JS driven animations and gestures.

### Control Flow and Navigation Stacks

### Actions and Reducers
The entire navigation state of your app can be modeled with NavigationStacks. NavigationActions allow your app to request changes in the navigation stacks, to be handled with NavigationReducer.

### Animations
NavigationAnimatedStackView is the spiritual successor to Navigator. In addition to adopting a declaritive API, it uses the Animated library to delegate animations and gestures to the scenes. 

NavigationCard and NavigationHeader are the included implementations of scenes and overlays for NavigationAnimatedStackView, which should look similar to platform conventions.

## Navigator - Legacy
Origionally released alongside React Native, Navigator is a JS implementation of an animated navigation stack with a customizable header. 

Navigator has a stateful API, which goes against the React philosophy of single directional data flow. Instead of defining the current navigation state, Navigator asks the developer to define the initial set of routes, and provides a way of mutating them. In complicated apps with several nested navigators, this can be difficult to manage.

The animation code predates the Animated library, so customization is obscure and complicated. Additionally, the gesture logic is tightly integrated with the Navigator component, which makes it impossible to customize the gestures. 

## NavigatorIOS - Needs Support
A component that bridges to a native iOS navigation controller. While it allows developers to use the native header and back-swipe gesture, they can not be very well customized.

NavigatorIOS also suffers from a stateful API similar to Navigator. Because NavigatorIOS is not widely used at Facebook, it is maintained by the community. Hopefully a contributor steps up and converts it to a declaritive API that can be used with the Navigation library.  

## Native Navigation
Some apps only use React to render part of the application. Such apps are likely to use native navigation views. It can be difficult to keep react navigation in sync with the native code.

It is critical to keep the truth of your nav logic in one place. If you have an existing native app then it will likely already be in native. In this case, navigation actions should be passed over the bridge to the native navigation state, which can then pass a navigation stack into the props of the react view. Or your JS code can hold the navigation state and inform the native code when a navigation should happen.
