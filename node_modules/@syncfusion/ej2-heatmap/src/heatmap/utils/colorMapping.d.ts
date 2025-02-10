import { ChildProperty } from '@syncfusion/ej2-base';
import { HeatMap } from '../heatmap';
import { PaletteType, ColorGradientMode } from '../utils/enum';
import { ColorCollection } from '../model/base';
import { PaletteCollectionModel, FillColorModel } from '../model/base-model';
/**
 * Sets and gets the options to customize the color palette of heatmap.
 */
export declare class PaletteSettings extends ChildProperty<PaletteSettings> {
    /**
     * Sets and gets the color palette collection for heatmap cell.
     */
    palette: PaletteCollectionModel[];
    /**
     * Specifies the style in which the color is to be applied to the cells.
     * * Gradient - Renders the heatmap cells with linear gradient colors.
     * * Fixed - Renders the heatmap cells with fixed colors.
     *
     * @default 'Gradient'
     */
    type: PaletteType;
    /**
     * Specifies the color for the empty points in heatmap.
     *
     * @default ''
     */
    emptyPointColor: string;
    /**
     * Specifies the color gradient mode in heatmap. This property is used to set the minimum and maximum values for colors based on row and column.
     *
     * @default 'Table'
     */
    colorGradientMode: ColorGradientMode;
    /**
     * Specifies the options to set fill colors.
     */
    fillColor: FillColorModel;
}
/**
 * Helper class for colormapping
 */
export declare class RgbColor {
    R: number;
    G: number;
    B: number;
    constructor(r: number, g: number, b: number);
}
export declare class CellColor {
    heatMap: HeatMap;
    constructor(heatMap?: HeatMap);
    /**
     * To convert hexa color to RGB.
     *
     * @returns {any}
     * @private
     */
    convertToRGB(value: number, colorMapping: ColorCollection[]): RgbColor;
    /**
     * To convert RGB to HEX.
     *
     * @returns {string}
     * @private
     */
    rgbToHex(r: number, g: number, b: number): string;
    /**
     * To convert Component to HEX.
     *
     * @returns {string}
     * @private
     */
    protected componentToHex(c: number): string;
    /**
     * To get similar color.
     *
     * @returns {string}
     * @private
     */
    protected getEqualColor(list: ColorCollection[], offset: number): string;
    /**
     * To convert RGB to HEX.
     *
     * @returns {string}
     * @private
     */
    protected convertToHex(color: string): string;
    /**
     * To get RGB for percentage value.
     *
     * @returns {any}
     * @private
     */
    protected getPercentageColor(percent: number, previous: string, next: string): RgbColor;
    /**
     * To convert numbet to percentage.
     *
     * @returns {any}
     * @private
     */
    protected getPercentage(percent: number, previous: number, next: number): number;
    /**
     * To get complete color Collection.
     *
     * @private
     */
    getColorCollection(): void;
    /**
     * To update legend color Collection.
     *
     * @private
     */
    private updateLegendColorCollection;
    /**
     * To get ordered palette color collection.
     *
     * @private
     */
    private orderbyOffset;
    /**
     * To get color depends to value.
     *
     * @private
     */
    getColorByValue(text: number): string;
    /**
     * @returns {void}
     * @private
     */
    destroy(): void;
}
