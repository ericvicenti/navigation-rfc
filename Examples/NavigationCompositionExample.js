/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
'use strict';

var React = require('react-native');
var {
  NavigationActions,
  NavigationAnimatedStackView,
  NavigationCard,
  NavigationContainer,
  NavigationHeader,
  NavigationReducer,
  NavigationStack,
  NavigationStackView,
  TabBarIOS,
  Text,
  View,
} = React;

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

class ExampleRoute {
  getText() {
    return 'Normal Route';
  }
}

class ExampleExitRoute {}

class ExampleStarterRoute extends ExampleRoute {
  getText() {
    return 'Starter Route';
  }
}

class ExampleSecondStarterRoute extends ExampleRoute {
  getText() {
    return 'Second Tab';
  }
}

class ExampleSecondTabPageRoute extends ExampleRoute {
  getText() {
    return 'Second Tab Page';
  }
  getTab() {
    return 'second';
  }
}

class ExampleTabRoute extends ExampleRoute {
  constructor(params = {}) {
    super();
    const {navigationStack} = params;
    this._navigationStack = navigationStack || new NavigationStack([ new ExampleStarterRoute() ], 0);
  }
  getNavigationStack() {
    return this._navigationStack;
  }
  setNavigationStack(navigationStack) {
    var MyTabRouteClass = this.constructor;
    return new MyTabRouteClass({navigationStack});
  }
}

class ExampleFirstTabRoute extends ExampleTabRoute {
  getTabName() {
    return 'First';
  }
}

class ExampleSecondTabRoute extends ExampleTabRoute {
  constructor(params = {}) {
    super(params);
    const {navigationStack} = params;
    this._navigationStack = navigationStack || new NavigationStack([ new ExampleSecondStarterRoute() ], 0);
  }
  getNavigationStack() {
    return this._navigationStack;
  }
  getTabName() {
    return 'Second';
  }
}

class ExampleThirdTabRoute extends ExampleTabRoute {
  getTabName() {
    return 'Third';
  }
}

class ExampleTabScreen extends React.Component {
  render() {
    return (
      <NavigationAnimatedStackView
        style={{flex: 1}}
        renderOverlay={(props) => (
          <NavigationHeader
            {...props}
            getTitle={route => route.getText()}
          />
        )}
        renderScene={this._renderScene.bind(this)}
      />
    );
  }
  _renderScene(props) {
    return (
      <NavigationCard
        {...props}>
        <Text onPress={() => {
          this.props.onNavigation(new ExampleRoute());
        }}>Open page</Text>
        <Text onPress={() => {
          this.props.onNavigation(new ExampleSecondTabPageRoute());
        }}>Open page in 2nd tab</Text>
        <Text onPress={() => {
          this.props.onNavigation(new ExampleExitRoute());
        }}>Exit Composition Example</Text>
      </NavigationCard>
    );
  }
}
ExampleTabScreen = NavigationContainer.create(ExampleTabScreen);


var TABS = [
  new ExampleFirstTabRoute(),
  new ExampleSecondTabRoute(),
  new ExampleThirdTabRoute(),
];
var INITIAL_STACK = new NavigationStack(TABS, 0);

function MyNavigationReducer(lastStack, action) {
  if (action instanceof ExampleRoute) {
    // first determine what tab the new route belongs in.
    // default to the current tab
    let tabRoute = lastStack.get(lastStack.index);

    if (action.getTab && action.getTab() === 'second') {
      // this route can only appear in the second tab, so we need to find it in the route stack
      const firstTabRoute = lastStack.find(route => route instanceof ExampleSecondTabRoute);
      if (firstTabRoute != null) {
        tabRoute = firstTabRoute;
      }
    }

    const tabIndex = lastStack.indexOf(tabRoute);

    // replace the route of the tab with a route inlucluding the pushed sub-navigation stack
    let stack = lastStack.replaceAtIndex(
      tabIndex,
      tabRoute.setNavigationStack(
        tabRoute.getNavigationStack().push(action)
      )
    );
    // move the index of the stack to that of the tab we want
    stack = stack.jumpToIndex(tabIndex);

    // return the new stack
    return stack;
  }
  return NavigationReducer(lastStack, action);
}

class NavigationCompositionExample extends React.Component {
  render() {
    return (
      <NavigationContainer.RootContainer
        initialStack={INITIAL_STACK}
        reducer={MyNavigationReducer}
        renderNavigator={(stack, onNavigation) => (
          <View style={{flex:1}}>
            <NavigationStackView
              navigationStack={stack}
              style={{flex: 1, marginBottom:49.5}}
              renderRoute={(route) => (
                <ExampleTabScreen
                  route={route}
                  navigationStack={route.getNavigationStack()}
                  onNavigation={(action) => {
                    if (action instanceof ExampleExitRoute) {
                      this.props.onExampleExit();
                      return;
                    }
                    if (action instanceof NavigationActions.Abstract) {
                      action = new NavigationActions.OnRouteNavigationStack(route, action);
                    }
                    onNavigation(action);
                  }}
                />
              )}
            />
            <TabBarIOS style={{position: 'absolute', height:49.5, bottom:0,left:0,right:0}}>
              {stack.mapToArray((route, index, key) => (
                <TabBarIOS.Item
                  title={route.getTabName && route.getTabName()}
                  icon={{uri: base64Icon, scale: 3}}
                  key={key}
                  selected={index === stack.index}
                  onPress={() => {
                    onNavigation(new NavigationActions.JumpTo(route));
                  }}>
                  <View />
                </TabBarIOS.Item>
              ))}
            </TabBarIOS>
          </View>
        )}
      />
    );
  }
}

module.exports = NavigationCompositionExample;
