"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import ShowResult from "./showResult";
import { initialError, initialOptions } from "@/lib/options";

const UrlForm = () => {
  const [options, setOptions] = useState(initialOptions);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(initialError);
  const [checkbox, setCheckbox] = useState(false);
  const [success, setSuccess] = useState(false);
  const [urls, setUrls] = useState({ long: "", short: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOptions(initialOptions);
    setValidated(false);
    setError(initialError);
    setCheckbox(false);
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
        method: "POST",
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
        setError((prev) => ({ ...prev, inValid: true, msg: data.msg }));
      }
    }
    setValidated(true);
  };
  const handleChange = (e) => {
    if (e.target.checked) {
      setOptions((prev) => [...prev, { placeholder: "no expiry", value: 0 }]);
      setCheckbox(true);
    } else {
      setOptions(initialOptions);
      setCheckbox(false);
    }
  };
  const handleAliasChange = (e) => {
    setError((prev) => ({
      ...prev,
      value: e.target.value,
      msg: initialError.msg,
      inValid: false,
    }));
    if (e.target.value == "") {
      setCheckbox(false);
    }
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
            Shorten a long URL
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
              placeholder="Enter Alias (Optional)"
              minLength={5}
              maxLength={10}
              pattern="^[a-zA-Z0-9-_]+$"
              value={error.value}
              onChange={handleAliasChange}
              isInvalid={error.inValid}
            />
            <Form.Control.Feedback type="invalid" className="small">
              {error.msg}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            label="I will update this URL in future"
            checked={checkbox}
            onChange={handleChange}
            disabled={error.value == ""}
          />
        </Form.Group>
        {checkbox ? (
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="pin"
              placeholder="Set PIN"
              pattern="^[0-9]+$"
              required
              minLength={4}
              maxLength={10}
            />
            <Form.Control.Feedback type="invalid" className="small">
              PIN length must be between 4 to 10 digits
            </Form.Control.Feedback>
          </Form.Group>
        ) : null}
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

export default UrlForm;
