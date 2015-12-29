# Navigation RFC

A proposal for the future of navigation in react native. Focuses on the following improvements:

- Single-directional data flow, using reducers to manipulate top-level state object
- Navigation logic and routing must be independent from view logic to allow for a variety of native and js-based navigation views
- Improved modularity of scene animations, gestures, and navigation bars

If you're confused about all the navigation options, look at the [Navigation Landscape](./Docs/Landscape.md) doc.

## Control flow and `Navigation.Stack`

We now encourage a redux-like approach, with an immutable top-level state. The entire navigation state of your app should be held in a single navigation stack and managed at the top of your application.

`Navigation.Stack`s can be used to model the navigation state of your whole application. A navigation stack can be defined as a non-empty list of "routes" and a valid index pointing to the current route. Complicated navigation paradigms can be represented by nesting sub-stacks within navigation routes.

```javascript
new Navigation.Stack(
  [ // List of routes. A route can be any type
    {first: 'tab'},
    'second tab'
  ],
  0 // the first tabs is selected
);
```

## Actions and Reducers

Actions are the requests for navigation that your application uses to request changes in navigation. Navigation includes a default set of actions to request changes to a navigation stack. Complicated apps will typically define their custom actions.

A reducer is a function that returns the new state for a given previous state and action taken upon it. In navigation, we provide a default reducer to handle the default set of navigation actions.

Here is a simple application that uses the built-in provided reducer and actions:

```
constructor() {
  this.state = {
    stack: new Navigation.Stack(['First Route'], 0),
..
render() {
  return (
    <Text>Current Route: {this.state.stack.get(this.state.stack.index)}
      <Text onPress={() => {
        this.onNavigation(new Navigation.Actions.Push('Another Route'))
..
onNavigation(action) {
  this.setState({
    stack: Navigation.Reducer(this.state.stack, action),
```

## Navigation RootContainer

For ease of getting started, we have built a RootContainer which manages the top-level navigation state for you:

```
<Navigation.RootContainer
  initialStack={new Navigation.Stack(0, ['First Route'])}
  reducer={Navigation.Reducer}
  renderNavigator={(navigationStack, onNavigation) => (
    <Text>Current: {navigationStack.get(navigationStack.index)}
      <Text onPress={() => {
        onNavigation(new Navigation.Actions.Push('Another Route'));
```

In `renderNavigator`, the application is responsible for rendering the current `navigationStack` and passing actions into `onNavigation`.


## Navigation Container

When you use the RootContainer, you can use `Navigation.Container` to give child components access to `props.onNavigation` and `props.navigationStack`.

```
class MyLink extends React.Component {
  go() {
    this.props.onNavigation(
      new Navigation.Actions.Push('second page'))
  }
}
MyLink = Navigation.Container(MyLink);
```


## Navigation.AnimatedStackView

For navigation animations and gestures coordinated from javascript, you can use a `<Navigation.AnimatedStackView>`

Most often, developers will use the animated stack view with pre-built animated scenes and navigation bars:

```
<Navigation.AnimatedStackView
  navigationStack={this.props.navigationStack}
  renderOverlay={(props) => (
    <NavigationHeader
      {...props}
      getTitle={route => route}
    />
  )}
  renderScene={(props) => (
    <NavigationCard
      horizontal={true}
      {...props}>
      <Text>{this.props.navigationStack.get(this.props.navigationStack.index)}</Text>
      <Text onPress={() => {
        this.props.onNavigation(new Navigation.Action.Push('Another Route'));
      }}>Push!</Text>
    </NavigationCard>
  )}
/>
```

This will render an animated card for each item in the navigation stack, and also present a navigation header:

{anim_stack.gif}

Custom scenes can easily be built for AnimatedStackView. Learn more here.