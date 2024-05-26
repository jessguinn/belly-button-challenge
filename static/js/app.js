// The url with data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Display the default plots
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // Create an array of names
        let names = data.names;

        // Iterate through the names Array
        names.forEach((name) => {
            dropdownMenu.append("option").text(name).property("value", name);
        });

        // Assign name variable
        let name = names[0];

        // Functions
        demographic(name);
        bar(name);
        bubble(name)
    });
}

// Demographics card
function demographic(selectedValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // Array of metadata objects
        let metadata = data.metadata;
        
        // Filter data
        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
      
        // Assign object variable
        let obj = filteredData[0]
        
        // Clear the child elements in div with id sample-metadata
        d3.select("#sample-metadata").html("");
  
        // Object entries
        let entries = Object.entries(obj);
        entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

        // Log the entries Array
        console.log(entries);
    });
  }
  

// Make the bar chart
function bar(selectedValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // An array of sample objects
        let samples = data.samples;

        // Filter data
        let filteredData = samples.filter((sample) => sample.id === selectedValue);

        // Assign object variable
        let obj = filteredData[0];
        
        // Trace bar chart
        let trace = [{
            // Slice the top 10 otus
            x: obj.sample_values.slice(0,10).reverse(),
            y: obj.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: obj.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }];

        // Apply the x-axis lengend to the layout
        let layout = {
          xaxis: {title: "Number of Bacteria"}
        };
        
        // Use Plotly to plot the data in a bar chart
        Plotly.newPlot("bar", trace);
    });
}
  
// Make the bubble chart
function bubble(selectedValue) {
    // Fetch the JSON data and console log it
    d3.json(url).then((data) => {

        // Array of sample objects
        let samples = data.samples;
    
        // Filter data 
        let filteredData = samples.filter((sample) => sample.id === selectedValue);
    
        // Assign object variable
        let obj = filteredData[0];
        
        // Trace bubble chart
        let trace = [{
          x: obj.otu_ids,
          y: obj.sample_values,
          text: obj.otu_labels,
          mode: "markers",
          marker: {
              size: obj.sample_values,
              color: obj.otu_ids,
              colorscale: "Earth"
          }
      }];
        // Apply the x-axis lengend to the layout
        let layout = {
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Number of Bacteria"}
        };
    
        // Use Plotly to plot the data in a bubble chart
        Plotly.newPlot("bubble", trace, layout);
    });
}


// Toggle to new plots when option changed
function optionChanged(selectedValue) {
    demographic(selectedValue);
    bar(selectedValue);
    bubble(selectedValue)
}

init();