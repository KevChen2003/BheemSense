import { ChildProperty } from '@syncfusion/ej2-base';
import { HeatMap } from '../heatmap';
import { CurrentRect } from '../utils/helper';
import { BorderModel, FontModel, BubbleSizeModel } from '../model/base-model';
import { CellType, BubbleType } from '../utils/enum';
/**
 * Sets and gets the options to configure the cells of the heatmap.
 */
export declare class CellSettings extends ChildProperty<CellSettings> {
    /**
     * Gets or sets the template that will be used to render custom elements for cell values.
     *
     * @default null
     * @aspType string
     */
    labelTemplate: string | Function;
    /**
     * Enables or disables the visibility of data label over the heatmap cells.
     *
     * @default true
     */
    showLabel: boolean;
    /**
     * Used to format the label in the heatmap cells.
     *
     * @default ''
     */
    format: string;
    /**
     * Enable or disable the cell highlighting on mouse hover.
     *
     * @default true
     */
    enableCellHighlighting: boolean;
    /**
     * Specifies the minimum and maximum radius value of the cell in percentage.
     *
     * @default ''
     */
    bubbleSize: BubbleSizeModel;
    /**
     * Sets and gets the options to customize the cell border style.
     *
     * @default ''
     */
    border: BorderModel;
    /**
     * Sets and gets the options to customize the cell label style.
     *
     * @default ''
     */
    textStyle: FontModel;
    /**
     * Sets and gets the type of the cells in heatmap. The available types are,
     * * Rect: Renders the heatmap cells in rectangle shape.
     * * Bubble: Renders the heatmap cells in bubble shape.
     *
     * @default 'Rect'
     */
    tileType: CellType;
    /**
     * Specifies the type of the bubble heatmap. The available types are,
     * * Size: The bubble heatmap will be rendered in size variations based on the provided data.
     * * Color: The bubble heatmap will be rendered in color variations based on the provided data.
     * * Sector: The bubble heatmap will be rendered as sectors based on the provided data.
     * * SizeAndColor: The bubble heatmap will be rendered in size and color variations based on the provided data.
     *
     * @default 'Color'
     */
    bubbleType: BubbleType;
    /**
     * Enable or disable the bubble to display in inverse when `Size` and `SizeAndColor` bubble types are set.
     *
     * @default false
     */
    isInversedBubbleSize: boolean;
}
export declare class Series {
    private heatMap;
    private drawSvgCanvas;
    private cellColor;
    private text;
    private color;
    private bubbleColorValue;
    hoverXAxisLabel: string | number;
    hoverYAxisLabel: string | number;
    hoverXAxisValue: string | number | Date;
    hoverYAxisValue: string | number | Date;
    constructor(heatMap?: HeatMap);
    /** @private */
    containerRectObject: Element;
    /** @private */
    containerTextObject: Element;
    /** @private */
    format: Function;
    checkLabelYDisplay: boolean;
    checkLabelXDisplay: boolean;
    rectPositionCollection: CurrentRect[][];
    /**
     * To render rect series.
     *
     * @returns {void}
     * @private
     */
    renderRectSeries(): void;
    /**
     * To toggle the cell text color based on legend selection.
     */
    private isCellValueInRange;
    /**
     * To customize the cell.
     *
     * @returns {void}
     * @private
     */
    cellRendering(rectPosition: CurrentRect, text: string): string;
    /**
     * To set color and text details.
     *
     * @private
     */
    private setTextAndColor;
    /**
     * To update rect details.
     *
     * @private
     */
    private createSeriesGroup;
    /**
     * To update rect details.
     *
     * @private
     */
    private updateRectDetails;
    /**
     * To Render Tile Cell.
     *
     * @private
     */
    private renderTileCell;
    /**
     * To get bubble radius.
     *
     * @private
     */
    private getBubbleRadius;
    /**
     * To Render Bubble Cell.
     *
     * @private
     */
    private renderSectorCell;
    /**
     * To Render sector Cell.
     *
     * @private
     */
    private calculateShapes;
    /**
     * To Render Bubble Cell.
     *
     * @private
     */
    private renderBubbleCell;
    /**
     * To adjust the cell label text with respect to cell height in wrap case
     *
     * @private
     */
    private updateLabelText;
    /**
     * To find whether the X,Y Label need to display or not.
     *
     * @private
     */
    private updateLabelVisibleStatus;
    /**
     * To find percentage value.
     *
     * @private
     */
    private getRadiusBypercentage;
    /**
     * To find saturated color for datalabel.
     *
     * @returns {string}
     * @private
     */
    private getSaturatedColor;
    /**
     * To highlight the mouse hovered rect cell.
     *
     * @returns {void}
     * @private
     */
    highlightSvgRect(tempID: string): void;
    /**
     * To get the value depends to format.
     *
     * @returns {string}
     * @private
     */
    getFormatedText(val: number, getFormat: string): string;
    /**
     * To get mouse hovered cell details.
     *
     * @returns {CurrentRect}
     * @private
     */
    getCurrentRect(x: number, y: number): CurrentRect;
    /**
     * @returns {void}
     * @private
     */
    destroy(): void;
}
