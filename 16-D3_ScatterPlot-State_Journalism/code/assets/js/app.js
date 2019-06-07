var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("../data/data.csv")
    .then(function (scatterData) {

        // Step 1: Parse Data/Cast as numbers
        // ==============================
        scatterData.forEach(function (data) {
            data.income = +data.income;
            data.obesity = +data.obesity;
        });

        // Step 2: Create scale functions
        // ==============================
        var xLinearScale = d3.scaleLinear()
            .domain([20, d3.max(scatterData, d => d.obesity)])
            .range([0, width]);
        // console.log(d3.min(scatterData, d => d.abbr));
        var yLinearScale = d3.scaleLinear()
            .domain([35000, d3.max(scatterData, d => d.income)])
            .range([height, 0]);

        // Step 3: Create axis functions
        // ==============================
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // Step 4: Append Axes to the chart
        // ==============================
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        chartGroup.append("g")
            .call(leftAxis);

        // Step 5: Create Circles
        // ==============================

        var circlesGroup = chartGroup.selectAll("circle")
            .data(scatterData)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.obesity))
            .attr("cy", d => yLinearScale(d.income))
            .attr("r", "15")
            .attr("stroke", "blue")
            .attr("fill", "white")
            .attr("opacity", ".5");

        var theCircles = svg.selectAll("g circle").data(scatterData).enter();

        var textGroup = theCircles
            .data(scatterData)
            .enter()
            .append("text")
            .text(function (d) { console.log(d.abbr); return d.abbr; })
            .attr("x", d => xLinearScale(d.obesity) + margin.left)
            .attr("y", d => yLinearScale(d.income) + margin.top)
            .attr("dx", -9)
            .attr("dy", 5)
            .attr("textLength", 18)
            .attr("lengthAdjust", "spacingAndGlyphs")
            .attr("class", "small");


        // Step 6: Initialize tool tip
        // ==============================
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([48, 80])
            .html(function (d) {
                return (`${d.state}<br>Obesity: ${d.obesity}<br>Income: ${d.income}`);
            });

        // Step 7: Create tooltip in the chart
        // ==============================
        chartGroup.call(toolTip);

        // Step 8: Create event listeners to display and hide the tooltip
        // ==============================
        textGroup.on("mouseover", function (data) {
            toolTip.show(data, this);
        })
            // onmouseout event
            .on("mouseout", function (data, index) {
                toolTip.hide(data);
            });

        // Create axes labels
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 40)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Income");

        chartGroup.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
            .attr("class", "axisText")
            .text("Obesity");
    });
