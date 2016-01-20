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
  NavigationAnimatedView,
  NavigationCard,
  NavigationContainer,
  NavigationHeader,
  NavigationHeaderTitle,
  NavigationReducer,
  NavigationState,
  NavigationView,
  Platform,
  ScrollView,
  StyleSheet,
  TabBarIOS,
  View,
} = React;
var NavigationExampleRow = require('./NavigationExampleRow');
var NavigationExampleBackButton = require('./NavigationExampleBackButton');

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
    const {navigationState} = params;
    this._navigationState = navigationState || new NavigationState([ new ExampleStarterRoute() ], 0);
  }
  getNavigationState() {
    return this._navigationState;
  }
  setNavigationState(navigationState) {
    var MyTabRouteClass = this.constructor;
    return new MyTabRouteClass({navigationState});
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
    const {navigationState} = params;
    this._navigationState = navigationState || new NavigationState([ new ExampleSecondStarterRoute() ], 0);
  }
  getNavigationState() {
    return this._navigationState;
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
      <NavigationAnimatedView
        style={styles.tabContent}
        renderOverlay={(props) => (
          <NavigationHeader
            {...props}
            renderLeftComponent={(route, index) => {
              if (index === 0) {
                return null;
              }

              return <NavigationExampleBackButton onNavigation={this.props.onNavigation} />;
            }}
            renderTitleComponent={route => <NavigationHeaderTitle>{route.getText()}</NavigationHeaderTitle>}
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
        <ScrollView style={styles.scrollView}>
          <NavigationExampleRow
            text="Open page"
            onPress={() => {
              this.props.onNavigation(new ExampleRoute());
            }}
          />
          <NavigationExampleRow
            text="Open page in 2nd tab"
            onPress={() => {
              this.props.onNavigation(new ExampleSecondTabPageRoute());
            }}
          />
          <NavigationExampleRow
            text="Exit Composition Example"
            onPress={() => {
              this.props.onNavigation(new ExampleExitRoute());
            }}
          />
        </ScrollView>
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
var INITIAL_STACK = new NavigationState(TABS, 0);

function MyNavigationReducer(lastNavState, action) {
  if (action instanceof ExampleRoute) {
    // first determine what tab the new route belongs in.
    // default to the current tab
    let tabRoute = lastNavState.get(lastNavState.index);

    if (action.getTab && action.getTab() === 'second') {
      // this route can only appear in the second tab, so we need to find it in the route state
      const secondTabRoute = lastNavState.find(route => route instanceof ExampleSecondTabRoute);
      if (secondTabRoute != null) {
        tabRoute = secondTabRoute;
      }
    }

    const tabIndex = lastNavState.indexOf(tabRoute);

    // replace the route of the tab with a route inlucluding the pushed sub-navState
    let navState = lastNavState.replaceAtIndex(
      tabIndex,
      tabRoute.setNavigationState(
        tabRoute.getNavigationState().push(action)
      )
    );
    // move the index of the navState to that of the tab we want
    navState = navState.jumpToIndex(tabIndex);

    // return the new navState
    return navState;
  }
  return NavigationReducer(lastNavState, action);
}

class NavigationCompositionExample extends React.Component {
  render() {
    return (
      <NavigationContainer.RootContainer
        initialState={INITIAL_STACK}
        reducer={MyNavigationReducer}
        renderNavigator={(navState, onNavigation) => (
          <View style={styles.topView}>
            <NavigationView
              navigationState={navState}
              style={styles.tabsContent}
              renderRoute={(route) => (
                <ExampleTabScreen
                  route={route}
                  navigationState={route.getNavigationState()}
                  onNavigation={(action) => {
                    if (action instanceof ExampleExitRoute) {
                      this.props.onExampleExit();
                      return;
                    }
                    if (action instanceof NavigationActions.Abstract) {
                      action = new NavigationActions.OnRouteNavigationState(route, action);
                    }
                    onNavigation(action);
                  }}
                />
              )}
            />
            <TabBarIOS style={styles.tabBar}>
              {navState.mapToArray((route, index, key) => (
                <TabBarIOS.Item
                  title={route.getTabName && route.getTabName()}
                  icon={{uri: base64Icon, scale: 3}}
                  key={key}
                  selected={index === navState.index}
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

const styles = StyleSheet.create({
  topView: {
    flex: 1,
  },
  tabsContent: {
    flex: 1,
    marginBottom: 49.5,
  },
  tabBar: {
    position: 'absolute',
    height: 49.5,
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabContent: {
    flex: 1,
  },
  scrollView: {
    marginTop: Platform.OS === 'ios' ? 64 : 56,
  },
});

module.exports = NavigationCompositionExample;
