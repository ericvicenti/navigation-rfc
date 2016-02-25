# NavigationExperimental

## Introduction



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

### Find Reducer

### Stack Reducer

### Tabs Reducer


## Views

### NavigationView



### NavigationAnimatedView

### NavigationCardStack

### NavigationCard

### NavigationHeader
