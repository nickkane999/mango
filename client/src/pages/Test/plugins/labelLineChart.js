const CT_POINT_LABELS = `
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

const addPointLabels1String = (info) => {
  const { positionFunction = null, labelOffsetX = null, labelOffsetY = null, textFunction = null, labelClass = null } = info;
  const ADD_POINT_LABELS1 = `
      ctPointLabels({
        textAnchor: "middle",
        labelInterpolationFnc: function (text) {
          return text + '%'
        },
        labelClass: "ct-label",
      }),
      `;
  return ADD_POINT_LABELS1;
};

export { CT_POINT_LABELS, addPointLabels1String };
