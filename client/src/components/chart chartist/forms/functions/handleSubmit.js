const handleSubmit = (event, settings) => {
  console.log("giggity");
  event.preventDefault();
  const { chartContainer } = settings.misc;
  const { createChart } = settings.functions;
  const formData = settings.functions.getUpdatedFormData();
  console.log(formData);
  createChart(chartContainer, formData);
  console.log("My form data from external function");
  console.log(formData);
};

export { handleSubmit };
