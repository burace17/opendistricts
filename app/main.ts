import EsriMap = require("esri/Map");
import MapView = require("esri/views/MapView");
import Basemap = require("esri/Basemap");
import Point = require("esri/geometry/Point");
import FeatureLayer = require("esri/layers/FeatureLayer");
import FeatureSet = require("esri/tasks/support/FeatureSet");
import Query = require("esri/tasks/support/Query");
import QueryTask = require("esri/tasks/QueryTask");
import PrecinctInfo = require("app/precinctinfo");
import DistrictInfo = require("app/districtinfo");
import SummaryStatistics = require("esri/renderers/smartMapping/statistics/summaryStatistics");
import SimpleFillSymbol = require("esri/symbols/SimpleFillSymbol");

const map = new EsriMap();

const view = new MapView({
    map: map,
    container: "viewDiv",
    center: new Point({
        x: -118.244,
        y: 34.052
    }),
    zoom: 12
});

const precinctsLayer = new FeatureLayer({
    url: "https://services8.arcgis.com/yBvhbG6FeRtNxtFh/arcgis/rest/services/KansasVTDs2010/FeatureServer",
    outFields: ["*"]
});

var precinctInfo = new PrecinctInfo({
    container: "precinctInfo"
});

var districtInfo = new DistrictInfo({
    container: "districtInfo"
});

view.on("pointer-move", (event) => {
    view.hitTest(event).then((response) => {
        const graphic = response.results[0].graphic;
        const attributes = graphic.attributes;
        precinctInfo.precinctName = attributes.VTDNAME;
        precinctInfo.population = attributes.POPULATION;
        precinctInfo.white = attributes.WHITE;
        precinctInfo.black = attributes.BLACK;
        precinctInfo.hispanic = attributes.HISPANIC_O;
        precinctInfo.asian = attributes.ASIAN;
        precinctInfo.amindian = attributes.AMINDIAN;

        precinctInfo.obama = attributes.PRES_08_DE;
        precinctInfo.mccain = attributes.PRES_08_RE;
        precinctInfo.other = attributes.PRES_08_OT;

        if (precinctInfo.district)
            precinctInfo.district = attributes.DISTRICT;
        else
            precinctInfo.district = 0;
    });
});

view.on("click", (event) => {
    view.hitTest(event).then((response) => {
        const graphic = response.results[0].graphic;
        view.graphics.remove(graphic);
        graphic.attributes.DISTRICT = 3;
        districtInfo.unassigned -= graphic.attributes.POPULATION;
        graphic.symbol = new SimpleFillSymbol({
            color: "red"
        });
        view.graphics.add(graphic);
    });
});

// Add the precincts layer to the map and then zoom to its extent
map.add(precinctsLayer);
precinctsLayer.queryExtent().then((response) => {
    view.goTo(response.extent);
});

// Calculate state population
SummaryStatistics({
    layer: precinctsLayer,
    field: "POPULATION"
}).then((response) => {
    districtInfo.population = response.sum;
    districtInfo.unassigned = response.sum;
});

// Add widgets to the UI
view.ui.add(precinctInfo, { position: "top-right",  index:0});
view.ui.add(districtInfo, { position: "top-left", index:0 });