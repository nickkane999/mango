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

export { ADD_POINT_LABELS1 };
