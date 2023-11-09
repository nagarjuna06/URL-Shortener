import NavBar from "@/components/navbar";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

const NotFound = () => {
  return (
    <div>
      <NavBar />
      <Container className="d-flex flex-column align-items-center mt-5">
        <Image src="/warn.svg" width={130} height={130} alt="warn" />
        <h3 className="font-weight-bold">404 Not Found</h3>
        <p>This Shorten Link Does not Exist</p>
      </Container>
    </div>
  );
};

export default NotFound;
