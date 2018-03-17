import EsriMap = require("esri/Map");
import MapView = require("esri/views/MapView");
import Basemap = require("esri/Basemap");
import Point = require("esri/geometry/Point");
import FeatureLayer = require("esri/layers/FeatureLayer");
import FeatureSet = require("esri/tasks/support/FeatureSet");
import Query = require("esri/tasks/support/Query");
import QueryTask = require("esri/tasks/QueryTask");
import PrecinctInfo = require("app/precinctinfo");

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

var info = new PrecinctInfo({
    container: "widgetDiv"
});

view.on("pointer-move", (event) => {
    view.hitTest(event).then((response) => {
        const graphic = response.results[0].graphic;
        const attributes = graphic.attributes;
        info.precinctName = attributes.VTDNAME;
        info.population = attributes.POPULATION;
        info.white = attributes.WHITE;
        info.black = attributes.BLACK;
        info.hispanic = attributes.HISPANIC_O;
        info.asian = attributes.ASIAN;
        info.amindian = attributes.AMINDIAN;

        info.obama = attributes.PRES_08_DE;
        info.mccain = attributes.PRES_08_RE;
        info.other = attributes.PRES_08_OT;
    });
});

map.add(precinctsLayer);
precinctsLayer.queryExtent().then((response) => {
    view.goTo(response.extent);
});
view.ui.add(info, { position: "top-right",  index:0});