import { ChildProperty } from '@syncfusion/ej2-base';
import { Alignment, TextOverflow, BorderType } from '../utils/enum';
import { FontModel, MultiLevelCategoriesModel, AxisLabelBorderModel } from './base-model';
/**
 * Sets and gets the options to customize the text in heatmap.
 */
export declare class Font extends ChildProperty<Font> {
    /**
     * Specifies the font size for the text.
     *
     * @default '16px'
     */
    size: string;
    /**
     * Specifies the color for the text.
     *
     * @default ''
     */
    color: string;
    /**
     * Specifies the font family for the text.
     */
    fontFamily: string;
    /**
     * Specifies the font weight for the text.
     *
     * @default 'Normal'
     */
    fontWeight: string;
    /**
     * Specifies the font style for the text.
     *
     * @default 'Normal'
     */
    fontStyle: string;
    /**
     * Specifies the text alignment.
     *
     * @default 'Center'
     */
    textAlignment: Alignment;
    /**
     * Specifies the overflow style for the text in heatmap.
     *
     * @default 'Trim'
     */
    textOverflow: TextOverflow;
}
/**
 * Sets and gets the options to configures the margins of the heatmap.
 */
export declare class Margin extends ChildProperty<Margin> {
    /**
     * Specifies the left margin in pixels.
     *
     * @default 10
     */
    left: number;
    /**
     * Specifies the right margin in pixels.
     *
     * @default 10
     */
    right: number;
    /**
     * Specifies the top margin in pixels.
     *
     * @default 10
     */
    top: number;
    /**
     * Specifies the bottom margin in pixels.
     *
     * @default 10
     */
    bottom: number;
}
/**
 * Sets and gets the options to customize the borders in the heatmap.
 */
export declare class Border extends ChildProperty<Border> {
    /**
     * Sets and gets the color of the border that accepts value in hex value and rgba as a valid CSS color string.
     *
     * @default ''
     */
    color: string;
    /**
     * Specifies the width of the border in pixels.
     *
     * @default 1
     */
    width: number;
    /**
     * Specifies the radius of the border in pixels.
     *
     * @default ''
     */
    radius: number;
}
/**
 * Sets and gets the options to customize the tooltip borders in the heatmap.
 */
export declare class TooltipBorder extends ChildProperty<TooltipBorder> {
    /**
     * Specifies the color of the border that accepts value in hex and rgba as a valid CSS color string.
     *
     * @default ''
     */
    color: string;
    /**
     * Sets and gets the width of the border in pixels.
     *
     * @default 0
     */
    width: number;
}
/**
 * Sets and gets the options to configure the mapping value for size and color in bubble cell type.
 */
export declare class BubbleData extends ChildProperty<BubbleData> {
    /**
     * Specifies the mapping value to set size from the data source.
     *
     * @default null
     */
    size: string;
    /**
     * Specifies the mapping value to set color from the data source.
     *
     * @default null
     */
    color: string;
}
/**
 * Sets and gets the options to customize the title of heatmap.
 */
export declare class Title extends ChildProperty<Title> {
    /**
     * Sets and gets the text for the title.
     *
     * @default ''
     */
    text: string;
    /**
     * Sets and gets the options to customize the text of the title.
     */
    textStyle: FontModel;
}
/**
 * Sets and gets the options to apply the fill color value for cell color range.
 */
export declare class FillColor extends ChildProperty<FillColor> {
    /**
     * Specifies the minimum fill color for cell color range.
     *
     * @default '#eeeeee'
     */
    minColor: string;
    /**
     * Specifies the maximum fill color for cell color range.
     *
     * @default '#eeeeee'
     */
    maxColor: string;
}
/**
 * Sets and gets the options to customize palette colors.
 */
export declare class PaletteCollection extends ChildProperty<PaletteCollection> {
    /**
     * Sets and gets the value in the heatmap data to set the palette color.
     *
     * @default null
     */
    value: number;
    /**
     * Sets and gets the color for a palette.
     *
     * @default ''
     */
    color: string;
    /**
     * Sets and gets the label to be set in the corresponding legend for the palette color.
     *
     * @default ''
     */
    label: string;
    /**
     * Sets and gets the start value in the heatmap data to set the palette color.
     *
     * @default null
     */
    startValue: number;
    /**
     * Sets and gets the end value in the heatmap data to set the palette color.
     *
     * @default null
     */
    endValue: number;
    /**
     * Sets and gets the minimum color for color range in a palette.
     *
     * @default null
     */
    minColor: string;
    /**
     * Sets and gets the maximum color for color range in a palette.
     *
     * @default null
     */
    maxColor: string;
}
/**
 * Sets and gets the options to customize the label border.
 */
