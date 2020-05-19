import { StyleProp, TextStyle } from "react-native";

export interface CircleProgressProps {
    /**
     * Radius of circle
     * @default 40
     */
    radius?:number;

    /**
     * width of stroke
     * @default 4
     */
    strokeWidth?:number;

    /**
     * Color stroke
     * @default '#0057e7'
     */
    strokeColor?:string;

    /**
     * Background color stroke
     * @default transparent
     */
    bgStrokeColor?:string;

    /**
     * Using radius for progress line
     * @default false
     */
    isRadius?:boolean;

    /**
     * Show number of progress or not
     * @default false
     */
    showText?:boolean;

    /**
     * Text assigned after the progress number
     * @default '''
     */
    textConcat?:string;

    /**
     * Text style for number of progress
     */
    textStyle?:StyleProp<TextStyle>
}