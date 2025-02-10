/**
 * HeatMap tool tip file
 */
import { ChildProperty } from '@syncfusion/ej2-base';
import { HeatMap } from '../heatmap';
import { CurrentRect } from '../utils/helper';
import { Tooltip as tool } from '@syncfusion/ej2-svg-base';
import { TooltipBorderModel, FontModel } from '../model/base-model';
/**
 * Sets and gets the options to customize the tooltip in heatmap.
 */
export declare class TooltipSettings extends ChildProperty<TooltipSettings> {
    /**
     * Sets and gets the custom template to format the tooltip content.
     *
     * @default ''
     */
    template: string;
    /**
     * Specifies the color to be applied to the tooltip.
     *
     * @default ''
     */
    fill: string;
    /**
     * Sets and gets the options to customize the cell border style.
     */
    border: TooltipBorderModel;
    /**
     * Sets and gets the options to customize the cell label style.
     */
    textStyle: FontModel;
}
/**
 *
 * The `Tooltip` module is used to render the tooltip for heatmap series.
 */
export declare class Tooltip {
    private heatMap;
    private isFirst;
    isFadeout: boolean;
    tooltipObject: tool;
    constructor(heatMap?: HeatMap);
    /**
     * Get module name
     */
    protected getModuleName(): string;
    /**
     * To show/hide Tooltip.
     *
     * @private
     */
    showHideTooltip(isShow: boolean, isFadeout?: boolean): void;
    /**
     * To destroy the Tooltip.
     *
     * @returns {void}
     * @private
     */
    protected destroy(): void;
    /**
     * To add Tooltip to the rect cell.
     *
     * @returns {void}
     * @private
     */
    private createTooltip;
    /**
     * To create div container for tooltip.
     *
     * @returns {void}
     * @private
     */
    createTooltipDiv(heatMap: HeatMap): void;
    /**
     * To get default tooltip content.
     *
     * @private
     */
    private getTooltipContent;
    /**
     * To render tooltip.
     *
     * @private
     */
    renderTooltip(currentRect: CurrentRect): void;
    /**
     * To render tooltip.
     */
    private tooltipCallback;
}
