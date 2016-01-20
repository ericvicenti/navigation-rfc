/**
 * Copyright (c) 2015, Facebook, Inc.  All rights reserved.
 *
 * Facebook, Inc. ("Facebook") owns all right, title and interest, including
 * all intellectual property and other proprietary rights, in and to the React
 * Native CustomComponents software (the "Software").  Subject to your
 * compliance with these terms, you are hereby granted a non-exclusive,
 * worldwide, royalty-free copyright license to (1) use and copy the Software;
 * and (2) reproduce and distribute the Software as part of your own software
 * ("Your Software").  Facebook reserves all rights not expressly granted to
 * you in this license agreement.
 *
 * THE SOFTWARE AND DOCUMENTATION, IF ANY, ARE PROVIDED "AS IS" AND ANY EXPRESS
 * OR IMPLIED WARRANTIES (INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE) ARE DISCLAIMED.
 * IN NO EVENT SHALL FACEBOOK OR ITS AFFILIATES, OFFICERS, DIRECTORS OR
 * EMPLOYEES BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
 * OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @providesModule NavigationHeader
 */
'use strict';

const React = require('react-native');
const {
  Animated,
  NavigationContainer,
  NavigationState,
  PixelRatio,
  Platform,
  StyleSheet,
  View,
} = React;

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

class NavigationHeader extends React.Component {
  _renderLeftComponent = (route, index) => {
    if (this.props.renderLeftComponent) {
      return (
        <Animated.View
          pointerEvents={this.props.navigationState.index === index ? 'auto' : 'none'}
          key={NavigationState.getKey(route)}
          style={[
            styles.left,
            {
              opacity: this.props.position.interpolate({
                inputRange: [ index - 1, index, index + 1 ],
                outputRange: [ 0, 1, 0 ],
              })
            }
          ]}
        >
          {this.props.renderLeftComponent(route, index)}
        </Animated.View>
      );
    }

    return null;
  };

  _renderRightComponent = (route, index) => {
    if (this.props.renderRightComponent) {
      return (
        <Animated.View
          pointerEvents={this.props.navigationState.index === index ? 'auto' : 'none'}
          key={NavigationState.getKey(route)}
          style={[
            styles.right,
            {
              opacity: this.props.position.interpolate({
                inputRange: [ index - 1, index, index + 1 ],
                outputRange: [ 0, 1, 0 ],
              })
            }
          ]}
        >
          {this.props.renderRightComponent(route, index)}
        </Animated.View>
      );
    }

    return null;
  };

  _renderTitle = (route, index) => {
    if (this.props.renderTitleComponent) {
      return (
        <Animated.View
          pointerEvents={this.props.navigationState.index === index ? 'auto' : 'none'}
          key={NavigationState.getKey(route)}
          style={[
            styles.title,
            {
              opacity: this.props.position.interpolate({
                inputRange: [ index - 1, index, index + 1 ],
                outputRange: [ 0, 1, 0 ],
              }),
              transform: [
                {
                  translateX: this.props.position.interpolate({
                    inputRange: [ index - 1, index + 1 ],
                    outputRange: [ 200, -200 ],
                  }),
                }
              ],
            }
          ]}
        >
          {this.props.renderTitleComponent(route, index)}
        </Animated.View>
      );
    }

    return null;
  };

  render() {
    const state = this.props.navigationState;

    return (
      <View style={[ styles.appbar, this.props.style ]}>
        {state.routes.map(this._renderLeftComponent)}
        {state.routes.map(this._renderTitle)}
        {state.routes.map(this._renderRightComponent)}
      </View>
    );
  }
}

NavigationHeader.propTypes = {
  position: React.PropTypes.object.isRequired,
  navigationState: React.PropTypes.object,
  onNavigation: React.PropTypes.func.isRequired,
  renderTitleComponent: React.PropTypes.func,
  renderLeftComponent: React.PropTypes.func,
  renderRightComponent: React.PropTypes.func
};

const styles = StyleSheet.create({
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, .7)' : 'rgba(255, 255, 255, 1)',
    borderBottomWidth: Platform.OS === 'ios' ? 1 / PixelRatio.get() : 0,
    borderBottomColor: 'rgba(0, 0, 0, .15)',
    height: APPBAR_HEIGHT + STATUSBAR_HEIGHT,
    marginBottom: 16, // This is needed for elevation shadow
    elevation: 4,
  },

  title: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: APPBAR_HEIGHT,
    right: APPBAR_HEIGHT,
    marginTop: STATUSBAR_HEIGHT,
  },

  left: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    marginTop: STATUSBAR_HEIGHT,
  },

  right: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    marginTop: STATUSBAR_HEIGHT,
  }
});

module.exports = NavigationContainer.create(NavigationHeader);
