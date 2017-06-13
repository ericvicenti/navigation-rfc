# Note: Use React Navigation now instead

This project was developed in early 2016 and has since matured and combined with Expo's Ex-Navigation project to form a new effort: [React Navigation](https://reactnavigation.org). Please use that instead, and collaborate with the community to improve it!

## DEPRECATED NavigationExperimental

This was an 2016 RFC for a new Navigation system for react native, with focus on the following improvements over `<Navigator />`:

- Single-directional data flow, using reducers to manipulate top-level state object
- Navigation logic and routing must be independent from view logic to allow for a variety of native and js-based navigation views
- Improved modularity of scene animations, gestures, and navigation bars

If you're confused about all the navigation options, look at the [Navigation Comparison](Docs/NavigationOverview.md) doc.

## Code

NavigationExperimental has recently been moved from here to the open source RN repo: https://github.com/facebook/react-native/commit/a3085464f6ea36fc6b53cd0c711c048ffb1516f9

- Core Utilities and Components: https://github.com/facebook/react-native/tree/master/Libraries/NavigationExperimental
- Animated Card and Header: https://github.com/facebook/react-native/tree/master/Libraries/CustomComponents/NavigationExperimental
- Examples: https://github.com/facebook/react-native/tree/master/Examples/UIExplorer/js/NavigationExperimental


## Docs

- [Navigator Comparison](Docs/NavigationOverview.md)
- [Complete Navigation API](Docs/Navigation.md)
- [Navigation Walkthrough](Docs/Guide.md)
