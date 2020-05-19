import { PresetEnum } from './presets'
export interface AnimatedProgressProps {
    /**
     * ype of Progress
     * @default bar
     */
    preset?: PresetEnum;

    /**
     * Progress of whatever the indicator is indicating. A number between 0 and 100.
     * @default 0
     */
    progress?: number;

    /**
     * Whether or not to animate changes to progress.
     * @default true
     */
    animated?: boolean;

    /**
     * Sets animation duration in milliseconds when indeterminate is set
     * @default 1000
     */
    duration?: number;

    /**
     * If set to true, the indicator will spin
     * @default false
     */
    indeterminate?: boolean;
}