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
 * @providesModule NavigationCard
 */
'use strict';

var React = require('react-native');
var {
  Animated,
  NavigationActions,
  NavigationState,
  NavigationContainer,
  PanResponder,
  StyleSheet,
  View,
} = React;

class NavigationCard extends React.Component {
  _responder: Object;
  _lastWidth: number;
  _widthListener: any;
  constructor(props) {
    super(props);
    this._responder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, {dx, dy, moveX, moveY, x0, y0}) => {
        if (this.props.navigationState.index === 0) {
          return false;
        }
        if (moveX > 30) {
          return false;
        }
        if (dx > 5 && Math.abs(dy) < 4) {
          return true;
        }
        return false;
      },
      onPanResponderGrant: (e, {dx, dy, moveX, moveY, x0, y0}) => {
      },
      onPanResponderMove: (e, {dx}) => {
        this.props.position.setValue((-dx / this._lastWidth) + this.props.navigationState.index);
      },
      onPanResponderRelease: (e, {vx, dx}) => {
        const xRatio = dx / this._lastWidth;
        const doesPop = (xRatio + vx) > 0.45;
        if (doesPop) {
          this.props.onNavigation(new NavigationActions.Pop({ velocity: vx }));
          return;
        }
        Animated.spring(this.props.position, {
          toValue: this.props.navigationState.index,
        }).start();
      },
      onPanResponderTerminate: (e, {vx, dx}) => {
        Animated.spring(this.props.position, {
          toValue: this.props.navigationState.index,
        }).start();
      },
    });
  }
  componentDidMount() {
    this._lastHeight = this.props.initHeight;
    this._lastWidth = this.props.initWidth;
    this._widthListener = this.props.width.addListener(({value}) => {
      this._lastWidth = value;
    });
    this._widthListener = this.props.width.addListener(({value}) => {
      this._lastWidth = value;
    });
    // todo: fix listener and last layout dimentsions when props change. potential bugs here
  }
  componentWillUnmount() {
    this.props.width.removeListener(this._widthListener);
  }
  render() {
    const cardPosition = Animated.add(this.props.position, new Animated.Value(-this.props.sceneRecord.index));
    const gestureValue = Animated.multiply(cardPosition, this.props.width);
    return (
      <Animated.View
        {...this._responder.panHandlers}
        key={this.props.sceneRecord.key}
        style={[
          styles.card,
          {
            transform: [
              {
                translateX: gestureValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -1],
                }),
              },
            ],

          }
        ]}>
        {this.props.children}
      </Animated.View>
    );
  }
}
NavigationCard.propTypes = {
  navigationState: React.PropTypes.instanceOf(NavigationState),
};
NavigationCard = NavigationContainer.create(NavigationCard);

var styles = StyleSheet.create({
  card: {
    backgroundColor: '#E9E9EF',
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 10,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'absolute'
  },
});

module.exports = NavigationCard;
