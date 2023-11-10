"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";

const ShowResult = ({ long = "", short = "", callback = () => {} }) => {
  const path = usePathname();
  const share = () => {
    if (navigator.share) {
      navigator.share({
        text: "URL shortener",
        url: short,
        title: "Short URL",
      });
    }
  };

  const copy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(short);
    }
  };
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
      <div className="d-flex gap-4  mb-3">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip>Visit URL</Tooltip>}
        >
          <Link href={short} target="_blank">
            <Button variant="white border border-primary">
              <Image src="/visit.svg" alt="visit" width={20} height={20} />
            </Button>
          </Link>
        </OverlayTrigger>
        <Button onClick={share}>
          <Image
            src="/share.svg"
            alt="visit"
            width={20}
            height={20}
            className="text-white"
          />{" "}
          Share
        </Button>
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip>Copy to Clipboard</Tooltip>}
        >
          <Button className="bg-success" onClick={copy}>
            <Image
              src="/copy.svg"
              alt="visit"
              width={20}
              height={20}
              className="text-white"
            />{" "}
            Copy
          </Button>
        </OverlayTrigger>
      </div>
      <Button
        type="submit"
        variant="success"
        className="p-2 w-100 font-weight-bold"
        onClick={callback}
      >
        {path == "/" ? "Shorten Another URL" : "Update Another URL"}
      </Button>
    </Form>
  );
};

export default ShowResult;
