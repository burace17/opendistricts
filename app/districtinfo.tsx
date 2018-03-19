import {subclass, declared, property} from "esri/core/accessorSupport/decorators";
import Widget = require("esri/widgets/Widget");
import {renderable, tsx} from "esri/widgets/support/widget";

const CSS = {
    base: "district-info"
};

class District  {
    num: number = 0;
    population: number = 0;
    idealPopulation: number = 0;

    constructor(n: number, idealPop: number) {
        this.num = n;
        this.idealPopulation = idealPop;
    }

    @property({readOnly: true, dependsOn:["population"]})
    get deviation() {
        return this.population - this.idealPopulation;
    }
}

@subclass("esri.widgets.DistrictInfo")
class DistrictInfo extends declared(Widget) {
    @property()
    @renderable()
    population: number = 0;

    @property()
    @renderable()
    numberOfDistricts: number = 0

    @property()
    @renderable()
    districts: Array<District> = []

    private updateDistrictArray() {
        this.districts = []
        var idealPop = Math.floor(this.population / this.numberOfDistricts);
        for (let i = 0; i < this.numberOfDistricts; i++)
        {
            this.districts.push(new District(i+1, idealPop));
        }
    }

    private removeDistrict() {
        if (this.numberOfDistricts > 0) {
            this.numberOfDistricts--;
            this.updateDistrictArray();
        }
    }

    private addDistrict() {
        this.numberOfDistricts++;
        this.updateDistrictArray();
    }

    render() {
        return (
            <div bind={this} class={CSS.base}>
                State Population: {this.population.toLocaleString()}<br />
                Districts: <button bind={this} onclick={this.removeDistrict}>-</button> {this.numberOfDistricts} <button bind={this} onclick={this.addDistrict}>+</button>
                <hr />
                {this.districts.map((district) => <span key={district.num}>{district.num} {district.deviation} <br /> </span>)}
            </div>
        )   
    }
}

export = DistrictInfo