new Function(`return new Chartist.Bar("#chart", {"labels":["Mon","Tue","Wednesday","Thu","Fri"],"series":[[50,20,40,20,10]]}, {"axisX":{"offset":30,"position":"end","labelOffset":{"x":0,"y":0},"showLabel":true,"showGrid":true,"scaleMinSpace":30,"onlyInteger":false},"axisY":{"offset":40,"position":"start","labelOffset":{"x":0,"y":0},"showLabel":true,"showGrid":false,"scaleMinSpace":20,"onlyInteger":false},"height":400,"referenceValue":0,"chartPadding":{"top":30,"right":5,"bottom":30,"left":5},"seriesBarDistance":15,"stackBars":false,"stackMode":"accumulate","horizontalBars":false,"distributeSeries":false,"reverseData":false,"showGridBackground":false,"classNames":{"chart":"ct-chart-bar","horizontalBars":"ct-horizontal-bars","label":"ct-label","labelGroup":"ct-labels","series":"ct-series","bar":"ct-bar","grid":"ct-grid","gridGroup":"ct-grids","gridBackground":"ct-grid-background","vertical":"ct-vertical","horizontal":"ct-horizontal","start":"ct-start","end":"ct-end"},  plugins: [
        Chartist.plugins.ctAxisTitle({
          axisX: {
            axisTitle: "My Title",
            axisClass: "ct-axis-title",
            offset: {
              x: 0,
              y: 50
            },
            textAnchor: "middle",
          },
          axisY: {
            axisTitle: "Dank charts",
            axisClass: "ct-axis-title",
            offset: {
              x: 0,
              y: -1
            },
            textAnchor: "true",
            flipTitle: true,
          }
        })
      ,
    Chartist.plugins.legend()
    ,
        ctBarLabels({
          position: {
            x: function (data) {
              return data.x1;;
            }
          },
          labelOffset: {
            x: 0,
            y: -10
          },
          labelInterpolationFnc: function (text) {
            return text + '$';
          },
          labelClass: "ct-label"
        })
        ,]});`)()