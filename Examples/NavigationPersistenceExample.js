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
  NavigationState,
  StyleSheet,
  Text,
} = React;

function stateToString(navState) {
  // demo some basic serialization that works for string routes.
  return JSON.stringify({
    index: navState.index,
    routes: navState.toArray(),
  });
}

function stringToState(navString) {
  var navData = JSON.parse(navString);
  return new NavigationState(navData.routes, navData.index);
}

const NavigationAnimatedExample = React.createClass({
  render: function() {
    return (
      <NavigationContainer.RootContainer
        initialState={new NavigationState([ 'First Route' ], 0)}
        persistenceKey="FLAT_PERSISTENCE_EXAMPLE"
        stateToString={stateToString}
        stringToState={stringToState}
        renderNavigator={this._renderNavigator}
      />
    );
  },
  _renderNavigator: function(navState, onNavigation) {
    if (!navState) {
      // navState may be null while the container loads it from local storage
      return null;
    }
    return (
      <NavigationAnimatedView
        navigationState={navState}
        style={styles.animatedView}
        renderOverlay={(props) => (
          <NavigationHeader
            {...props}
            getTitle={route => route}
          />
        )}
        renderScene={(props) => (
          <NavigationCard
            {...props}>
            <Text>{navState.get(navState.index)}</Text>
            <Text onPress={() => {
              onNavigation(new NavigationActions.Push('Another Route'));
            }}>Push!</Text>
            <Text onPress={this.props.onExampleExit}>Exit Nav Persistence Example</Text>
          </NavigationCard>
        )}
      />
    );
  },
});

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
  },
});

module.exports = NavigationAnimatedExample;
