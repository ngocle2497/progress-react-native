export interface PieProgressProps {
    /**
     * Radius of Pie
     * @default 40
     */
    radius?: number;

    /**
     * Color of progress
     * @default '#0057e7'
     */
    fillColor?: string;

    /**
     * Background color stroke
     * @default transparent
     */
    bgColor?: string;

    /**
     * Width of stroke
     * @default 1
     */
    strokeWidth?:number;

    /**
     * Stroke color
     * @default '#0057e7'
     */
    strokeColor?:string;
}