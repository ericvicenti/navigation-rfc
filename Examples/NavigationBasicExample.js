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
  NavigationContainer,
  NavigationReducer,
  ScrollView,
  StyleSheet,
  View,
} = React;
var NavigationExampleRow = require('./NavigationExampleRow');

var NavigationBasicExample = React.createClass({
  render: function() {
    return (
      <NavigationContainer.RootContainer
        initialState={{routes: ['first page'], index: 0}}
        reducer={NavigationReducer}
        persistenceKey="NAV_EXAMPLE_STATE_BASIC"
        renderNavigator={(navState, onNavigation) => {
          if (!navState) { return null; }
          return (
            <ScrollView style={styles.topView}>
              <NavigationExampleRow
                text={`Current page: ${navState.routes[navState.index]}`}
              />
              <NavigationExampleRow
                text={`Push page #${navState.routes.length}`}
                onPress={() => {
                  onNavigation(NavigationActions.Push('page #' + navState.routes.length));
                }}
              />
              <NavigationExampleRow
                text="pop"
                onPress={() => {
                  onNavigation(NavigationActions.Pop());
                }}
              />
              <NavigationExampleRow
                text="Exit Basic Nav Example"
                onPress={this.props.onExampleExit}
              />
            </ScrollView>
          );
        }}
      />
    );
  },
});

const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#E9E9EF',
    flex: 1,
    paddingTop: 30,
  },
});

module.exports = NavigationBasicExample;
