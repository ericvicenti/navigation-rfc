# Navigation Action and Reducer

A reducer is a function that returns a new state based on a previous state and an action that you are taking on it. A navigation reducer is simply a reducer that can transform the NavigationState that is used to model your nav state.

The reducer you use in your app is dependent on the sort of actions that your components will fire. Bigger apps will likely define their own nav actions and reducers.

`Navigation` includes a default set of actions, and a reducer, to manipulate navigation states. By sharing a base set of actions, we hope to enable integration of loosly-coupled navigation components.

## Usage


```
constructor() {
  this.state = {
    navState: new NavigationState(['First Route'], 0),
..
render() {
  return (
    <Text>Current Route: {this.state.navState.get(this.state.navState.index)}
      <Text onPress={() => {
        this.onNavigation(new Navigation.Actions.Push('Another Route'))
..
onNavigation(action) {
  this.setState({
    navState: Navigation.Reducer(this.state.navState, action),
```

