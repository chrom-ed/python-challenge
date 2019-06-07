// from data.js
var fullData = data;

var tbody = d3.select("tbody");

// populate table with data
function tablePopulate(tableData) {
    tbody.html("");
    tableData.forEach(function (tableData) {
        var row = tbody.append("tr");
        Object.entries(tableData).forEach(function ([key, value]) {
            // Append a cell to the row for each value
            var cell = row.append("td");
            cell.text(value);
        });
    });
}

var submit = d3.select("#filter-btn");
submit.on("click", function () {
    d3.event.preventDefault();

    var input = d3.select("#datetime").property("value");
    var filteredData = fullData.filter(data => data.datetime == input);
    if (input == "*" || input == "all" || input == "any" || input == "") {
        tablePopulate(fullData);
    } else {
        tablePopulate(filteredData);
    }
});

tablePopulate(fullData);