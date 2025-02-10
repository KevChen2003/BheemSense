import { ChildProperty } from '@syncfusion/ej2-base';
import { HeatMap } from '../heatmap';
import { GradientPointer } from '../utils/helper';
import { Size, CanvasTooltip, LegendRange } from '../utils/helper';
import { LegendPosition, Alignment, LabelDisplayType } from '../utils/enum';
import { FontModel, TitleModel } from '../model/base-model';
import { Rect, CurrentLegendRect } from '../utils/helper';
import { Tooltip as tool } from '@syncfusion/ej2-svg-base';
/**
 * Gets and sets the options to customize the legend in the heatmap.
 */
export declare class LegendSettings extends ChildProperty<LegendSettings> {
    /**
     * Sets and gets the height of the legend.
     *
     * @default ''
     */
    height: string;
    /**
     * Sets and gets the width of the legend.
     *
     * @default ''
     */
    width: string;
    /**
     * Sets and gets the options to customize the title of the legend.
     *
     * @default ''
     */
    title: TitleModel;
    /**
     * Sets and gets the position of the legend.
     *
     * @default 'Right'
     */
    position: LegendPosition;
    /**
     * Specifies whether the legend should be visible or not.
     *
     * @default true
     */
    visible: boolean;
    /**
     * Specifies the alignment of the legend.
     *
     * @default 'Center'
     */
    alignment: Alignment;
    /**
     * Specifies whether the labels in the legend should be visible or not.
     *
     * @default true
     */
    showLabel: boolean;
    /**
     * Enables or disables the visibility of the gradient pointer in the gradient legend.
     *
     * @default true
     */
    showGradientPointer: boolean;
    /**
     * Specifies whether smart legend should be displayed or not when palette type is fixed.
     *
     * @default false
     */
    enableSmartLegend: boolean;
    /**
     * Specifies the display mode for label for smart legend. The available display types are,
     * * All: All the labels in the legend are displayed.
     * * Edge: Labels will be displayed only at the edges of the legend.
     * * None: No labels are displayed.
     *
     * @default 'All'
     */
    labelDisplayType: LabelDisplayType;
    /**
     * Sets and gets the options to customize the font style of the legend label.
     *
     * @default ''
     */
    textStyle: FontModel;
    /**
     * Used to format the legend label.
     *
     * @default ''
     */
    labelFormat: string;
    /**
     * Enables or disables the toggle visibility of heatmap cells based on legend item selection.
     *
     * @default true
     */
    toggleVisibility: boolean;
}
/**
 *
 * The `Legend` module is used to render legend for the heatmap.
 */
export declare class Legend {
    private heatMap;
    private drawSvgCanvas;
    private legend;
    legendGroup: Rect;
    legendRectScale: Rect;
    maxLegendLabelSize: Size;
    gradientPointer: HTMLElement;
    private legendHeight;
    private legendWidth;
    private height;
    private width;
    private legendRectPadding;
    private gradientScaleSize;
    private segmentCollections;
    private segmentCollectionsLabels;
    private labelPosition;
    private textWrapCollections;
    labelCollections: string[];
    labelCollection: string[];
    private legendMinValue;
    private legendMaxValue;
    private legendSize;
    previousOptions: GradientPointer;
    listPerPage: number;
    private numberOfPages;
    private listHeight;
    private listWidth;
    private legendScale;
    fillRect: Rect;
    private legendRect;
    currentPage: number;
    private lastList;
    navigationCollections: Rect[];
    private pagingRect;
    private labelPadding;
    private paginggroup;
    private translategroup;
    private listInterval;
    legendLabelTooltip: CanvasTooltip[];
    legendTitleTooltip: CanvasTooltip[];
    private numberOfRows;
    private labelXCollections;
    private labelYCollections;
    private legendXCollections;
    private legendYCollections;
    /** @private */
    legendRectPositionCollection: CurrentLegendRect[];
    /** @private */
    legendRange: LegendRange[];
    /** @private */
    legendTextRange: LegendRange[];
    /** @private */
    visibilityCollections: boolean[];
    /** @private */
    tooltipObject: tool;
    /** @private */
    format: Function;
    constructor(heatMap?: HeatMap);
    /**
     * Get module name
     */
    protected getModuleName(): string;
    /**
     * To destroy the Legend.
     *
     * @returns {void}
     * @private
     */
    protected destroy(): void;
    /**
     * @private
     */
    renderLegendItems(): void;
    private renderElements;
    private calculateCanvasColorRange;
    private calculateColorRange;
    private renderTitle;
    private renderSmartLegend;
    private colorRangeLegendPosition;
    private renderLegendLabel;
    /**
     * @private
     */
    renderGradientPointer(e: PointerEvent, pageX: number, pageY: number): void;
    /**
     * @private
     */
    removeGradientPointer(): void;
    /**
     * @private
     */
    calculateLegendBounds(rect: Rect): void;
    private calculateTitleBounds;
    private calculateListLegendBounds;
    private getMaxLabelSize;
    /**
     * @private
     */
    calculateLegendSize(rect: Rect, legendTop: number): void;
    private measureListLegendBound;
    private renderPagingElements;
    private calculateGradientScale;
    private calculateColorAxisGrid;
    private renderColorAxisGrid;
    /**
     * @private
     */
    renderLegendTitleTooltip(e: PointerEvent, pageX: number, pageY: number): void;
    /**
     * @private
     */
    renderLegendLabelTooltip(e: PointerEvent, pageX: number, pageY: number): void;
    private calculateListPerPage;
    private renderListLegendMode;
    /**
     * @private
     */
    translatePage(heatMap: HeatMap, page: number, isNext: boolean): void;
    /**
     * To create div container for tooltip which appears on hovering the smart legend.
     *
     * @param heatmap
     * @private
     */
    createTooltipDiv(): void;
    /**
     * To render tooltip for smart legend.
     *
     * @private
     */
    renderTooltip(currentLegendRect: CurrentLegendRect): void;
    /**
     * To create tooltip for smart legend.
     *
     * @private
     */
    createTooltip(pageX: number, pageY: number): void;
    /**
     * Toggle the visibility of cells based on legend selection
     *
     * @private
     */
    legendRangeSelection(index: number): void;
    /**
     * update visibility collections of legend and series
     *
     * @private
     */
    updateLegendRangeCollections(): void;
}
