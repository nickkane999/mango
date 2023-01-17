import React, { useState } from "react";
import { Form, FormGroup, Container, Button } from "react-bootstrap";
import "./ChartFormChartist.css";
import { fields, data, settings, styling } from "./GroupedBarChartFormData";
import { GroupedBarChart } from "./Sample1";

function GroupedBarChartForm() {
  const [formData, setFormData] = useState({});

  console.log(data());
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
    GroupedBarChart(data(), formData, settings());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(formData);
    GroupedBarChart(data(), formData, settings());
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

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <Form.Group key={field.key}>
            <Form.Label>{field.name}</Form.Label>
            <Form.Control
              placeholder={field.name}
              onChange={handleChange}
              name={field.key}
              /* value={field.default ? field.default : ''} */
            />
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </Container>
  );
}

export default GroupedBarChartForm;
