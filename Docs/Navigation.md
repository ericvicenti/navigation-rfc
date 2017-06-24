# NavigationExperimental

## Navigation State

The entire navigation state of your app can be modeled with NavigationStates. A `NavigationState` is an object with a `key` and some optional arbitrary data:

```js
const myState = {
  key: 'myPage0',
  myType: 'ExamplePage',
  myParams: {foo: 'bar'},
}
```

A `NavigationParentState` contains a set of routes and has an index which refers to a particular route.

```js
const myState = {
  key: 'myAppTabs',
  routes: [
    {key: 'home'},
    {key: 'notifs'},
    {key: 'settings'},
  ],
  index: 1, // points to the 'notifs' tab
}
```

The navigation state types are available in `NavigationStateUtils`, along with a variety of utility functions which can be used to make changes to `NavigationParentState`s

## Containers

We provide a default top-level component to maintain the state of your navigation and handle persistence.

If you are using redux or flux, you will probably not need `NavigationContainer`. You can use your existing stores and providers.

### NavigationRootContainer

The developer can set the reducer for the root container, which will contain all of the navigation logic for the app. Our navigation reducers will take in the last navigation state, an action that we need to handle, and it will output a new navigation state for our app. To get the initial state, the reducer will be called without a previous state or an action.

```js
<NavigationRootContainer
  reducer={MyReducer}
  renderNavigation={(navigationState, onNavigate) => (
    <Text>Currently at {navigationState.routes[navigationState.index]}</Text>
```

It also provides a handler for navigation actions, and allows the reducer to be customised:


### NavigationContainer.create

It can be very tedious to pass the `onNavigate` prop around throughout your entire application. To alleviate this, we have provided a higher-order "container" component that you can use to provide components with this prop, so long as they are rendered under a `NavigationRootContainer`:

```js
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

A navigation reducer is an action handler that returns the current navigation state. When calling navigation reducers, you provide an optional previous state, and a navigation action with a `type` string.

```js
let state = MyReducer(null, { type: 'InitialAction' });
> {
    key: 'Root',
    index: 0,
    routes: [
      {key: 'Home'},
    ]
  }

state = MyReducer(state, { type: 'PushPerson', name: 'Christopher' });
> {
    key: 'Root',
    index: 1,
    routes: [
      {key: 'Home'},
      {key: 'Person0', name: 'Christopher'},
    ]
  }
```

### Stack Reducer

A common type of navigation logic is a 'stack', which can be handled by the stack reducer:

```js
const MyReducer = NavigationStackReducer({
  // First, define the initial parent state that will be used if there was no previous state.
  initialState: {
    key: 'Root',
    index: 0,
    routes: [
      {key: 'Home'},
    ]
  },
  getPushedReducerForAction: (action) => {
    if (action.type === 'PushPerson') {
      // We need to push some additional state, that will be defined by this reducer:
      return () => ({
        key: 'Person'+(i++),
        name: action.name,
      });
    }
    // In this case we do not need to push, so our reducer for this action is nothing
    return null;
  },
});

let state = MyReducer(null, { type: 'InitAction' });
> {
    key: 'Root',
    index: 0,
    routes: [
      {key: 'Home'},
    ]
  }

state = MyReducer(state, { type: 'PushPerson', name: 'Christopher' });
> {
    key: 'Root',
    index: 1,
    routes: [
      {key: 'Home'},
      {key: 'Person0', name: 'Christopher'},
    ]
  }

// The back action can be used to pop:
state = MyReducer(state, NavigationRootContainer.getBackAction());
> {
    key: 'Root',
    index: 0,
    routes: [
      {key: 'Home'},
    ]
  }
