var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "@syncfusion/ej2-base/helpers/e2e"], function (require, exports, e2e_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var HeatMapHelper = (function (_super) {
        __extends(HeatMapHelper, _super);
        function HeatMapHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        HeatMapHelper.prototype.getHeatMapContainer = function () {
            return this.selector('#' + this.id);
        };
        HeatMapHelper.prototype.getTooltipElement = function () {
            return this.selector('#' + this.id + 'Celltooltipcontainer');
        };
        HeatMapHelper.prototype.getSecondaryElement = function () {
            return this.selector('#' + this.id + '_Secondary_Element');
        };
        HeatMapHelper.prototype.getLegendElement = function () {
            return this.selector('#' + this.id + '_Heatmap_Legend');
        };
        HeatMapHelper.prototype.getAxisElement = function () {
            return this.selector('#' + this.id + 'AxisCollection');
        };
        HeatMapHelper.prototype.getSeriesElement = function () {
            return this.selector('#' + this.id + 'Celltooltipcontainer');
        };
        return HeatMapHelper;
    }(e2e_1.TestHelper));
    exports.HeatMapHelper = HeatMapHelper;
});
