import React, { Component } from 'react';
import { Animated, Platform, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '../../assets/colors';

const styles = StyleSheet.create({
  borderRadiusContainer: {
    borderWidth: 40,
    bottom: -40,
    left: -40,
    position: 'absolute',
    right: -40,
    top: -40,
  },

  container: {
    overflow: 'hidden',
  },

  flex1: {
    flex: 1,
  },

  gone: {
    height: 0,
    width: 0,
  },
});

class Shimmer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beginShimmerPosition: new Animated.Value(-1),
    };
  }

  componentDidMount() {
    const { autoRun } = this.props;
    if (autoRun) {
      this.loopAnimated();
    }
  }

  componentWillUnmount() {
    const shimmerAnimated = this.getAnimated();
    shimmerAnimated.stop();
  }

  getAnimated = () => {
    this.state.beginShimmerPosition.setValue(-1);

    return Animated.timing(this.state.beginShimmerPosition, {
      delay: this.props.delay,
      duration: this.props.duration,
      isInteraction: this.props.isInteraction,
      toValue: 1,
      useNativeDriver: true,
    });
  };

  loopAnimated() {
    const shimmerAnimated = this.getAnimated();
    const { visible } = this.props;

    shimmerAnimated.start(({ finished }) => {
      if (!visible && finished) {
        this.loopAnimated();
      }
    });
  }

  render() {
    const {
      backgroundColorBehindBorder,
      children,
      colorShimmer,
      hasBorder,
      height,
      location,
      reverse,
      style,
      visible,
      width,
      widthShimmer,
    } = this.props;

    let outputRange = [-width, width];

    if (reverse) {
      outputRange = outputRange.reverse();
    }

    const linearTranslate = this.state.beginShimmerPosition.interpolate({
      inputRange: [-1, 1],
      outputRange,
    });

    return (
      <View
        style={visible ? [{ height }, styles.container, style] : []}
      >
        {visible ? (
          <View style={[styles.flex1, { backgroundColor: colorShimmer[0] }]}>
            {/* USING TRANSFORM */}
            <Animated.View
              style={{ flex: 1, transform: [{ translateX: linearTranslate }] }}
            >
              <LinearGradient
                colors={colorShimmer}
                end={{ x: 2, y: 0.5 }}
                locations={location}
                start={{ x: -1, y: 0.5 }}
                style={{ flex: 1, width: width * widthShimmer }}
              />
            </Animated.View>

            {/* Force run children */}
            <View style={styles.gone}>{this.props.children}</View>
            {/* If style has border */}

            {((style && style.borderRadius) || hasBorder)
              && Platform.OS === 'android' ? (
                <View
                  style={[styles.borderRadiusContainer, {
                    borderColor: backgroundColorBehindBorder,
                    borderRadius: style.borderRadius || width / 2 + 40 / 2,
                  }]}
                />
              ) : null}
          </View>
        )
          : (
            children
          )}
      </View>
    );
  }
}

Shimmer.defaultProps = {
  autoRun: true,
  backgroundColorBehindBorder: COLORS.white,
  colorShimmer: COLORS.shimmerDefault,
  delay: 0,
  duration: 1000,
  hasBorder: false,
  height: 15,
  isInteraction: true,
  location: [0.3, 0.5, 0.7],
  reverse: false,
  visible: true,
  width: 200,
  widthShimmer: 1,
};

export { Shimmer };
