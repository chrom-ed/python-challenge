var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    bottom: 60,
    left: 100,
    right: 40
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// create svg
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// get data
d3.csv("../data/data2.csv")
    .then(function (plotData) {
        // cast data as numbers
        plotData.forEach(numData => {
            numData.score1 = +numData.score1;
            numData.score2 = +numData.score2;
        });

        // create scale functions
        var xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width]);
        var yScale = d3.scaleLinear()
            .domain([0, 1000])
            .range([height, 0]);

        // create axis functions
        var bottomAxis = d3.axisBottom(xScale);
        var leftAxis = d3.axisLeft(yScale);

        // append axes to chart
        chartGroup.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(bottomAxis);
        chartGroup.append("g")
            .call(leftAxis);

        // add axes labels
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", 0 - (height / 2))
            .attr("y", 0 - margin.left + 40)
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("score2");

        chartGroup.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
            .attr("class", "axisText")
            .text("score1");

        // create markers
        var circlesGroup = chartGroup.selectAll("circle")
            .data(plotData)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                console.log(d);
                return xScale(d.score1);
            })
            .attr("cy", d => yScale(d.score2))
            .attr("r", 15)
            .attr("stroke", "blue")
            .attr("fill", "white")
            .attr("opacity", "0.5");

        var theCircles = svg.selectAll("g circle").data(plotData).enter();

        var textGroup = theCircles
            .data(plotData)
            .enter()
            .append("text")
            .attr("x", d => xScale(d.score1) + margin.left)
            .attr("y", d => yScale(d.score2) + margin.top)
            .text(function (d) {
                // console.log(d);
                return d.name;
            });

        // Step 6: Initialize tool tip
        // ==============================
        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([48, 80])
            .html(function (d) {
                return (`${d.name}<br>Obesity: ${d.score1}<br>Income: ${d.score2}`);
            });

        // Step 7: Create tooltip in the chart
        // ==============================
        chartGroup.call(toolTip);

        // Step 8: Create event listeners to display and hide the tooltip
        // ==============================
        circlesGroup.on("mouseover", function (data) {
            toolTip.show(data, this);
        })
            // onmouseout event
            .on("mouseout", function (data, index) {
                toolTip.hide(data);
            });
        textGroup.on("mouseover", function (data) {
            toolTip.show(data, this);
        })
            // onmouseout event
            .on("mouseout", function (data, index) {
                toolTip.hide(data);
            });
    });