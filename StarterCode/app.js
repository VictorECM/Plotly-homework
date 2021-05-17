d3.json("samples.json").then( data => {
    console.log(data);

    // create the dropdown menu list
    let select = document.getElementById("selDataset")
    let dropDowns = data.names;
    console.log(dropDowns);

    for (let i = 0; i < dropDowns.length; i++) {
        let opt =  dropDowns[i];

        let el = document.createElement("option");
        el.text = opt;
        el.value = opt;

        select.add(el);
    };
    
});


function dataByID() {
    d3.json("samples.json").then( data => {

    
    let id = d3.select("#selDataset").property("value");
    
    let filteredId = data.samples.filter((d) => d.id === id);
    console.log(filteredId);

    
    let sampleVs = filteredId.map(d => d.sample_values).sort();

    let allSamples = sampleVs[0];

    let topSamples = allSamples.slice(0, 10).reverse();
    console.log(topSamples);

    let ids = filteredId.map(d => d.otu_ids).sort();

    let allIds = ids[0];

    let topIds = allIds.slice(0, 10).reverse().toString().split(",").map((e) => `OTU ${e}`);
    console.log(topIds);

    let labels = filteredId.map(d => d.otu_labels).sort();

    let allLabels = labels[0];

    let topLabels = allLabels.slice(0, 10).reverse();
    console.log(topLabels);

    let metadata = data.metadata.filter((d) => d.id == id);
    console.log(metadata)


    displayData = metadata[0]
    console.log(displayData)

    indvData = Object.entries(displayData).map(([key, value]) => `<p>${key}: ${value}</p>`).join("");
    console.log(indvData)

    document.getElementById("sample-metadata").innerHTML = indvData 

    let barData = [{
        type: "bar",
        x: topSamples,
        y: topIds,
        orientation: "h",
        text: topLabels,
        marker: {
            color: "rgb(31, 119, 180)",
            opacity: 0.6
        }
    }];

    let barLayout = {
        autosize: false, 
        width: 1000,
        height: 500,
        margin: {
            l: 75,
            r: 50,
            b: 50,
            pad: 2
        },
        title: "Top 10 OTUs (Operational Taxonomic Units) for Selected Individual",
        xaxis: {
            title: "Sample Values"
        }
    };


    let bubbleData = [{
        x: allIds,
        y: allSamples,
        mode: "markers",
        text: allLabels,
        marker: {
            size: allSamples,
            color: allIds,
            colorscale: "Portland"
        }
    }];

    let bubbleLayout = {
        title: "All OTU Samples for Selected Individual",
        height: 500,
        width: 1200,
        xaxis: {
            title: "OTU ID"
        }
    };


    Plotly.newPlot("bar", barData, barLayout);
    Plotly.newPlot("bubble", bubbleData, bubbleLayout)

    });
};

function init() {
    d3.json("samples.json").then( data => {
    
        let options = data.names;
        
        let defaultData = options[0];
        console.log(defaultData)

        dataByID(defaultData)
    });
}

init()

d3.selectAll("#selDataset").on("change", dataByID);