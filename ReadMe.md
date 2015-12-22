# Navigation RFC

A proposal for the future of navigation in react native. Focuses on the following:

- Single-directional data flow, using reducers to manipulate top-level state object
- Navigation logic and routing must be independent from view logic to allow for a variety of native and js-based navigation views
- Improved modularity of scene animations, gestures, and navigation bars

## Core

`Navigation.Stack`s can be used to model the navigation state of your whole application. A navigation stack can be defined as a non-empty list of routes and a valid index pointing to the current route. Complicated navigation paradigms can be represented by nesting sub-stacks within navigation routes.

We now encourage a redux-like approach. A simple application that uses the provided reducer and actions would look like this:

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

We have provided a top-level component that handles this for you:

```
<Navigation.RootContainer
  initialStack={new Navigation.Stack(0, ['First Route'])}
  reducer={Navigation.Reducer}
  renderNavigator={(stack, onNavigation) => (
    <Text>Current: {stack.get(stack.index)}
      <Text onPress={() => {
        onNavigation(new Navigation.Actions.Push('Another Route'));
```

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

This new component allows animations and gestures to be defined by each scene, instead of being managed by the navigator itself.

More Coming Soon!


