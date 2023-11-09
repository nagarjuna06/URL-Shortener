"use client";
import { Bungee } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button, Container, Navbar } from "react-bootstrap";

const bungee = Bungee({ subsets: ["latin"], weight: "400", display: "swap" });
const NavBar = () => {
  const path = usePathname();
  const router = useRouter();
  return (
    <Navbar bg="primary">
      <Container className="d-flex justify-content-between">
        <Link href="/" className="d-flex gap-2">
          <Image src="/logo.svg" alt="logo" width={40} height={40} />
          <h3 style={bungee.style} className="text-light d-none d-lg-block">
            url shortener
          </h3>
        </Link>
        {path == "/" ? (
          <Button variant="dark" onClick={() => router.push("/update")}>
            Update URL
          </Button>
        ) : (
          <Button variant="dark" onClick={() => router.push("/")}>
            Create New URL
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
