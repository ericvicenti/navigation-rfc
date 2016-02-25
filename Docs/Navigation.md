# NavigationExperimental

## Navigation State

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

The navigation state types are available in `NavigationStateUtils`, along with a variety of utility functions which can be used to make changes to `NavigationParentState`s

## Containers

We provide a default top-level component to maintain the state of your navigation and handle persistence.

If you are using redux or flux, you will probably not need `NavigationContainer`. You can use your existing stores and providers.

### NavigationRootContainer

The developer can set the reducer for the root container, which will contain all of the navigation logic for the app. Our navigation reducers will take in the last navigation state, an action that we need to handle, and it will output a new navigation state for our app. To get the initial state, the reducer will be called without a previous state or an action.

```
<NavigationRootContainer
  reducer={MyReducer}
  renderNavigation={(navigationState, onNavigate) => (
    <Text>Currently at {navigationState.children[navigationState.index]}</Text>
```

It also provides a handler for navigation actions, and allows the reducer to be customised:


### NavigationContainer.create

It can be very tedious to pass the `onNavigate` prop around throughout your entire application. To aleviate this, we have provided a higher-order "container" component that you can use to provide components with this prop, so long as they are rendered under a `NavigationRootContainer`:

```
<NavigationRootContainer
  reducer={MyReducer}
  renderNavigation={(navigationState) => <ExampleComponent />}
...

class ExampleComponent {
  render() {
    <Text onPress={() => { this.props.onNavigate(new ExampleAction()) }}>
      This action will work, even though `onNavigate` was not directly passed in
    </Text>
  }
}
ExampleComponent = NavigationContainer.create(ExampleComponent);
```

If `onNavigate` is actually passed to the container as a prop, it will override the handler for the contained component and for all sub-containers.

## Reducers

A navigation reducer is a function that returns the current state for a given previous state and an action that is being taken on it.

### Find Reducer

### Stack Reducer

### Tabs Reducer


## Views

### NavigationView

A simple view that will render a scene for the currently presented sub-state. The most common use-case is for tabs, where no transition is needed.

### NavigationAnimatedView

[NavigationAnimatedView](AnimatedView.md) is the spiritual successor to Navigator. In addition to adopting a declaritive API, it uses the Animated library to delegate animations and gestures to the scenes. 

NavigationCard and NavigationHeader are the included implementations of scenes and overlays for NavigationAnimatedView, which are intended to look similar to platform conventions.

### NavigationCardStack

### NavigationCard

### NavigationHeader