```

Usage of the stack reducer can also include sub-reducers, which will require you to implement `getReducerForState`. This will return a sub-reducer for a given sub-state. The sub-reducer for the active sub-state will be used.

### Tabs Reducer

Tabs reducer allows you to have several sub-reducers, with one 'active' one. For each action that is sent to the tabs reducer, it will first attempt to use the active sub-reducer. If the reducer does not return a new sub-state, then the other reducers will get a chance to handle it. If a different tab reducer does handle it, the tabs reducer will apply the new sub-state and switch the active tab.

### Find Reducer

A common pattern with reducers is to combine several reducers, and stop when one reducer has returned a new state. The find reducer takes an array of reducers and returns a reducer that will iterate through each one of them until the state has changed. If none of them provide a new state, the find reducer will return the default state.

## Views

### NavigationView

A simple view that will render a scene for the currently presented sub-state. The most common use-case is for tabs, where no transition is needed.

### NavigationAnimatedView

[NavigationAnimatedView](AnimatedView.md) is the spiritual successor to Navigator. In addition to adopting a declaritive API, it uses the Animated library to delegate animations and gestures to the scenes. 

Basically, NavigationAnimatedView acts as a controlled component that takes the `navigationState` and redners the scenes and header (as overlay).

```
<NavigationAnimatedView
  navigationState={navigationState}
  renderScene={renderScene}
  renderOverlay={renderOverlay}
/>
```

The interface of the functions `renderScene` and `renderOverlay` should be defines as the following snippets:

```
function renderOverlay(props: NavigationSceneRendererProps): ReactElement {
  return <View><Text>overlay {props.scene.navigationState.key}</Text></View>
}

function renderScene(props: NavigationSceneRendererProps): ReactElement {
  return <View><Text>scene {props.scene.navigationState.key}</Text></View>
}
```

Note that the param `props` is prepared by the NavigationAnimatedView as read-only object that contains the information we need to render the scenes, headers.

For your convenience, we have prepared the components NavigationCard and NavigationHeader that are the included implementations of scenes and overlays for NavigationAnimatedView, which are intended to look similar to platform conventions.

### NavigationCard

```js
<NavigationAnimatedView
  navigationState={navigationState}
  renderScene={renderCard}
/>
```

and the scene renderer

```
function renderCard(props: NavigationSceneRendererProps): ReactElement {
  return (
    <NavigationCard
       {...props}
       renderScene={renderScene}
    />
  );
}

function renderScene(props: NavigationSceneRendererProps): ReactElement {
  return <View><Text>scene {props.scene.navigationState.key}</Text></View>
}
```

By default, NavigationCard has built-in gesture and animation. If you'd like to use customized geesture or animation style, you can simply do this:

```
function renderCard(props: NavigationSceneRendererProps): ReactElement {
  return (
    <NavigationCard
       {...props}
       style={NavigationCardStackStyleInterpolator.forHorizontal(props)}
       pandlers={NavigationLinearPanResponder.forHorizontal(props)}
       renderScene={renderScene}
    />
  );
}
```

The prop `style` can be the interpolated animation style, and the prop `pandlers` can be a object that makes to the pan responder handlers.

### NavigationHeader

```js
<NavigationAnimatedView
  navigationState={navigationState}
  renderOverlay={renderOverlay}
/>
```

and the header renderer

```
function renderOverlay(props: NavigationSceneRendererProps): ReactElement {
  return <NavigationHeader {...props} />
}
```

### NavigationCardStack

A component that wraps `NavigationAnimatedView` and automatically renders a `NavigationCard` for each scene. Similar to the legacy `Navigator` because the animations and gestures are built-in.

Usage:

```js
render() {
  return (
    <NavigationCardStack
      style={styles.main}
      renderScene={props =>
        <MyPetView
          name={props.navigationState.key}
          species={props.navigationState.species}
        />
      }
      renderOverlay={props => <NavigationHeader {...props} />}
      navigationState={{
        key: 'MyPetStack',
        index: 2,
        routes: [
          {key: 'Pluto', species: 'dog'},
          {key: 'Snoopy', species: 'dog'},
          {key: 'Garfield', species: 'cat'},
        ]
      }}
    />
  );
}
```

[See the working example code in UIExplorer](https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/NavigationExperimental/NavigationCardStackExample.js)
