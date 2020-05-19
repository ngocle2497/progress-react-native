import React, { memo } from 'react'
import isEquals from 'react-fast-compare'
import { AnimatedProgressProps } from './type'
import { DEFAULT_PRESET_PROGRESS, DEFAULT_DURATION, DEFAULT_PROGRESS, DEFAULT_ANIMATED, DEFAULT_INDETERMINATE, MAX_PROGRESS, MIN_PROGRESS } from './constant'
import { PresetEnum, PresetProps, Presets } from './presets'
import { useValue, timing, clamp, loop } from 'react-native-redash'
import { useCode, set } from 'react-native-reanimated'

function AnimatedProgressComponent<T extends PresetEnum>(props: AnimatedProgressProps & PresetProps<T>) {
    // props
    const { preset = DEFAULT_PRESET_PROGRESS,
        indeterminate = DEFAULT_INDETERMINATE,
        duration = DEFAULT_DURATION,
        animated = DEFAULT_ANIMATED,
        progress = DEFAULT_PROGRESS, } = props;
    if (Object.keys(Presets).indexOf(preset) < 0) {
        throw new Error(
            `Wrong preset been provided. expected one of these: [${Object.keys(
                Presets
            ).join(', ')}], but found "${preset}".`
        );
    }
    // variable
    const progressAnimated = useValue(0)
    const progressSpin = useValue(0)
    const actualProgress = clamp(progressAnimated, MIN_PROGRESS, MAX_PROGRESS)
    // effect
    useCode(() => animated ?
        [set(progressAnimated, timing({ from: progressAnimated, to: progress, duration: duration }))] :
        [set(progressAnimated, progress)]
        , [progress])

    useCode(() => indeterminate === true ? [set(progressSpin, loop({ autoStart: true, boomerang: false, duration: duration }))] : [set(progressSpin, timing({ from: progressSpin, to: 0 }))], [indeterminate])
    // render
    const PresetComponent = Presets[preset].component;
    return (
        <PresetComponent duration={duration} indeterminate={indeterminate} progressAnim={actualProgress} progressSpin={progressSpin} {...props} />
    )
}

export const AnimatedProgress = memo(AnimatedProgressComponent, (prevProps, nextProps) => isEquals(prevProps, nextProps))

