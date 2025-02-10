import { createElement, Component } from 'react';
import { HeatMap } from '@syncfusion/ej2-heatmap';
export * from '@syncfusion/ej2-heatmap';
import { applyMixins, ComponentBase } from '@syncfusion/ej2-react-base';
export { Inject } from '@syncfusion/ej2-react-base';

/**
 * Represents the React HeatMap component.
 * This is used to customize the properties of the heatmap in order to visualize two-dimensional data, with values represented by gradient or solid color variations.
 * ```tsx
 * <HeatMapComponent></HeatMapComponent>
 * ```
 */
class HeatMapComponent extends HeatMap {
    constructor(props) {
        super(props);
        this.initRenderCalled = false;
        this.checkInjectedModules = true;
        this.statelessTemplateProps = null;
        this.templateProps = null;
        this.immediateRender = true;
        this.isReactMock = true;
        this.portals = [];
    }
    render() {
        this.isReactMock = false;
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            super.render();
            this.initRenderCalled = true;
        }
        else {
            return createElement('div', this.getDefaultAttributes(), [].concat(this.props.children, this.portals));
        }
    }
}
applyMixins(HeatMapComponent, [ComponentBase, Component]);

export { HeatMapComponent };
//# sourceMappingURL=ej2-react-heatmap.es2015.js.map
