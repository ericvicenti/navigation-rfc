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
  Text,
  StyleSheet,
  View,
} = React;

var EXAMPLES = {
  'Tabs': require('./NavigationTabsExample'),
  'Basic': require('./NavigationBasicExample'),
  'Animated Card Stack': require('./NavigationAnimatedExample'),
  'Composition': require('./NavigationCompositionExample'),
};

var NavigationExample = React.createClass({
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

  _renderMenu: function() {
    return (
      <View style={styles.menu}>
        {Object.keys(EXAMPLES).map(exampleName => (
          <Text
            key={exampleName}
            onPress={() => {
              this.setState({ example: exampleName });
            }}>
            {exampleName}
          </Text>
        ))}
        <Text onPress={this.props.onExampleExit}>Exit Navigation Examples</Text>
      </View>
    );
  },

  _exitInnerExample: function() {
    this.setState({ example: null });
  },

  render: function() {
    if (EXAMPLES[this.state.example]) {
      var Component = EXAMPLES[this.state.example];
      return <Component onExampleExit={this._exitInnerExample} />;
    }
    return this._renderMenu();
  },
});

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    padding: 10,
    marginTop: 20,
  },
});

module.exports = NavigationExample;
