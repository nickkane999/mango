const ADD_POINT_LABELS1 = `{
    plugins: [
      ctPointLabels({
        textAnchor: "middle",
        labelInterpolationFnc: function (value) {
          return "$" + value.toFixed(2);
        },
      }),
    ],
}`;

const ADD_BAR_LABELS1_OLD = `{
  plugins: [
    ctBarLabels({
      textAnchor: "middle",
      labelInterpolationFnc: function (value) {
        return "$" + value.toFixed(2);
      },
    }),
  ],
}`;

const ADD_BAR_LABELS1 = `{
  plugins: [
    ctBarLabels({
      labelInterpolationFnc: function (value) {
          return value;
      },
      labelClass: 'ct-label'
    })
  ],
}`;

export { ADD_POINT_LABELS1, ADD_BAR_LABELS1 };
