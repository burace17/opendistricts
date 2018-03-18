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

    getPercentage(n: number, total: number) {
        if (total == 0) {
            return ""
        }
        else {
            return "(" + ((n / total)*100).toFixed(1) + "%)"
        }
    }

    getPresidentialTotal() {
        return this.obama + this.mccain + this.other
    }

    render() {
        return (
            <div bind={this} class={CSS.base}>
            {this.precinctName}<br />
            Population: {this.population}<br />
            <hr />
            White: {this.white} {this.getPercentage(this.white, this.population)}<br />
            Black: {this.black} {this.getPercentage(this.black, this.population)}<br />
            Hispanic: {this.hispanic} {this.getPercentage(this.hispanic, this.population)}<br />
            Asian: {this.asian} {this.getPercentage(this.asian, this.population)}<br />
            AmIndian: {this.amindian} {this.getPercentage(this.amindian, this.population)}<br />
            <hr />
            Obama: {this.obama} {this.getPercentage(this.obama, this.getPresidentialTotal())}<br />
            McCain: {this.mccain} {this.getPercentage(this.mccain, this.getPresidentialTotal())}<br />
            Other: {this.other} {this.getPercentage(this.other, this.getPresidentialTotal())}<br />
            </div>
        )
    }
}

export = PrecinctInfo;