export declare class AxisLabelBorder extends ChildProperty<AxisLabelBorder> {
    /**
     * Sets and gets the color of the border that accepts value in hex value and rgba as a valid CSS color string.
     *
     * @default ''
     */
    color: string;
    /**
     * Specifies the width of the border in pixels.
     *
     * @default 1
     */
    width: number;
    /**
     * Specifies the type of the border for the axis labels. The following are the available types.
     * * Rectangle
     * * Without Top Border
     * * Without Top/Bottom Border
     * * Without Border
     * * Without Bottom Border
     * * Brace
     *
     * @default 'Rectangle'
     */
    type: BorderType;
}
/**
 * Sets and gets the options to customize the size of the bubble heatmap cell type.
 */
export declare class BubbleSize extends ChildProperty<BubbleSize> {
    /**
     * Specifies the minimum radius value of the cell in percentage.
     *
     * @default '0%'
     */
    minimum: string;
    /**
     * Specifies the maximum radius value of the cell in percentage.
     *
     * @default '100%'
     */
    maximum: string;
}
/**
 * Sets and gets the options to configure the multi-level labels.
 */
export declare class MultiLevelCategories extends ChildProperty<MultiLevelCategories> {
    /**
     * Specifies the start value of the multi-level label.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    start: number | Date | string;
    /**
     * Specifies the end value of the multi-level label.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    end: number | Date | string;
    /**
     * Specifies the text for multi-level label.
     *
     * @default ''
     */
    text: string;
    /**
     * Specifies the maximum width of the text for multi-level label.
     *
     * @default null
     * @aspDefaultValueIgnore
     */
    maximumTextWidth: number;
}
/**
 * Sets and gets the options to customize the multi-level labels.
 */
export declare class MultiLevelLabels extends ChildProperty<MultiLevelLabels[]> {
    /**
     * Specifies the position of the multi-level labels. The available positions are,
     * * Near: Places the multi-level labels at left end of the available space.
     * * Center: Places the multi-level labels at center of the available space.
     * * Far: Places the multi-level labels at right end of the available space.
     *
     * @default 'Center'
     */
    alignment: Alignment;
    /**
     * Sets and gets the overflow style of the multi-level labels. The available types are,
     * * None: No action is taken when the text overflows.
     * * Wrap: Wraps the multi-level labels when the text overflows.
     * * Trim: Trims the multi-level labels when the text overflows.
     *
     * @default 'Wrap'
     */
    overflow: TextOverflow;
    /**
     * Sets and gets the options to customize the text of the multi-level labels.
     */
    textStyle: FontModel;
    /**
     * Sets and gets the options to customize the border of the multi-level labels.
     */
    border: AxisLabelBorderModel;
    /**
     * Sets and gets the options to configure the multi-level labels.
     */
    categories: MultiLevelCategoriesModel[];
}
/**
 * Internal class used to maintain colorcollection.
 *
 * @private
 */
export declare class ColorCollection {
    value: number;
    color: string;
    label: string;
    startValue: number;
    endValue: number;
    minColor: string;
    maxColor: string;
    constructor(value: number, color: string, label: string, startValue: number, endValue: number, minColor: string, maxColor: string);
}
/**
 * Specifies the current data of the bubble cell.
 */
export declare class BubbleTooltipData {
    /** Defines the field name from the data source which is mapped to the bubble cell. */
    mappingName: string;
    /** Defines the value which mapped to the bubble cell. */
    bubbleData: number;
    /** Defines the type of the bubble heatmap. */
    valueType: string;
    /**
     * @param {string} mappingName - Specifies the mapping name.
     * @param {number} bubbleData - Specifies the bubble data.
     * @param {string} valueType - Specifies the value type.
     * @private
     */
    constructor(mappingName: string, bubbleData: number, valueType: string);
}
/**
 * Internal class used to maintain legend colorcollection.
 *
 * @private
 */
export declare class LegendColorCollection {
    value: number;
    color: string;
    label: string;
    startValue: number;
    endValue: number;
    minColor: string;
    maxColor: string;
    isHidden: boolean;
    constructor(value: number, color: string, label: string, startValue: number, endValue: number, minColor: string, maxColor: string, isHidden: boolean);
}
/**
 * class used to maintain xAxis labels details for multipleRow label intersect action.
 *
 * @private
 */
export declare class MultipleRow {
    start: number;
    end: number;
    index: number;
    label: string;
    row: number;
    constructor(start: number, end: number, index: number, label: string, row: number);
}
