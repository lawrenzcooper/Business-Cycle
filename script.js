
key = '6267AF30-F252-4272-9894-3AC575368ABD'

table = 'T10105' //GDP

call = 'https://apps.bea.gov/api/data/?&UserID=6267AF30-F252-4272-9894-3AC575368ABD&method=GetData&DataSetName=NIPA&TableName=T10105&Frequency=A,Q&Year=ALL'



document.addEventListener('DOMContentLoaded', (event) =>{
    plot()
})

storage = window.localStorage;
storage.clear()
fetch(call)
    .then((response)=>response.json())
    .then(data => update(data));
        
function update(data){

}

function plot(){
    var xArray = [50,60,70,80,90,100,110,120,130,140,150];
var yArray = [7,8,8,9,9,9,10,11,14,14,15];

// Define Data
var data = [{
  x: xArray,
  y: yArray,
  mode:"markers",
  type:"scatter"
}];

// Define Layout
var layout = {
  xaxis: {range: [40, 160], title: "Square Meters"},
  yaxis: {range: [5, 16], title: "Price in Millions"},
  title: "House Prices vs. Size"
};

    Plotly.newPlot("myPlot", data, layout);

}