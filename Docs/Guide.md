# Navigation Guide

Lets build the navigation for a simple chat app. First, we should decide on the structure of our application state. Because we can have a stack of screens in our app, we will store the list of scenes in an array:

```
class MyApp extends React.Component {
  constructor(props) {
    this.state = {
      scenes: [
        {key: 'home'}, // this represents the application home screen
      ],
    };
  }
```

For our render function, we want to display the topmost/current scene in the stack.

```
  render() {
    const scene = this.state.scenes[this.state.scenes.length - 1];
    if (scene.key === 'home') {
      return <HomeView />;
    }
    if (scene.type === 'chat') {
      return <ChatView id={scene.key} />;
    }
    return null;
  }
```

To open a chat screen, we could add a method called `openChat`:

```
  openChat(id) {
    this.setState({
      scenes: [
        ...this.state.scenes,
        { type: 'chat', key: id }
      ],
    });
  }
```

And if we wanted to go back, we could implement a back method like this:

```
  goBack() {
    if (this.state.scenes.length > 1) {
      this.setState({
        scenes: this.state.scenes.slice(0, this.state.scenes.length - 1),
      });
    }
  }
```

However, it quickly becomes complicated to maintain independent methods for every navigation action in your app. To fix this, we can delegate all of the navigation logic to a reducer:

```
  constructor() {
    this.state = AppReducer(null, { type: 'init' }),
  }
  dispatch(action) {
    this.setState(AppReducer(this.state, action));
  }
```

Our reducer would then look like this:

```
function AppReducer(lastState, action) {
  let state = lastState;
  if (!state) {
    state = {
      scenes: [
        {key: 'home'}
      ],
    };
  }
  if (action.type === 'back' && state.scenes.length > 1) {
    return {
      scenes: state.scenes.slice(0, this.state.scenes.length - 1),
    };
  }
  if (action.type === 'openChat') {
    return {
      scenes: [
        ...state.scenes,
        {
          type: 'chat',
          key: action.id
        }
      ],
    };
  }
  return state;
}
```

Now, we can easily implement our navigation methods as the following:

```
  openChat(id) {
    this.dispatch({ type: 'openChat', id });
  }
  goBack() {
    this.dispatch({ type: 'back' });
  }
```

And now that we have implemented `this.dispatch`, we can give access to allow sub-components to dispatch actions:

```
  render() {
    const scene = this.state.scenes[this.state.scenes.length - 1];
    if (scene.key === 'home') {
      return 
        <HomeView
          dispatch={this.dispatch}
        />;
    }
    if (scene.type === 'chat') {
      return
        <ChatView
          id={scene.key}
          dispatch={this.dispatch}
        />;
    }
    return null;
  }
```
