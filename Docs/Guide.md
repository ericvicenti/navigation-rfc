# Navigation Guide

Let's learn about Navigation in React Native by building a simple tic-tac-toe app!

We can model the state of our game with a simple string. If you assume "O" goes first, the game board for `b1_a0_a1` would look like this, and it would be "X"'s turn:

IMAGE_HERE!

Our view can be used like this, where we pass in a game state, and listen to events for when the user makes a turn or resets the game.

```javascript
<GameBoard
  game={'b1_a0_a1'}
  onTurn={(row, col) => {}}
  onReset={() => {}}
/>
```

### Navigation Containers

We want to be able to persist the state of the game when the user quits and resumes the app, or when the developer refreshes the code. To accomplish this, we are going to use one stateful container for our app that can save the state to disk. This can be thought of as a Redux provider with a built-in store. If you're already using Redux or flux, then you won't need this container.

```javascript
<NavigationExperimental.RootContainer

  // Outputs the new nav state for a previous state and action
  reducer={GameReducer}
  
  // Render the application as a function of navigation state:
  renderNavigation{(state, onNavigate) => (
    <GameBoard
      game={state}
      onTurn={(row, col) => {
        onNavigate({ type: 'TURN', row, col });
      }}
      onReset{() => {
        onNavigate({ type: 'RESET' });
      }}
    />
  )}

  // Provide this string to tell the container to store the state
  // to disk, and under what name.
  persistenceKey="TicTacToeGameStorageKey"

/>
```

The `renderNavigation` example could be simplified by providing `onNavigate` directly to the child:

```javascript
  renderNavigation{(state, onNavigate) => (
    <GameBoard
      game={state}
      onNavigate={onNavigate}
    />
  )}
```

Sometimes it can be tedious to pass the `onNavigate` function to every component in your application that needs the ability to link.

With this decorator, `GameBoard` will always have access to the closest `onNavigate` prop, as long as it is rendered inside a `RootContainer`:

```javascript
// In the GameBoard component module:
GameBoard = NavigationExperimental.Container.create(GameBoard);

// In your app component:
<NavigationExperimental.RootContainer
  // GameBoard will still have access to this.props.onNavigate
  renderNavigation={state => <GameBoard game={state} />}
  {...etc}
/>
```

### Reducers

The above example refers to a `GameReducer`, which is responsible for the "business logic" of the game. A reducer describes the latest state, based on the previous state and an action. The state may be undefined for the initial action.

Our reducer might look like this:

```javascript
function GameReducer(game = '', action): string {
  switch (action.type)
    case 'RESET':
      return '';
    case 'TURN':
      // would return 'a0_b1' for playTurn('a0', 1, 1)
      return playTurn(game, action.col, action.row);
    default:
      return game;
  }
}
```

To see the example code up until this point, check out MISSING_REF
