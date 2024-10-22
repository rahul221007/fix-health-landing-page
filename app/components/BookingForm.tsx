"use client"; // Add this line at the top to indicate it's a Client Component

import { useState, useEffect } from "react";
import { Form, Input, Button, Steps, Result, Descriptions, Select } from "antd";
import { useSearchParams } from "next/navigation"; // For handling URL parameters
import { doctors } from "../utils/constants";

const { Step } = Steps;

export default function BookingForm({ darkMode }: { darkMode: boolean }) {
  const [step, setStep] = useState(0);
  const [form] = Form.useForm(); // Ant Design's form instance
  const [submitted, setSubmitted] = useState(false);
  const [cityFromUrl, setCityFromUrl] = useState(""); // no need for explicit typing
  const searchParams = useSearchParams();

  useEffect(() => {
    const city = searchParams.get("city");
    if (city) {
      setCityFromUrl(city);
      form.setFieldsValue({ city }); // Overwrite the city in the form
    }
  }, [searchParams, form]);

  const INITIAL_VALUES = {
    name: "",
    phone: "",
    age: 0,
    city: "",
    occupation: "",
    company: "",
    complaints: "",
    previousExperience: "",
    selectedDoctor:""
  };
  const [formData, setFormData] = useState(INITIAL_VALUES);

  const uniqueCities = Array.from(new Set(doctors.map((doctor) => doctor.city)));


  const nextStep = async () => {
    try {
      await form.validateFields(); // Validate the current step’s fields
      setStep((prevStep) => prevStep + 1); // Proceed to the next step only if validation is successful
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const onFinish = (values:FormData) => {
    setFormData({ ...formData, ...values });
    if (step === 4) {
      // Final submission step
      setSubmitted(true); // Set submitted to true to show confirmation message
    } else {
      nextStep();
    }
  };

  const handleFormChange = (changedFields: Partial<FormData>) => {
    setFormData({ ...formData, ...changedFields });
  };

  const filteredDoctors = doctors.filter(
    (doctor) => doctor.city?.toLowerCase() === formData.city?.toLowerCase()
  );

  if (submitted) {
    return (
      <div
        className={`p-8 ${darkMode ? "bg-gray-600" : "bg-white"} rounded-lg`}
      >
        <Result
          status="success"
          title="Thank You for Your Booking!"
          subTitle="Your booking details have been successfully submitted."
          extra={[
            <Button
              type="primary"
              key="book-another"
              onClick={() => {
                setStep(0);
                setSubmitted(false);
                setFormData(INITIAL_VALUES);
                form.resetFields();
              }}
            >
              Book Another Appointment
            </Button>,
          ]}
        />
        <div className="mt-8">
          <Descriptions
            title="Submitted Details"
            bordered
            column={1}
            className={`${
              darkMode ? "bg-gray-400 text-white" : "bg-white text-black"
            } rounded-lg shadow-md p-6`}
          >
            <Descriptions.Item label="Name">{formData.name}</Descriptions.Item>
            <Descriptions.Item label="Phone">{formData.phone}</Descriptions.Item>
            <Descriptions.Item label="Age">{formData.age}</Descriptions.Item>
            <Descriptions.Item label="City">{formData.city}</Descriptions.Item>
            <Descriptions.Item label="Occupation">
              {formData.occupation}
            </Descriptions.Item>
            {formData.company && (
              <Descriptions.Item label="Company">
                {formData.company}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Chief Complaints">
              {formData.complaints}
            </Descriptions.Item>
            {formData.age >= 30 && formData.previousExperience && (
              <Descriptions.Item label="Previous Experience">
                {formData.previousExperience}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Doctor">
              {formData.selectedDoctor}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-8 ${darkMode ? "bg-gray-400" : "bg-white"} rounded-lg border-b`}
    >
      <Steps current={step}>
        <Step title="Basic Info" />
        <Step title="Details" />
        <Step title="Complaints" />
        <Step title="Experience" />
        <Step title="Doctors" />
      </Steps>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={handleFormChange}
        className="p-6"
      >
        {step === 0 && (
          <div>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please enter your phone" }]}
            >
              <Input placeholder="Enter your phone number" />
            </Form.Item>
            <div className="flex justify-end">
              <Button type="primary" onClick={nextStep}>
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <Form.Item
              label="Age"
              name="age"
              rules={[{ required: true, message: "Please enter your age" }]}
            >
              <Input type="number" placeholder="Enter your age" />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please select your city" }]}
            >
              <Select placeholder="Select your city" disabled={!!cityFromUrl}>
                {uniqueCities.map((city) => (
                  <Select.Option key={city} value={city}>
                    {city}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Occupation"
              name="occupation"
              rules={[
                { required: true, message: "Please enter your occupation" },
              ]}
            >
              <Input placeholder="Enter your occupation" />
            </Form.Item>
            {form.getFieldValue("occupation")?.toLowerCase() !== "housewife" &&
              form.getFieldValue("occupation")?.toLowerCase() !==
                "homemaker" && (
                <Form.Item label="Company" name="company">
                  <Input placeholder="Enter your company" />
                </Form.Item>
              )}
            <div className="justify-between flex items-center">
              <Button onClick={prevStep}>Prev</Button>
              <Button type="primary" onClick={nextStep}>
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <Form.Item
              label="Chief Complaints"
              name="complaints"
              rules={[
                { required: true, message: "Please enter your complaints" },
              ]}
            >
              <Input.TextArea placeholder="Describe your complaints" />
            </Form.Item>
            <div className="justify-between flex items-center">
              <Button onClick={prevStep}>Prev</Button>
              <Button type="primary" onClick={nextStep}>
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <Form.Item
              label="Previous Experience with Physiotherapy"
              name="previousExperience"
            >
              <Input.TextArea
                placeholder="Applicable if you are 30 years or older: Share any prior physiotherapy experience"
                disabled={!(form.getFieldValue("age") >= 30)}
              />
            </Form.Item>
            <div className="justify-between flex items-center">
              <Button onClick={prevStep}>Prev</Button>
              <Button type="primary" onClick={nextStep}>
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Select a Doctor in {formData.city}
            </h3>
            <Form.Item
              label="Available Doctors"
              name="selectedDoctor"
              rules={[{ required: true, message: "Please select a doctor" }]}
            >
              <Select placeholder="Select a doctor">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor, index) => (
                    <Select.Option key={index} value={doctor.name}>
                      {doctor.name} - {doctor.expertise}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option disabled>
                    No doctors available in this city
                  </Select.Option>
                )}
              </Select>
            </Form.Item>
            <div className="justify-between flex items-center mt-2">
              <Button onClick={prevStep}>Prev</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}
