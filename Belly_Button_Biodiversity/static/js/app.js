function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var url = `/metadata/${sample}`;
  // Use `d3.json` to fetch the metadata for a sample
  // Use d3 to select the panel with id of `#sample-metadata`
  d3.json(url).then(function (button) {
    var sample_metadata = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    sample_metadata.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(button).forEach(function ([key, value]) {
      var row = sample_metadata.append("p");
      row.text(`${key}: ${value}`);
      // BONUS: Build the Gauge Chart
      // buildGauge(data.WFREQ);
    });
  });
};
function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var url = `/samples/${sample}`;
  d3.json(url).then(function (data) {

    // @TODO: Build a Bubble Chart using the sample data
    var bubX = data.otu_ids;
    var bubY = data.sample_values;
    var m_size = data.sample_values;
    var textValue = data.otu_labels;
    var colorID = data.otu_ids;

    var trace1 = {
      x: bubX,
      y: bubY,
      hovertext: textValue,
      hoverinfo: "text",
      mode: 'markers',
      marker: {
        size: m_size,
        sizeref: .67,
        sizemin: 1,
        color: colorID,
        showscale: true,
        colorscale: "Rainbow"
      }
    };
    var data1 = [trace1];

    var layout1 = {
      title: 'Bubble Chart',
      yaxis: {
        "title": "Sample Value",
        // range: [0, 100]
      },
      xaxis: {
        "title": "Sample ID",
        tickangle: 35,
        // range: [82, 94]
      },
      hovermode: 'closest',
      // autosize: false,
      showlegend: false,
      width: 900,
      height: 600,
      margin: {
        l: 50,
        r: 50,
        b: 100,
        t: 100,
        pad: 4
      },
      // paper_bgcolor: '#E1C56C',
      // plot_bgcolor: '#FFFFFF'
    };
    Plotly.newPlot('bubble', data1, layout1, { responsive: true });
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var pieValue = data.sample_values.slice(0, 10);
    var pieLabel = data.otu_ids.slice(0, 10);
    var pieText = data.otu_labels.slice(0, 10);
    var trace2 = {
      values: pieValue,
      labels: pieLabel,
      type: 'pie',
      hoverinfo: "text",
      hovertext: pieText,
      marker: {
        colorscale: "Rainbow"
      }
    };
    var layout2 = {
      height: 400,
      width: 500,
    };
    var data2 = [trace2];
    Plotly.newPlot('pie', data2, layout2);
  });
}
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
