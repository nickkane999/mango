import React, { useState } from "react";
import { Form, FormGroup, Container, Button } from "react-bootstrap";
//import './ChartForm.css';
import { fields, data, settings, styling } from "./BarChartFormData";
import { BarChart } from "./Sample1";

function BarChartForm() {
  const [formData, setFormData] = useState({});

  console.log(data);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
    BarChart(data, formData, settings);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(formData);
    BarChart(data, formData, settings);
    /*
        nums.forEach((ele, i) => {
            nums[i] = parseInt(ele.trim())
          });        
        /*
        let nums = data.split(',');
        nums.forEach((ele, i) => {
          nums[i] = parseInt(ele.trim())
        });
        chartUtil.loadNumbers(nums)
        */
  };
  const { Control, Label, Group } = Form;

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <Group key={field.key}>
            <Label>{field.name}</Label>
            <Control
              placeholder={field.name}
              onChange={handleChange}
              name={field.key}
              /* value={field.default ? field.default : ''} */
            />
          </Group>
        ))}
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </Container>
  );
}

export default BarChartForm;
