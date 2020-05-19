export interface BarProgressProps {

    /**
     * Height of the progress bar.
     * @default 6
     */
    height?: number;

    /**
     * Color of indicator
     * @default '#0057e7'
     */
    color?: string;

    /**
     * Rounding of corners, set to 0 to disable.
     * @default 4
     */
    borderRadius?: number;

    /**
     * Color of outer border.
     * @default '#0057e7'
     */
    borderColor?:string;
    
        /**
     * Width of outer border, set to 0 to remove.
     * @default 1
     */
    borderWith?: number;
}