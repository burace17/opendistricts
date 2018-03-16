import EsriMap = require("esri/Map");
import MapView = require("esri/views/MapView");
import Basemap = require("esri/Basemap");
import Point = require("esri/geometry/Point");
import FeatureLayer = require("esri/layers/FeatureLayer");
import FeatureSet = require("esri/tasks/support/FeatureSet");
import Query = require("esri/tasks/support/Query");
import QueryTask = require("esri/tasks/QueryTask");
import PrecinctInfo = require("app/precinctinfo");

const map = new EsriMap( {
    basemap: "streets" as any as Basemap
});

const view = new MapView({
    map: map,
    container: "viewDiv",
    center: new Point({
        x: -118.244,
        y: 34.052
    }),
    zoom: 12
});

const testLayer = new FeatureLayer({
    url: "https://services8.arcgis.com/yBvhbG6FeRtNxtFh/arcgis/rest/services/CA_31_2016/FeatureServer",
    outFields: ["*"]
});

var pi = new PrecinctInfo({
    container: "widgetDiv"
});

view.on("pointer-move", function(event) {
    view.hitTest(event).then(function (response) {
        const graphic = response.results[0].graphic;
        const attributes = graphic.attributes;
        pi.precinctName = attributes.ca31_results_csv_name;
    });
});

map.add(testLayer);
view.ui.add(pi);