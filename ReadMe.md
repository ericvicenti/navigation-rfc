# Navigation RFC

A proposal for the future of navigation in react native. Focuses on the following improvements:

- Single-directional data flow, using reducers to manipulate top-level state object
- Navigation logic and routing must be independent from view logic to allow for a variety of native and js-based navigation views
- Improved modularity of scene animations, gestures, and navigation bars

If you're confused about all the navigation options, look at the [Navigation Landscape](./Docs/Landscape.md) doc.

## Navigation Docs

- [Navigation](Docs/Navigation.md)
- Advanced Guide (Coming Soon)
- [Reducer and Actions](Docs/Reducer_Actions.md)
- [Containers](Docs/Containers.md)
- [AnimatedStackView](Docs/AnimatedStackView.md)