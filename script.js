// SINCE REAL GDP SPECIFY BASE YEAR AS, I THINK 1947


key = '6267AF30-F252-4272-9894-3AC575368ABD'

table = 'T10105' //GDP

call = 'https://apps.bea.gov/api/data/?&UserID=6267AF30-F252-4272-9894-3AC575368ABD&method=GetData&DataSetName=NIPA&TableName=T10105&Frequency=Q&Year=ALL'

let updated = false

var xArray = []; // these MUST stay inorder coresponding to one another
var yArray = [];

document.addEventListener('DOMContentLoaded', (event) =>{
    getdata()
})

function getdata() {
storage = window.localStorage;
storage.clear()
fetch(call)
    .then((response)=>response.json())
    .then(data => update(data));
}
        
function update(data){
    console.log(data)
    console.log(data['BEAAPI']['Results']['Data'])
    let x = data['BEAAPI']['Results']['Data']
    console.log(x[3])
    for(let i = 0; i<7000;i++){      //should definatly make range much better for longevity
        if(x[i]['LineDescription']==='Gross domestic product'){
            let number = x[i]['DataValue']
            for(char in number){ // replaces all commas with nothing
                number = number.replace(',','')
            }
            yArray.push(parseFloat(number))

            let time = x[i]['TimePeriod']
                time = time.replace('Q1','') //this causes quarter 4 of say 2020 to be 2020.75, not the most intuitive... 
                time = time.replace('Q2','.25')
                time = time.replace('Q3','.5')
                time = time.replace('Q4','.75')
                xArray.push(parseFloat(time))

            //console.log(x[i]['DataValue'])
            //console.log(number)
            //xArray.push(number)
        }

    }
    console.log(xArray[100])
    console.log(yArray[100])
    plot()
}

function plot(){


// Define Data
var data = [{
  x: xArray,
  y: yArray,
  mode:"lines",
  type:"scatter"
}];

// Define Layout
var layout = {
  xaxis: {showgrid: false,range: [Math.min(xArray), Math.max(xArray)], title: "Year"},
  yaxis: {automargin: true,showgrid: false,type: 'log',range: [Math.min(yArray), Math.max(xArray)], title: "Real GDP in Millions"},
  title: "Real GDP Each Year"
};

    Plotly.newPlot("myPlot", data, layout);

}