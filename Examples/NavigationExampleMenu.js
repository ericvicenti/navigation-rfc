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
  AsyncStorage,
  Text,
  StyleSheet,
  View,
} = React;

/*
 * Heads up! This file is not the real navigation example- only a utility to switch between them.
 *
 * To learn how to use the Navigation API, take a look at the following exmample files:
 */
var EXAMPLES = {
  'Tabs': require('./NavigationTabsExample'),
  'Basic': require('./NavigationBasicExample'),
  'Animated Card Stack': require('./NavigationAnimatedExample'),
  'Composition': require('./NavigationCompositionExample'),
  'Persistence': require('./NavigationPersistenceExample'),
};

var EXAMPLE_STORAGE_KEY = 'OPEN_NAVIGATION_EXAMPLE';

var NavigationExampleMenu = React.createClass({
  statics: {
    title: 'Navigation',
    description: 'Core APIs and animated navigation',
    external: true,
  },

  getInitialState: function() {
    return {
      exampe: null,
    };
  },

  componentDidMount() {
    AsyncStorage.getItem(EXAMPLE_STORAGE_KEY, (err, example) => {
      if (err || !example) {
        this.setState({
          example: 'menu',
        });
        return;
      }
      this.setState({
        example,
      });
    });
  },

  setExample: function(example) {
    this.setState({
      example,
    });
    AsyncStorage.setItem(EXAMPLE_STORAGE_KEY, example);
  },

  _renderMenu: function() {
    return (
      <View style={styles.menu}>
        {Object.keys(EXAMPLES).map(exampleName => (
          <Text
            key={exampleName}
            onPress={() => {
              this.setExample(exampleName);
            }}>
            {exampleName}
          </Text>
        ))}
      </View>
    );
  },

  _exitInnerExample: function() {
    this.setExample('menu');
  },

  render: function() {
    if (this.state.example === 'menu') {
      return this._renderMenu();
    }
    if (EXAMPLES[this.state.example]) {
      var Component = EXAMPLES[this.state.example];
      return <Component onExampleExit={this._exitInnerExample} />;
    }
    return null;
  },
});

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
});

module.exports = NavigationExampleMenu;
