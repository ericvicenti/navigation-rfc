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
  NavigationState,
  Platform,
  StyleSheet,
  ScrollView,
} = React;
var NavigationExampleRow = require('./NavigationExampleRow');
var NavigationExampleBackButton = require('./NavigationExampleBackButton');

class NavigationAnimatedExample extends React.Component {
  render() {
    return (
      <NavigationContainer.RootContainer
        initialState={new NavigationState([ 'First Route' ], 0)}
        renderNavigator={(navState, onNavigation) => (
          <NavigationAnimatedView
            navigationState={navState}
            style={styles.animatedView}
            renderOverlay={(props) => (
              <NavigationHeader
                {...props}
                renderLeftComponent={(route, index) => {
                  if (index === 0) {
                    return null;
                  }

                  return <NavigationExampleBackButton onNavigation={onNavigation} />;
                }}
                renderTitleComponent={route => <NavigationHeaderTitle>{route}</NavigationHeaderTitle>}
              />
            )}
            renderScene={(props) => (
              <NavigationCard
                {...props}>
                <ScrollView style={styles.scrollView}>
                  <NavigationExampleRow
                    text={props.sceneRecord.get('route')}
                  />
                  <NavigationExampleRow
                    text="Push!"
                    onPress={() => {
                      onNavigation(new NavigationActions.Push('Another Route'));
                    }}
                  />
                  <NavigationExampleRow
                    text="Exit Animated Nav Example"
                    onPress={this.props.onExampleExit}
                  />
                </ScrollView>
              </NavigationCard>
            )}
          />
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  animatedView: {
    flex: 1,
  },
  scrollView: {
    marginTop: Platform.OS === 'ios' ? 64 : 56,
  },
});

module.exports = NavigationAnimatedExample;
