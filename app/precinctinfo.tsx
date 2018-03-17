import {subclass, declared, property} from "esri/core/accessorSupport/decorators";
import Widget = require("esri/widgets/Widget");
import {renderable, tsx} from "esri/widgets/support/widget";

const CSS = {
    base: "esri-precinct-info"
};

@subclass("esri.widgets.PrecinctInfo")
class PrecinctInfo extends declared(Widget) {
    @property()
    @renderable()
    precinctName: string = "Test";

    @property()
    @renderable()
    population: number = 0;

    @property()
    @renderable()
    white: number = 0;

    @property()
    @renderable()
    black: number = 0;

    @property()
    @renderable()
    amindian: number = 0;

    @property()
    @renderable()
    asian: number = 0;

    @property()
    @renderable()
    hispanic: number = 0;

    @property()
    @renderable()
    obama: number = 0;

    @property()
    @renderable()
    mccain: number = 0;

    @property()
    @renderable()
    other: number = 0;

    render() {
        return (
            <div bind={this} class={CSS.base}>
            {this.precinctName}<br />
            Population: {this.population}<br />
            <hr />
            White: {this.white}<br />
            Black: {this.black}<br />
            Hispanic: {this.hispanic}<br />
            Asian: {this.asian}<br />
            AmIndian: {this.amindian}<br />
            <hr />
            Obama: {this.obama}<br />
            McCain: {this.mccain}<br />
            Other: {this.other}<br />
            </div>
        )
    }
}

export = PrecinctInfo;