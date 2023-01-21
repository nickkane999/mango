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
        <Control placeholder={field.name} onChange={(event) => functions.updateFormInput(event, settings)} name={field.key} />
      </Group>
    </Col>
  );
};

const createCheckboxDisplayOptions = (field) => {
  return (
    <Col xs={3}>
      <Group key={field.key}>
        <Check type="checkbox" label={field.name} onChange={(event) => toggleFormField(event, field.key)} defaultChecked={false} />
      </Group>
    </Col>
  );
};

const formSections = {
  fields: ".displayOptions",
  settings: ".chartSettings",
  form_fields: ".formFields",
};

const handleDisplayOptions = (event, type) => {
  if (formSections[type]) {
    if (event.target.checked) {
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

export { createCheckbox, createInputField, createCheckboxDisplayOptions, handleDisplayOptions };
