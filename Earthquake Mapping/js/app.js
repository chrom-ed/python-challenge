// geojson query for data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Perform a GET request to the query URL
d3.json(queryUrl, function (data) {
    // Once we get a response, send the data object to the createMarkers function
    console.log(data);
    createMarkers(data);
});

// starting settings for leaflet
var newYorkCoords = [40.73, -74.0059];
var parisCoords = [48.864716, 2.349014];
var brazilCoords = [-22.970722, -43.182365];
var caliCoords = [38.8381653, -122.8368301];
var mapZoomLevel = 5;
// Create the createMap function
function createMap(layer, coords = caliCoords, zoom = mapZoomLevel) {
    // base tile layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: "pk.eyJ1IjoiY2hyb21lZCIsImEiOiJjam10c29oaXYwaG5hM3FvMnVyaDd0eWt0In0.2LQ_9tW9cznJFz5imzGY0Q"
    });

    var piratemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.pirates",
        accessToken: "pk.eyJ1IjoiY2hyb21lZCIsImEiOiJjam10c29oaXYwaG5hM3FvMnVyaDd0eWt0In0.2LQ_9tW9cznJFz5imzGY0Q"
    });

    // Basemap option 3
    var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: "pk.eyJ1IjoiY2hyb21lZCIsImEiOiJjam10c29oaXYwaG5hM3FvMnVyaDd0eWt0In0.2LQ_9tW9cznJFz5imzGY0Q"
    });

    // Create a baseMaps object to hold the basemaps
    var baseMaps = {
        "Street Map": streetmap,
        "Satellite Map": satellitemap,
        "Pirate Map": piratemap
    };

    // Create the map object with options
    var myMap = L.map("map-id", {
        center: coords,
        zoom: zoom,
        layers: [streetmap, satellitemap, piratemap]
    });

    // Create an overlayMaps object to hold the feature layer
    var overlayMaps = {
        Earthquakes: layer
    };

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);

    // default the feature layer active
    layer.addTo(myMap);

    // create a legend
    var legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            points = [1, 2, 3, 4, 5, 6, 7, 8, 9],
            labels = [];
        console.log(points);
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < points.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(points[i] + 1) + '"></i> ' +
                points[i] + (points[i + 1] ? '&ndash;' + points[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(myMap);

}

// colors for legend
function getColor(d) {
    return d > 9 ? getColorForPercentage(0.9) :
        d > 8 ? getColorForPercentage(0.8) :
            d > 7 ? getColorForPercentage(0.7) :
                d > 6 ? getColorForPercentage(0.6) :
                    d > 5 ? getColorForPercentage(0.5) :
                        d > 4 ? getColorForPercentage(0.4) :
                            d > 3 ? getColorForPercentage(0.3) :
                                d > 2 ? getColorForPercentage(0.2) :
                                    d > 1 ? getColorForPercentage(0.1) :
                                        '#000000';
}

// Create the createMarkers function
function createMarkers(json) {

    // set the json file to a variable
    quakes = json.features;

    // Initialize an array to hold markers
    var quakeMarkers = [];

    quakes.forEach(quake => {
        mag = quake.properties.mag;
        magColor = getColorForPercentage(mag / 10);
        quakeMarkers.push(
            L.circle(
                [quake.geometry.coordinates[1], quake.geometry.coordinates[0]], {
                    color: magColor,
                    fillColor: magColor,
                    fillOpacity: 0.5,
                    radius: 50000 * mag
                }
            ).bindPopup(`<p>Magnitude: ${mag}</p>
            <p>Depth (km): ${quake.geometry.coordinates[2]}</p>
            <p>Event: ${quake.properties.type}</p>
            <p>Location: ${quake.properties.place}</p>
            <p>Tsunami Warning: ${quake.properties.tsunami}</p>`)
        );
        // console.log(quake.geometry.coordinates[0], quake.geometry.coordinates[1]);
    }
    );

    // pass the markers layer to the createMap function
    var quakeLayer = L.layerGroup(quakeMarkers);
    createMap(quakeLayer);
}

// create colormap array
var percentColors = [
    { pct: 0.0, color: { r: 0x41, g: 0xd4, b: 0x29 } },
    { pct: 0.5, color: { r: 0xff, g: 0xf3, b: 0 } },
    { pct: 1.0, color: { r: 0xff, g: 0, b: 0 } }];

// convert a point on the colormap to a hex color value
var getColorForPercentage = function (pct) {
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    // return [color.r, color.g, color.b];
    // or output as hex if preferred
    hex = [color.r.toString(16), color.g.toString(16), color.b.toString(16)];
    $.each(hex, function (nr, val) {
        if (val.length === 1) {
            hex[nr] = "0" + val;
        }
    });
    return `#${hex.join("").toUpperCase()}`;
};