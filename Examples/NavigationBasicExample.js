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
  NavigationContainer,
  NavigationReducer,
  NavigationState,
  ScrollView,
  StyleSheet,
  View,
} = React;
var NavigationExampleRow = require('./NavigationExampleRow');

var NavigationBasicExample = React.createClass({
  render: function() {
    return (
      <NavigationContainer.RootContainer
        initialState={new NavigationState(['first page'], 0)}
        reducer={NavigationReducer}
        renderNavigator={(navState, onNavigation) => (
          <ScrollView style={styles.topView}>
            <NavigationExampleRow
              text={`Current page: ${navState.get(navState.index)}`}
            />
            <NavigationExampleRow
              text={`Push page #${navState.size}`}
              onPress={() => {
                onNavigation(new NavigationReducer.Actions.Push('page #' + navState.size));
              }}
            />
            <NavigationExampleRow
              text="pop"
              onPress={() => {
                onNavigation(new NavigationReducer.Actions.Pop());
              }}
            />
            <NavigationExampleRow
              text="Exit Basic Nav Example"
              onPress={this.props.onExampleExit}
            />
          </ScrollView>
        )}
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
