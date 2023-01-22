//console.log("booty");
/*
const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  series: [
    { meta: "Sales", data: [5, 4, 3, 7, 5, 10, 3] },
    { meta: "Expenses", data: [2, 5, 3, 2, 4, 6, 3] },
  ],
};
*/
const data = {
  labels: [1, 2, 3, 4, 5, 6, 7],
  series: [
    [1, 5, 3, 4, 6, 2, 3],
    [2, 4, 2, 5, 4, 3, 6],
  ],
};
// Options for the chart
const options = {};

const scriptData = document.createElement("script");
scriptData.setAttribute("data-json", "data");
scriptData.type = "application/json";
scriptData.innerHTML = JSON.stringify(data);

const scriptOptions = document.createElement("script");
scriptOptions.setAttribute("options-json", "data");
scriptOptions.type = "application/json";
scriptOptions.innerHTML = JSON.stringify(options);

const div = document.querySelector("#chartist-info");
div.appendChild(scriptData);
div.appendChild(scriptOptions);

const scriptPlugin = document.createElement("script");

scriptPlugin.innerHTML = `
function ctPointLabels(options) {
  return function ctPointLabels(chart) {
    var defaultOptions = {
      labelClass: 'ct-label',
      labelOffset: {
        x: 0,
        y: -10
      },
      textAnchor: 'middle'
    };

    options = Chartist.extend({}, defaultOptions, options);

    if(chart instanceof Chartist.Line) {
      //console.log("I made it");
      chart.on('draw', function(data, i) {
        console.log(options)
        console.log(data);
        if(data.type === 'point') {
          data.group.elem('text', {
            x: data.x + options.labelOffset.x,
            y: data.y + options.labelOffset.y,
            style: 'text-anchor: ' + options.textAnchor
          }, options.labelClass).text(data.value.y);
        }
      });
    }
  }
}`;

div.appendChild(scriptPlugin);

//var chart = new Chartist.Line("#chart", data, options);

/*
const dataScript = document.querySelector('script[data-json="data"]');
const data = JSON.parse(dataScript.innerHTML);
const optionsScript = document.querySelector('script[options-json="data"]');
const options = JSON.parse(optionsScript.innerHTML);
//var chart = new Chartist.Line("#chart", data, options);


const plugin = [
    ctPointLabels({
      textAnchor: 'middle',
      //labelInterpolationFnc: {return '$' + value.toFixed(2)}
      labelInterpolationFnc: {console.log(value)}
    })
  ];

var chart = new Chartist.Line("#chart", data, options, plugin);
console.log(data);
console.log(options);
console.log(plugin);
*/

/*

{
var chart = new Chartist.Line('#chart', {
  labels: [1, 2, 3, 4, 5, 6, 7],
  series: [
    [1, 5, 3, 4, 6, 2, 3],
    [2, 4, 2, 5, 4, 3, 6]
  ]
}, {
  plugins: [
    ctPointLabels({
      textAnchor: 'middle',
      labelInterpolationFnc: function(value) {return '$' + value.toFixed(2)}
    })
  ]
});

*/
