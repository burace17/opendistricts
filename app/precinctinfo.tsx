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

    render() {
        return (
            <div bind={this} class={CSS.base}>
            {this.precinctName}
            </div>
        )
    }
}

export = PrecinctInfo;