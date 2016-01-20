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

const React = require('react-native');

const {
  Image,
  NavigationReducer,
  StyleSheet,
  TouchableOpacity,
} = React;

const NavigationExampleBackButton = props => (
  <TouchableOpacity style={styles.buttonContainer} onPress={() => props.onNavigation(new NavigationReducer.Actions.Pop())}>
    <Image style={styles.button} source={require('./back_chevron.png')} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 26,
    width: 42,
    resizeMode: 'contain'
  }
});

module.exports = NavigationExampleBackButton;
