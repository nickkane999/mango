const CT_BAR_LABELS = `
var ctBarLabels = function (options) {
    return function (chart) {
      var defaultOptions = {
        labelClass: "ct-bar-label",  
        // { labelInterpolationFnc: function (text) { return text + '%' } }
        labelInterpolationFnc: Chartist.noop,  
        labelOffset: {
          x: 0,
          y: 0,
        },
        position: {
          x: null,
          y: null,
        },
      };
      console.log("testing");
      options = Chartist.extend({}, defaultOptions, options);
  
      var positionX =
        options.position.x ||
        function (data) {
          return (data.x1 + data.x2) / 2 + options.labelOffset.x;
        };
  
      var positionY =
        options.position.y ||
        function (data) {
          return data.y2 - options.labelOffset.y;
        };
  
      if (chart instanceof Chartist.Bar) {
        chart.on("draw", function (data) {
          if (data.type === "bar") {
            data.group
              .elem(
                "text",
                {
                  x: positionX(data),
                  y: positionY(data),
                  style: "text-anchor: middle",
                },
                options.labelClass
              )
              .text(options.labelInterpolationFnc(data.value.x || data.value.y));
          }
        });
      }
    };
  };`;

export { CT_BAR_LABELS };

/*
var ctBarLabels = function (options) {
  return function (chart) {
    var defaultOptions = {
      // The class name so you can style the text
      labelClass: "ct-bar-label",

      // Use this to get the text of the data and you can return your own
      // formatted text. For example, for a percentage:
      // {
      //  labelInterpolationFnc: function (text) { return text + '%' }
      // }
      labelInterpolationFnc: Chartist.noop,

      // Depending on your font size you may need to tweak these
      labelOffset: {
        x: 0,
        y: 0,
      },

      // If labelOffset doesn't work for you and you need more custom positioning
      // you can use this. You can set position.x and position.y to functions and
      // instead of centering + labelOffset. This will _completely_ override the
      // built in positioning so labelOffset will no longer do anything. It will
      // pass the bar `data` back as the first param.
      //
      // Example:
      // Chartist.plugins.ctBarLabels({
      //   position: {
      //     x: function (data) {
      //       return data.x1 + 50; // align left with 50px of padding
      //     }
      //   }
      // });
      position: {
        x: null,
        y: null,
      },
    };
    console.log("testing");
    options = Chartist.extend({}, defaultOptions, options);

    var positionX =
      options.position.x ||
      function (data) {
        return (data.x1 + data.x2) / 2 + options.labelOffset.x;
      };

    var positionY =
      options.position.y ||
      function (data) {
        return (data.y1 + data.y2) / 2 + options.labelOffset.y;
      };

    if (chart instanceof Chartist.Bar) {
      chart.on("draw", function (data) {
        if (data.type === "bar") {
          data.group
            .elem(
              "text",
              {
                x: positionX(data),
                y: positionY(data),
                style: "text-anchor: middle",
              },
              options.labelClass
            )
            .text(options.labelInterpolationFnc(data.value.x || data.value.y));
        }
      });
    }
  };
};
*/
