# Navigation.AnimatedStackView

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

![](images/anim_stack.gif)

Custom scenes can easily be built for AnimatedStackView. Learn more here.