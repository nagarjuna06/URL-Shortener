"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import ShowResult from "./showResult";
import { initialUpdateErrors, initialUpdateOptions } from "@/lib/options";

const UpdateForm = () => {
  const [options, setOptions] = useState(initialUpdateOptions);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState(initialUpdateErrors);
  const [success, setSuccess] = useState(false);
  const [urls, setUrls] = useState({ long: "", short: "" });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setErrors(initialUpdateErrors);
    setValidated(false);
  }, [urls]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const body = Object.fromEntries(new FormData(form));
      setLoading(true);
      const response = await fetch("/api/shorten", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setLoading(false);
      if (data.short) {
        setUrls(data);
        setSuccess(true);
      } else {
        setErrors(data);
      }
    }
    setValidated(true);
  };
  const handleChange = () => {
    setErrors(initialUpdateErrors);
  };

  if (success) {
    return <ShowResult {...urls} callback={() => setSuccess(false)} />;
  } else {
    return (
      <Form
        className="container mt-5 col-12 col-lg-6"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        onChange={handleChange}
        autoComplete="off"
      >
        <Form.Group className="mb-4">
          <Form.Label>
            <Image
              src="/long-link.svg"
              alt="long-link"
              width={20}
              height={20}
              className="me-2"
            />
            Update a Long URL
          </Form.Label>
          <Form.Control
            name="link"
            className="p-2"
            type="text"
            placeholder="Enter a long link here"
            pattern="https?://.+"
            required
          />
          <Form.Control.Feedback type="invalid" className="small">
            Please enter a valid URL starting with http:// or https://
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Label>
          <Image
            src="/magic.svg"
            alt="magic"
            width={20}
            height={20}
            className="me-2"
          />
          Customize your link
        </Form.Label>
        <Row>
          <Form.Group as={Col} className="col-12 col-lg-6 mb-3">
            <Form.Select name="expires" required defaultValue="">
              <option value="">Select Expiry Time</option>
              {options.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.placeholder}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid" className="small">
              Please Select the Expiry time
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} className="col-12 col-lg-6 mb-3">
            <Form.Control
              name="alias"
              className="p-2"
              type="text"
              placeholder="Enter Alias"
              minLength={5}
              maxLength={10}
              pattern="^[a-zA-Z0-9-_]+$"
              isInvalid={errors?.alias?.invalid}
              required
              autoComplete="on"
            />
            <Form.Control.Feedback type="invalid" className="small">
              {errors?.alias?.msg}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="pin"
            placeholder="Enter your PIN"
            pattern="^[0-9]+$"
            required
            minLength={4}
            maxLength={10}
            isInvalid={errors?.pin?.invalid}
          />
          <Form.Control.Feedback type="invalid" className="small">
            {errors?.pin?.msg}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="success" className="p-2 w-100">
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Shorten URL"
          )}
        </Button>
      </Form>
    );
  }
};

export default UpdateForm;
