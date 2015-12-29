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
  NavigationCard,
  NavigationHeader,
  Text,
} = React;

class NavigationAnimatedExample extends React.Component {
  render() {
    return (
      <Navigation.RootContainer
        initialStack={new Navigation.Stack([ 'First Route' ], 0)}
        renderNavigator={(stack, onNavigation) => (
          <Navigation.AnimatedStackView
            navigationStack={stack}
            style={{flex: 1}}
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
                <Text>{stack.get(stack.index)}</Text>
                <Text onPress={() => {
                  onNavigation(new Navigation.Action.Push('Another Route'));
                }}>Push!</Text>
                <Text onPress={this.props.onExampleExit}>Exit Basic Nav Example</Text>
              </NavigationCard>
            )}
          />
        )}
      />
    );
  }
}

module.exports = NavigationAnimatedExample;
