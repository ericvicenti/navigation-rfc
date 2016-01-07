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
  StyleSheet,
  Text,
  View,
} = React;

var NavigationBasicExample = React.createClass({
  render: function() {
    return (
      <NavigationContainer.RootContainer
        initialState={new NavigationState(['first page'], 0)}
        reducer={NavigationReducer}
        renderNavigator={(navState, onNavigation) => (
          <View style={styles.topView}>
            <Text>Current page: {navState.get(navState.index)}</Text>
            <Text
              onPress={() => {
                onNavigation(new NavigationReducer.Actions.Push('page #' + navState.size));
              }}>
              Push page #{navState.size}
            </Text>
            <Text
              onPress={() => {
                onNavigation(new NavigationReducer.Actions.Pop());
              }}>
              Pop
            </Text>
            <Text onPress={this.props.onExampleExit}>Exit Basic Nav Example</Text>
          </View>
        )}
      />
    );
  },
});

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    paddingTop: 30,
  },
});

module.exports = NavigationBasicExample;
