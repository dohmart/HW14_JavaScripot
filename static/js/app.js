// from data.js
var tableData = data;
var filters = {
    datetime: "",
    city: "",
    state: "",
    country: "", 
    shape: "", 
    durationMinutes: ""
};


// Initial table load
loadTable(tableData, filters);
// Listen for submit button
var submit = d3.select("#filter-btn");


// Check filters -- the check is if the filter is not blank, that is, 
// a value has been assigned to that filter, AND it does not match the 
// value in tableRow sent in, then the result is false (not a match). 
// If the loop gets through all filters and does not find a non-match
// condition, then return is a true (match found)
function checkFilters(tableRow, filters) {
    for (filter in filters) {
        if (!(filters[filter] === "") &&
            !(filters[filter] === tableRow[filter]))
            return false;
    }
    return true;
}


// Load the table data with any filtering. Only adds a row if filters
// is matched. At reload of page, the entire table will load. But once 
// form is filled and submitted, new table will be filtered to choices. 
function loadTable(tableData, filters) {
    var tbody = d3.select("tbody");
    tableData.forEach((tableRow) => {
        if (checkFilters(tableRow, filters)) {
            var row = tbody.append("tr");
            Object.entries(tableRow).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
            });
        };
      });
};

// Delete all table rows
function emptyTable() {
    var rows = d3.select("tbody").selectAll("tr");
    // var rows = d3.selectAll("tr");
    for (var i=1; i<=rows.size(); i++) {
        rows.remove(i);
    };
};


  // Submit function - will filter rows 
  submit.on("click", function() {
    // Prevent the page from refreshing
    // when using a button with type=submit, it will try to submit the form and automatically reset it
    // in this scenario, we could prevent this by setting type=button, or by using the line below.
    d3.event.preventDefault();
  
    emptyTable();
 
    // Select the input element and get the raw HTML node
    filters.datetime = d3.select("#datetime").property("value");
    filters.city = d3.select("#city").property("value");
    filters.state = d3.select("#state").property("value");
    filters.country = d3.select("#country").property("value");
    filters.shape = d3.select("#shape").property("value");

    loadTable(tableData, filters);
   

  });