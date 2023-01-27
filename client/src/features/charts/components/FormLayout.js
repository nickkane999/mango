import { Form, Col } from "react-bootstrap";
const { Control, Label, Group, Check } = Form;

const Checkbox = (props) => {
  const { field, settings } = props;
  const { functions } = settings;
  return (
    <Col className="form-group" xs={4}>
      <Group className={field.key + " field" + (!field.default ? " hidden" : "")}>
        <Check type="checkbox" label={field.name} onChange={(event) => functions.updateFormCheckbox(event, settings)} defaultChecked={false} name={field.key} />
      </Group>
    </Col>
  );
};

const InputField = (props) => {
  const { field, settings, type } = props;
  const { functions } = settings;
  return (
    <Col className="form-group" xs={4}>
      <Group className={field.key + " field" + (!field.default ? " hidden" : "")}>
        <Label>{field.name}</Label>
        <Control defaultValue={field.data ? field.data : ""} placeholder={field.name} onChange={(event) => functions.updateFormInput(event, settings, type)} name={field.key} />
      </Group>
    </Col>
  );
};

const CheckboxDisplayOptions = (props) => {
  const { field } = props;
  return (
    <Col xs={3}>
      <Group key={field.key}>
        <Check type="checkbox" label={field.name} onChange={(event) => toggleFormField(event, field.key)} name={field.key} defaultChecked={false} />
      </Group>
    </Col>
  );
};

const CheckboxPluginOptions = (props) => {
  const { field, info } = props;
  const { setSelectedPlugin } = info.settings.sessionStorage;

  return (
    <Col xs={3}>
      <Group key={field.key}>
        <Check
          type="checkbox"
          onChange={(event) => {
            setSelectedPlugin((prevState) => {
              if (prevState.hasOwnProperty(event.target.name)) {
                document.querySelector("." + event.target.name).style.display = "none";
                let newValue = { [event.target.name]: event.target.value === "on" ? true : false };
                let newState = { ...prevState, ...newValue };
                delete newState[event.target.name];
                return newState;
              } else {
                document.querySelector("." + event.target.name).style.display = "block";
                let newValue = { [event.target.name]: event.target.value === "on" ? true : false };
                return { ...prevState, ...newValue };
              }
            });
          }}
          label={field.name}
          name={field.key}
          id={field.key}
          defaultChecked={false}
        />
      </Group>
    </Col>
  );
};

const formSections = {
  chart_fields: ".displayChartOptions",
  plugin_fields: ".displayPluginOptions",
  settings: ".chartSettings",
  form_fields: ".formFields",
  plugin_option_fields: ".pluginFields",
};

const handleDisplayOptions = (event, type) => {
  console.log(formSections);
  console.log(formSections[type]);
  console.log(type);
  if (formSections[type]) {
    if (event.target.checked) {
      console.log("aaa");
      console.log(formSections[type]);
      document.querySelector(formSections[type]).style.display = "block";
    } else {
      document.querySelector(formSections[type]).style.display = "none";
    }
  }
};

const toggleFormField = (event, className) => {
  if (event.target.checked) {
    document.querySelector("." + className).style.display = "block";
  } else {
    document.querySelector("." + className).style.display = "none";
  }
};

export { Checkbox, InputField, CheckboxDisplayOptions, CheckboxPluginOptions, handleDisplayOptions };
