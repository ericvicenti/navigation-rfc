# NavigationExperimental

A new Navigation system for react native. Focuses on the following improvements over `<Navigator />`:

- Single-directional data flow, using reducers to manipulate top-level state object
- Navigation logic and routing must be independent from view logic to allow for a variety of native and js-based navigation views
- Improved modularity of scene animations, gestures, and navigation bars

If you're confused about all the navigation options, look at the [Navigation Landscape](Docs/Navigation.md) doc.

## Code

NavigationExperimental has recently been moved from here to the open source RN repo: https://github.com/facebook/react-native/commit/a3085464f6ea36fc6b53cd0c711c048ffb1516f9

- Core Utilities and Components: https://github.com/facebook/react-native/tree/master/Libraries/NavigationExperimental
- Animated Card and Header: https://github.com/facebook/react-native/tree/master/Libraries/CustomComponents/NavigationExperimental
- Examples: https://github.com/facebook/react-native/tree/master/Examples/UIExplorer/NavigationExperimental


## Docs

### These Docs currently out of date by about a month! Please look at the react-native repo for the current API!

- [Navigation Landscape](Docs/NavigationOverview.md)
- [Reducer and Actions](Docs/Reducer_Actions.md)
- [Containers](Docs/Containers.md)
- [AnimatedView](Docs/AnimatedView.md)
