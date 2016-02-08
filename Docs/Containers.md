# NavigationContainer

We provide a default top-level component to maintain the state of your navigation and handle persistence.

If you are using alternative redux providers, you may not need `NavigationContainer`.

## RootContainer

The developer can set the initial navigation state and define how to render the application based on the current state:

```
<NavigationExperimental.RootContainer
  renderNavigator={(navigationState) => (
    <Text>Currently at {navigationState.get(navigationState.index)}</Text>
```

It also provides a handler for navigation actions, and allows the reducer to be customised:


## NavigationContainer.create

It can be very tedious to pass the `onNavigation` and `navigationState` props around throughout your entire application. To aleviate this, we have provided a higher-order "container" component that you can use to provide components with these props, so long as they are rendered under a `RootContainer`:

```
<NavigationContainer.RootContainer
  initialState={new NavigationState(0, ['First Route'])}
  renderNavigator={(navigationState, onNavigation) => <ExampleComponent />}
...

class ExampleComponent {
  render() {
    <Text onPress={() => { this.props.onNavigation(new ExampleAction()) }}>
      At index {this.props.navigationState.index}. Tap to make action
    </Text>
  }
}
ExampleComponent = NavigationContainer.create(ExampleComponent);
```

If `navigationState` or `onNavigation` are actually passed to the container as props, the values will override the props for the container and for all sub-containers.
