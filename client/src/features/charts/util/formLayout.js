import { Form, Container, Button, Row, Col, Dropdown } from "react-bootstrap";

const { Control, Label, Group, Check } = Form;
const { Menu, Toggle, Item } = Dropdown;

const createCheckbox = (field, settings) => {
  const { functions } = settings;
  return (
    <Col className="form-group" xs={4}>
      <Group className={field.key + " field" + (!field.default ? " hidden" : "")}>
        <Check type="checkbox" label={field.name} onChange={(event) => functions.updateFormCheckbox(event, settings)} defaultChecked={false} name={field.key} />
      </Group>
    </Col>
  );
};

const createInputField = (field, settings) => {
  const { functions } = settings;
  return (
    <Col className="form-group" xs={4}>
      <Group className={field.key + " field" + (!field.default ? " hidden" : "")}>
        <Label>{field.name}</Label>
        <Control defaultValue={field.data ? field.data : ""} placeholder={field.name} onChange={(event) => functions.updateFormInput(event, settings)} name={field.key} />
      </Group>
    </Col>
  );
};

const createCheckboxDisplayOptions = (field) => {
  return (
    <Col xs={3}>
      <Group key={field.key}>
        <Check type="checkbox" label={field.name} onChange={(event) => toggleFormField(event, field.key)} name={field.key} defaultChecked={false} />
      </Group>
    </Col>
  );
};

const createCheckboxPluginOptions = (field, info) => {
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
                console.log("My plugins");
                console.log(prevState);
                return newState;
              } else {
                document.querySelector("." + event.target.name).style.display = "block";
                let newValue = { [event.target.name]: event.target.value === "on" ? true : false };
                console.log("My plugins");
                console.log(prevState);
                return { ...prevState, ...newValue };
              }
            });
          }}
          label={field.name}
          name={field.key}
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

export { createCheckbox, createInputField, createCheckboxDisplayOptions, handleDisplayOptions, createCheckboxPluginOptions };
