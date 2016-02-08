# Navigation Landscape

There are many ways to handle navigation in React Native. This document goes over the various built-in options

## NavigationExperimental
We tentatively support adoption of the new navigation API because it allows developers to easily reason about the navigation of their app. It enables mixed use of native and JS navigation views, and greatly increases the customizability of JS-driven animations and gestures.

### Navigation State
The entire navigation state of your app can be modeled with NavigationStates. A `NavigationState` is an object with a `key` and some optional arbitrary data:

```javascript
const myState = {
  key: 'myPage0',
  myType: 'ExamplePage',
  myParams: {foo: 'bar'},
}'
```

A `NavigationParentState` contains a set of children navigation states and has an index which refers to a particular child.

```javascript
const myState = {
  key: 'myAppTabs',
  children: [
    {key: 'home'},
    {key: 'notifs'},
    {key: 'settings'},
  ],
  index: 1, // points to the 'notifs' tab
}'
```


### Actions and Reducers
A reducer is a function that returns a new state based on a previous state and an action that you are taking on it. A navigation reducer is simply a reducer that can transform the NavigationState that is used to model your nav state.

### Animations
[NavigationAnimatedView](AnimatedView.md) is the spiritual successor to Navigator. In addition to adopting a declaritive API, it uses the Animated library to delegate animations and gestures to the scenes. 

NavigationCard and NavigationHeader are the included implementations of scenes and overlays for NavigationAnimatedView, which are intended to look similar to platform conventions.

## Navigator - Legacy
Originally released alongside React Native, `<Navigator>` is a JS implementation of an animated navigation view with a customizable header. 

Navigator has a stateful API, which goes against the React philosophy of single directional data flow. Instead of defining the current navigation state, Navigator asks the developer to define the initial set of routes, and provides a way to mutate them. In complicated apps with several nested navigators, this can be tedious to manage.

The Navigator animation code predates the Animated library, so customization is obscure and complicated. Additionally, the gesture logic is tightly integrated with the Navigator component, which makes it impossible to customize the gestures. 

## NavigatorIOS - Needs Support
A component that bridges to a native iOS navigation controller. While it allows developers to use the native header and back-swipe gesture, they can not be very well customized.

NavigatorIOS also suffers from a stateful API similar to Navigator. Because NavigatorIOS is not widely used at Facebook, it is maintained by the community. Contributors are welcome to switch it to a declaritive API that can be used with the Navigation library.
