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

var _uniqueIdCount = 0;
function uniqueId(name) {
  return name + '-' + (_uniqueIdCount++);
}

function ExampleExitRoute() {
  return { exitExampleAction: true, };
}

function ExampleBaseRoute(type) {
  return {
    key: uniqueId(type),
    type: type,
    isExampleRoute: true,
  };
}

function ExampleRoute() {
  return {
    ...ExampleBaseRoute('ExampleRoute'),
    text: 'Pushed Page',
  }
}

function ExampleFirstRoute() {
  return {
    ...ExampleBaseRoute('ExampleFirstRoute'),
    text: 'Initial Page',
  };
}

function ExampleSecondTabFirstRoute() {
  return {
    ...ExampleBaseRoute('ExampleSecondTabFirstRoute'),
    text: 'Initial Second Page',
  };
}

function ExampleSecondTabRoute() {
  return {
    ...ExampleBaseRoute('ExampleSecondTabRoute'),
    text: 'Pushed on Second Tab',
    constrainToTabId: 'second',
  };
}

class ExampleTabScreen extends React.Component {
  render() {
    return (
      <NavigationAnimatedView
        style={styles.tabContent}
        renderOverlay={(navigationState, position, layout) => (
          <NavigationHeader
            navigationState={navigationState}
            position={position}
            layout={layout}
            renderLeftComponent={(route, index) => {
              if (index === 0) {
                return null;
              }
              return <NavigationExampleBackButton onNavigation={this.props.onNavigation} />;
            }}
            renderTitleComponent={route => <NavigationHeaderTitle>{route.text}</NavigationHeaderTitle>}
          />
        )}
        renderScene={this._renderScene.bind(this)}
      />
    );
  }
  _renderScene(route, index, navigationState, position, layout) {
    return (
      <NavigationCard
        key={route.key}
        route={route}
        index={index}
        navigationState={navigationState}
        position={position}
        layout={layout}>
        <ScrollView style={styles.scrollView}>
          <NavigationExampleRow
            text="Open page"
            onPress={() => {
              this.props.onNavigation(ExampleRoute());
            }}
          />
          <NavigationExampleRow
            text="Open page in 2nd tab"
            onPress={() => {
              this.props.onNavigation(ExampleSecondTabRoute());
            }}
          />
          <NavigationExampleRow
            text="Exit Composition Example"
            onPress={() => {
              this.props.onNavigation(ExampleExitRoute());
            }}
          />
        </ScrollView>
      </NavigationCard>
    );
  }
}
ExampleTabScreen = NavigationContainer.create(ExampleTabScreen);


var INITIAL_STATE = {
  index: 0,
  routes: [
    {
      routes: [ ExampleFirstRoute() ],
      index: 0,
      label: 'One',
      key: 'first',

    },
    {
      routes: [ ExampleSecondTabFirstRoute() ],
      index: 0,
      label: 'Two',
      key: 'second',
    },
    {
      routes: [ ExampleFirstRoute() ],
      index: 0,
      label: 'Three',
      key: 'last',
    },
  ],
};

function MyNavigationReducer(navState, action) {
  if (action.isExampleRoute) {
    // first determine what tab the new route belongs in.
    // default to the current tab
    let tabKey = navState.routes[navState.index].key;

    if (action.constrainToTabId) {
      // this route can only appear in the second tab, so we need to find it in the route state
      tabKey = action.constrainToTabId;
    }

    // jump to the current tabKey, in case we are not already on it
    navState = NavigationState.jumpTo(navState, tabKey);
    return NavigationState.replaceAt(
      navState,
      tabKey,
      NavigationState.push(
        NavigationState.get(navState, tabKey),
        action
      )
    );
  }
  return NavigationReducer(navState, action);
}

class NavigationCompositionExample extends React.Component {
  render() {
    return (
      <NavigationContainer.RootContainer
        initialState={INITIAL_STATE}
        reducer={MyNavigationReducer}
        persistenceKey="NAV_EXAMPLE_STATE_COMPOSITION"
        renderNavigator={(navState, onNavigation) => {
          if (!navState) {
            return null;
          }
          return (
            <View style={styles.topView}>
              <NavigationView
                navigationState={navState}
                style={styles.tabsContent}
                renderRoute={(route, index) => (
                  <ExampleTabScreen
                    key={route.key}
                    navigationState={route}
                    onNavigation={(action) => {
                      if (action.exitExampleAction) {
                        this.props.onExampleExit();
                        return;
                      }
                      if (NavigationActions.isNavigationAction(action)) {
                        action = NavigationActions.OnRouteKey(route.key, action);
                      }
                      onNavigation(action);
                    }}
                  />
                )}
              />
              <TabBarIOS style={styles.tabBar}>
                {navState.routes.map((route, index) => (
                  <TabBarIOS.Item
                    title={route.label}
                    icon={{uri: base64Icon, scale: 3}}
                    key={route.key}
                    selected={index === navState.index}
                    onPress={() => {
                      onNavigation(NavigationActions.JumpTo(route.key));
                    }}>
                    <View />
                  </TabBarIOS.Item>
                ))}
              </TabBarIOS>
            </View>
          );
        }}
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
