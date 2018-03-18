import {subclass, declared, property} from "esri/core/accessorSupport/decorators";
import Widget = require("esri/widgets/Widget");
import {renderable, tsx} from "esri/widgets/support/widget";

const CSS = {
    base: "district-info"
};

@subclass("esri.widgets.DistrictInfo")
class DistrictInfo extends declared(Widget) {
    @property()
    @renderable()
    population: number = 0;

    @property()
    @renderable()
    numberOfDistricts: number = 0

    private removeDistrict() {
        if (this.numberOfDistricts > 0) {
            this.numberOfDistricts--;
        }
    }

    private addDistrict() {
        this.numberOfDistricts++;
    }

    render() {
        return (
            <div bind={this} class={CSS.base}>
                State Population: {this.population.toLocaleString()}<br />
                Districts: <button bind={this} onclick={this.removeDistrict}>-</button> {this.numberOfDistricts} <button bind={this} onclick={this.addDistrict}>+</button>
            </div>
        )
    }
}

export = DistrictInfo