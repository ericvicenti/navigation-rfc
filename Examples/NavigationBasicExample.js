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
  Navigation,
  Text,
  View,
} = React;

var NavigationBasicExample = React.createClass({
  render: function() {
    return (
      <Navigation.RootContainer
        initialStack={new Navigation.Stack(['first page'], 0)}
        reducer={Navigation.Reducer}
        renderNavigator={(stack, onNavigation) => (
          <View style={{flex:1, paddingTop: 30}}>
            <Text>Current page: {stack.get(stack.index)}</Text>
            <Text
              onPress={() => {
                onNavigation(new Navigation.Action.Push('page #' + stack.size));
              }}>
              Push page #{stack.size}
            </Text>
            <Text
              onPress={() => {
                onNavigation(new Navigation.Action.Pop());
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

module.exports = NavigationBasicExample;
