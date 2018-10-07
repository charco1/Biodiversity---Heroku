// @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  // Use `.html("") to clear any existing metadata
<meta http-equiv="cache-control" content="no-cache" />
  var url = "/names";
var otuIdList ;

function populateSampleName(){
    Plotly.d3.json(url, function(error, response) {
        console.log(response);
        
        var selDatasetSelect =   document.getElementById("selDataset")

        for ( name in response){
            var option = document.createElement("option");
            option.value = response[name];
            option.text = response[name];
            selDatasetSelect.appendChild(option);
        }       
    });
}

 // Use `.html("") to clear any existing metadata
<meta http-equiv="cache-control" content="no-cache" />


function optionChanged(name){
    updateMetaData(name);
    generatePieChart(name);
    generateBubbleChart(name);
}

// Use `Object.entries` to add each key and value pair to the panel
// Hint: Inside the loop, you will need to use d3 to append new
// tags for each key-value in the metadata.
function updateMetaData(name){
    var url = '/metadata/'+name
    Plotly.d3.json(url, function(error, response) {
        console.log(response);
       
        var metadataList =   document.getElementById("metadataList")
        while (metadataList.firstChild) {
            metadataList.removeChild(metadataList.firstChild);
        }

        
        var y = document.createElement("LI");
        var age = document.createTextNode
        ("Age: " + response.AGE );
        y.appendChild(age);
        document.getElementById("metadataList").appendChild(y);

        y = document.createElement("LI");
        var bbType = document.createTextNode
        ("BBTYPE: " + response.BBTYPE );
        y.appendChild(bbType);
        document.getElementById("metadataList").appendChild(y);

        y = document.createElement("LI");
        var ethicity = document.createTextNode
        ("ETHNICITY: " + response.ETHNICITY );
        y.appendChild(ethicity);
        document.getElementById("metadataList").appendChild(y);
        
        y = document.createElement("LI");        
        var gender = document.createTextNode
        ("GENDER: " + response.GENDER );
        y.appendChild(gender);
        document.getElementById("metadataList").appendChild(y);

        y = document.createElement("LI");
        var location = document.createTextNode
        ("LOCATION: " + response.LOCATION );
        y.appendChild(location);
        document.getElementById("metadataList").appendChild(y);

        y = document.createElement("LI");
        var sampleId = document.createTextNode
        ("SAMPLEID: " + response.SAMPLEID );
        y.appendChild(sampleId);
        document.getElementById("metadataList").appendChild(y);        

      });
}

// @TODO: Use `d3.json` to fetch the sample data for the plots
// @TODO: Build a Bubble Chart using the sample data
function generateBubbleChart(name){
    var url = "/samples/"+name
    
    Plotly.d3.json(url, function(error, response) 
      {
        var sampleData = response[0];
        var trace1 = {
            x: sampleData.otu_ids,
            y: sampleData.sample_values,
            mode: 'markers',
            marker:
            {
              size: sampleData.sample_values,
              color:sampleData.otu_ids              
            }
      };
          
          var data = [trace1];
          
          var layout =
          {
           
            title: 'OTU vs Sample_values',
            showlegend: false,
            yaxis: {
                autorange: true}
            
          };
          
          Plotly.newPlot('bubblePlot', data, layout);
    });
}

// @TODO: Build a Pie Chart
// HINT: You will need to use slice() to grab the top 10 sample_values,
// otu_ids, and labels (10 each).

function generatePieChart(name) {    
    
    var url = "/samples/"+name
    Plotly.d3.json(url, function(error, response) {

        console.log(response);
        var sampleData = response[0];
        var data = [{
            values: sampleData.sample_values.slice(0,9),
            labels: sampleData.otu_ids.slice(0,9),
            type: 'pie',
            
          }];
          
          var layout = {
            title: "OTU per Sample",
            yaxis: {
                autorange: true}

          };

        Plotly.newPlot("piePlot", data, layout);
    });
    
}

populateSampleName();
Plotly.d3.json('/otu', function(error, response) 
        { 
    
          otuIdList = response;
    
        });

