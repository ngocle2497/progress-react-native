import React, { memo, useMemo } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import isEqual from 'react-fast-compare'
import Svg, { Path, Circle } from 'react-native-svg'
import Animated, { interpolate, cos, multiply, sin, concat, sub, cond, eq, greaterThan } from 'react-native-reanimated'
import { PieProgressProps } from './type'
import { DEFAULT_BG_COLOR, DEFAULT_FILL_COLOR, DEFAULT_RADIUS, DEFAULT_STROKE_COLOR, DEFAULT_STROKE_WIDTH, } from './constant'
import { MIN_PROGRESS, MAX_PROGRESS } from '../constant'
import { toRad } from 'react-native-redash'

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PieComponent = ({ progressAnim, progressSpin, strokeColor = DEFAULT_STROKE_COLOR, strokeWidth = DEFAULT_STROKE_WIDTH, bgColor = DEFAULT_BG_COLOR, fillColor = DEFAULT_FILL_COLOR, radius = DEFAULT_RADIUS }: PieProgressProps ) => {

    // variable
    const alpha = interpolate(progressAnim, { inputRange: [MIN_PROGRESS, MAX_PROGRESS], outputRange: [0, Math.PI * 2] })
    const x = sub(radius, multiply(cos(alpha), radius))
    const y = sub(radius, multiply(sin(alpha), radius))
    const largeArc = cond(greaterThan(progressAnim, MAX_PROGRESS / 2), 1, 0)
    const d = concat(`M${radius},${radius} L0,${radius} A${radius},${radius} 0 `, largeArc, " 1 ", x, ",", y, `L${radius},${radius}`)
    const opacity = cond(eq(progressAnim, MAX_PROGRESS), 1, 0)

    // style
    const border = useMemo(() => ({ borderRadius: radius, borderWidth: strokeWidth, borderColor: strokeColor, }), [strokeWidth, radius, strokeColor])
    const svgStyle = [border, { transform: [{ rotate: interpolate(progressSpin, { inputRange: [0, 1], outputRange: [toRad(0), Math.PI * 2] }) }] }] as StyleProp<ViewStyle>;
    return (
        <AnimatedSvg width={(radius) * 2} height={radius * 2} style={svgStyle}>
            <Circle r={radius} x={radius} y={radius} fill={bgColor} />
            <AnimatedPath fill={fillColor} d={d} />
            <AnimatedCircle r={radius} x={radius} y={radius} fill={fillColor} opacity={opacity} />
        </AnimatedSvg>
    )
}

export default memo(PieComponent, (prevProps, nextProps) => isEqual(prevProps, nextProps))
