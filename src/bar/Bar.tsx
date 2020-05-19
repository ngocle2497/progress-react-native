import React, { memo, useCallback, useState, useMemo } from 'react'
import { View, LayoutChangeEvent, ViewStyle, StyleProp } from 'react-native'
import isEqual from 'react-fast-compare'
import { BarProgressProps } from './type'
import { DEFAULT_BORDER_RADIUS, DEFAULT_COLOR, DEFAULT_BORDER_COLOR, DEFAULT_HEIGHT, DEFAULT_BORDER_WIDTH } from './constant'
import Animated, { interpolate, Extrapolate, multiply } from 'react-native-reanimated'
import { MAX_PROGRESS, MIN_PROGRESS } from '../constant'


const BarComponent = ({ progressAnim, progressSpin, indeterminate,
    borderWith = DEFAULT_BORDER_WIDTH,
    borderColor = DEFAULT_BORDER_COLOR,
    borderRadius = DEFAULT_BORDER_RADIUS,
    color = DEFAULT_COLOR,
    height = DEFAULT_HEIGHT }: BarProgressProps) => {
    // variable
    const [barWidth, setBarWidth] = useState(0)

    // function
    const _onLayout = useCallback(
        (e: LayoutChangeEvent) => {
            setBarWidth(e.nativeEvent.layout.width)
        },
        [],
    )

    // style
    const containerStyle = useMemo(() => [{
        width: '100%',
        height: height,
        borderRadius: borderRadius,
        borderWidth: borderWith,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: borderColor,
    }] as StyleProp<ViewStyle>, [height, color, borderRadius, barWidth])
    const width = interpolate(progressAnim, { inputRange: [MIN_PROGRESS, MAX_PROGRESS], outputRange: [0, barWidth], extrapolate: Extrapolate.CLAMP })
    const progressStyle = [{
        width,
        transform: [{ translateX: indeterminate ? interpolate(progressSpin, { inputRange: [0, 1], outputRange: [multiply(-1, width), barWidth] }) : 0 }],
        backgroundColor: color,
        left: 0,
        position: 'absolute',
        borderRadius: borderRadius,
        height: '100%',
    }] as StyleProp<ViewStyle>;

    // render
    return (
        <View onLayout={_onLayout} style={containerStyle}>
            <Animated.View style={progressStyle} />
        </View>
    )
}

export default memo(BarComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps))


