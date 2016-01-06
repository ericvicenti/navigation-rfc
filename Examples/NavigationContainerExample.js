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
  NavigationReducer,
  NavigationContainer,
  NavigationStack,
  Text,
  View,
} = React;

class InnerNavComponent extends React.Component {
  render() {
    var {navigationStack} = this.props;
    return (
      <View>
        <Text>Current Tab is: {navigationStack.get(navigationStack.index)}</Text>
        {navigationStack.mapToArray(tab => (
          <Text
            key={tab}
            onPress={() => {
              this.props.onNavigation(new NavigationActions.JumpTo(tab));
            }}>
            Go to {tab}
          </Text>
        ))}
      </View>
    );
  }
}
InnerNavComponent = NavigationContainer.create(InnerNavComponent);

class MiddleComponent extends React.Component {
  render() {
    return (
      <InnerNavComponent />
    );
  }
}

var NavigationContainerExample = React.createClass({
  render: function() {
    var TABS = ['one', 'two', 'three'];
    return (
      <NavigationContainer.RootContainer
        initialStack={new NavigationStack(TABS, 0)}
        reducer={NavigationReducer}
        renderNavigator={() => (
          <View style={{flex:1, paddingTop: 30}}>
            <MiddleComponent />
            <Text onPress={this.props.onExampleExit}>Exit Basic Nav Example</Text>
          </View>
        )}
      />
    );
  },
});

module.exports = NavigationContainerExample;
