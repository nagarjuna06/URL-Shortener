"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button, Form } from "react-bootstrap";

const ShowResult = ({ long = "", short = "", callback }) => {
  const path = usePathname();
  return (
    <Form className="container mt-5 col-12 col-lg-6">
      <Form.Group className="mb-3">
        <Form.Label>
          <Image
            src="/long-link.svg"
            alt="long-link"
            width={20}
            height={20}
            className="me-2"
          />
          Your long URL
        </Form.Label>
        <Form.Control
          className="p-2"
          type="text"
          defaultValue={long}
          readOnly
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          <Image
            src="/magic.svg"
            alt="magic"
            width={20}
            height={20}
            className="me-2"
          />
          Shorten link
        </Form.Label>
        <Form.Control defaultValue={short} />
      </Form.Group>
      <Button
        type="submit"
        variant="success"
        className="p-2 w-100"
        onClick={callback}
      >
        {path == "/" ? "Shorten Another URL" : "Update Another URL"}
      </Button>
    </Form>
  );
};

export default ShowResult;
