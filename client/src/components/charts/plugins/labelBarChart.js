const CT_BAR_LABELS_OLD = `
function ctBarLabels(options) {
  return function ctBarLabels(chart) {
    var defaultOptions = {
      labelClass: 'ct-label',
      labelOffset: {
        x: 0,
        y: -10
      },
      textAnchor: 'middle'
    };

    options = Chartist.extend({}, defaultOptions, options);

    console.log("give me the chart")
    if(chart instanceof Chartist.Bar) {
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

const CT_BAR_LABELS = `
var ctBarLabels = function(options) {
    return function (chart) {
      var defaultOptions = {
        labelClass: 'ct-label',
        labelOffset: {
          x: 0,
          y: -10
        },
        textAnchor: 'middle'
      };
  
      options = Chartist.extend({}, defaultOptions, options);
  
      console.log("give me the chart")
      if(chart instanceof Chartist.Bar) {
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

export { CT_BAR_LABELS };
