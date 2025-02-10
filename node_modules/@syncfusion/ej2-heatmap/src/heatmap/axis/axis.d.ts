/**
 * HeatMap Axis file
 */
import { ChildProperty } from '@syncfusion/ej2-base';
import { Orientation } from '../utils/enum';
import { FontModel, TitleModel, AxisLabelBorderModel, MultiLevelLabelsModel } from '../model/base-model';
import { MultipleRow } from '../model/base';
import { Rect, Size } from '../utils/helper';
import { MultiLevelPosition } from '../utils/helper';
import { ValueType, IntervalType, LabelIntersectAction, LabelType } from '../utils/enum';
import { HeatMap } from '../heatmap';
/**
 * Sets and gets the options to customize the axis of the heatmap.
 */
export declare class Axis extends ChildProperty<Axis> {
    /**
     * Sets and gets the options to customize the title of heatmap axis.
     *
     * @default ''
     */
    title: TitleModel;
    /**
     * Enables or disables the axis to render in opposed position. If set to true, the axis will render at the opposite side of its default position.
     *
     * @default false
     */
    opposedPosition: boolean;
    /**
     * Sets and gets the list of texts to be displayed in an axis as labels.
     *
     * @default null
     */
    labels: string[];
    /**
     * Sets and gets the options to customize the axis labels.
     */
    textStyle: FontModel;
    /**
     * Sets and gets the angle to rotate the axis label.
     *
     * @default 0
     */
    labelRotation: number;
    /**
     * Enables or disables the axis to be rendered in an inversed manner.
     *
     * @default false
     */
    isInversed: boolean;
    /**
     * Specifies the type of data the axis is handling. The available types are,
     * * Numeric:  Renders a numeric axis.
     * * DateTime: Renders a axis that handles date and time.
     * * Category: Renders a axis that renders user provided labels.
     *
     * @default Category
     * @aspType Syncfusion.EJ2.HeatMap.ValueType
     * @isEnumeration true
     */
    valueType: ValueType;
    /**
     * Specifies the increment for an axis label. When this property is set, the displayed text of the labels will be multiplied with the increment value.
     *
     * @default 1
     */
    increment: number;
    /**
     * Specifies the axis label display type for the date time axis. The following are available types,
     * * None: Axis labels displayed based on the value type.
     * * Years: Displays the axis labels for every year.
     * * Months: Displays the axis labels for every month.
     * * Days: Displays the axis labels for every day.
     * * Hours: Displays the axis labels for every hour.
     *
     * @default 'None'
     */
    showLabelOn: LabelType;
    /**
     * Specifies the minimum range of an axis.
     *
     * @default null
     */
    minimum: Object;
    /**
     * Specifies the maximum range of an axis.
     *
     * @default null
     */
    maximum: Object;
    /**
     * Specifies the interval for an axis. This properties provides an interval between the axis labels.
     *
     * @default null
     */
    interval: number;
    /**
     * Used to format the axis label that accepts any global string format like 'C', 'n1', 'P' etc.
     * It also accepts placeholder like '{value}°C' in which value represent the axis label, e.g, 20°C.
     *
     * @default ''
     */
    labelFormat: string;
    /**
     * Specifies the type of the interval between the axis labels in date time axis.The available types are,
     * * Years: Defines the interval of the axis labels in years.
     * * Months: Defines the interval of the axis labels in months.
     * * Days: Defines the interval of the axis labels in days.
     * * Hours: Defines the interval of the axis labels in hours.
     * * Minutes: Defines the interval of the axis labels in minutes.
     *
     * @default 'Days'
     */
    intervalType: IntervalType;
    /**
     * Specifies the actions when the axis labels intersect with each other.The actions available are,
     * * None: Shows all the labels.
     * * Trim : Trims the label when label text intersects with other labels.
     * * Rotate45: Rotates the label to 45 degree when it intersects other labels.
     * * MultipleRows: Shows all the labels as multiple rows when it intersects other labels.
     *
     * @default Trim
     */
    labelIntersectAction: LabelIntersectAction;
    /**
     * Enables or disables the trimming of the axis labels when the label exceeds maximum length.
     *
     * @default false
     */
    enableTrim: boolean;
    /**
     * Specifies the maximum length of the axis labels.
     *
     * @default 35.
     */
    maxLabelLength: number;
    /**
     * Set and gets the options to customize the border of the axis labels.
     */
    border: AxisLabelBorderModel;
    /**
     * Sets and gets the options to customize the multi level labels for an axis.
     */
    multiLevelLabels: MultiLevelLabelsModel[];
    /** @private */
    orientation: Orientation;
    /** @private */
    multipleRow: MultipleRow[];
    /** @private */
    rect: Rect;
    /** @private */
    nearSizes: number[];
    /** @private */
    farSizes: number[];
    /** @private */
    maxLabelSize: Size;
    /** @private */
    titleSize: Size;
    /** @private */
    multilevel: number[];
    /** @private */
    axisLabels: string[];
    /** @private */
    tooltipLabels: string[];
    /** @private */
    labelValue: (string | number | Date)[];
    /** @private */
    axisLabelSize: number;
    /** @private */
    axisLabelInterval: number;
    /** @private */
    dateTimeAxisLabelInterval: number[];
    /** @private */
    maxLength: number;
    /** @private */
    min: number;
    /** @private */
    max: number;
    /** @private */
    format: Function;
    /** @private */
    angle: number;
    /** @private */
    isIntersect: boolean;
    /** @private */
    jsonCellLabel: string[];
    multiLevelSize: Size[];
    /** @private */
    xAxisMultiLabelHeight: number[];
    /** @private */
    yAxisMultiLabelHeight: number[];
    /** @private */
    multiLevelPosition: MultiLevelPosition[];
    /**
     * measure the axis title and label size
     *
     * @param axis
     * @param heatmap
     * @private
     */
    computeSize(axis: Axis, heatmap: HeatMap, rect: Rect): void;
    /**
     * calculating x, y position of multi level labels
     *
     * @private
     */
    multiPosition(axis: Axis, index: number): MultiLevelPosition;
    private multiLevelLabelSize;
    private getMultilevelLabelsHeight;
    private getTitleSize;
    private getMaxLabelSize;
    /**
     * Generate the axis lables for numeric axis
     *
     * @param heatmap
     * @private
     */
    calculateNumericAxisLabels(heatmap: HeatMap): void;
    /**
     * Generate the axis lables for category axis
     *
     * @private
     */
    calculateCategoryAxisLabels(): void;
    /**
     * Generate the axis labels for date time axis.
     *
     * @param heatmap
     * @private
     */
    calculateDateTimeAxisLabel(heatmap: HeatMap): void;
    private calculateLabelInterval;
    /**
     * @private
     */
    getSkeleton(): string;
    /** @private */
    getTotalLabelLength(min: number, max: number): number;
    /**
     * Clear the axis label collection
     *
     * @private
     */
    clearAxisLabel(): void;
    /**
     * Clear the axis label collection
     *
     * @private
     */
    clearMultipleRow(): void;
    /**
     * @returns {void}
     * @private
     */
    destroy(): void;
}
