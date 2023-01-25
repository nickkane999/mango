const addPointLabels1String = (info) => {
  const { positionFunction = null, labelOffsetX = null, labelOffsetY = null, textFunction = null, labelClass = null } = info;
  const ADD_POINT_LABELS1 = `{
    plugins: [
      ctPointLabels({
        textAnchor: "middle",
        labelInterpolationFnc: function (text) {
          return text + '%'
        },
        labelClass: "ct-label",
      }),
    ],
  }`;
  return ADD_POINT_LABELS1;
};

const addBarLabels1String = (info) => {
  const { positionFunction = null, labelOffsetX = null, labelOffsetY = null, textFunction = null, labelClass = null } = info;
  const ADD_BAR_LABELS1 = `{
    plugins: [
      ctBarLabels({
        position: {
          x: function (data) {
            ${positionFunction ? positionFunction + ";" : "return data.x1;"}
          }
        },
        labelOffset: {
          x: ${labelOffsetX ? labelOffsetX : 0},
          y: ${labelOffsetY ? labelOffsetY : -10}
        },
        labelInterpolationFnc: function (text) {
          ${textFunction ? textFunction : "return text + '%';"}
        },
        labelClass: ${labelClass ? `"${labelClass}"` : `"ct-label;"`}
      }),
    ],
  }`;
  return ADD_BAR_LABELS1;
};

export { addPointLabels1String, addBarLabels1String };

/*

const addBarLabels1String = (info) => {
  const ADD_BAR_LABELS1 = `{
    plugins: [
      ctBarLabels({
        position: {
          x: function (data) {
            return data.x1
          }
        },
        labelOffset: {
          y: -10
        },
        labelInterpolationFnc: function (text) {
          return text + '%'
        },
        labelClass: "ct-label",
      }),
    ],
  }`;
  return ADD_BAR_LABELS1;
};

const addBarLabels1String = (info) => {
  const { positionFunction = null, labelOffsetX = null, labelOffsetY = null, textFunction = null, labelClass = null } = info;
  const ADD_BAR_LABELS1 = `{
    plugins: [
      ctBarLabels({
        position: {
          x: function (data) {
            ${positionFunction ? positionFunction : "return data.x1"}
        },
        labelOffset: {
          x: ${labelOffsetX ? labelOffsetX : 0},
          y: ${labelOffsetY ? labelOffsetY : -10}
        },
        labelInterpolationFnc: function (text) {
          ${textFunction ? textFunction : "return text + '%'"}
        },
        labelClass: ${labelClass ? labelClass : "ct-label"}
      }),
    ],
  }`;
  return ADD_BAR_LABELS1;
};

export { addPointLabels1String, addBarLabels1String };
*/
