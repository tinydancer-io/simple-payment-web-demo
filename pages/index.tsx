import * as React from "react";
import { Container, Flex } from "@chakra-ui/react";
import Cart from "../sections/cart";
import Details from "../sections/details";

const IndexPage = () => {
  const [conf1, setConf1] = React.useState(false);
  return (
    <Container maxW="container.xl" p={0}>
      <Flex
        h={{ base: "auto", md: "100vh" }}
        py={[0, 10, 20]}
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Details conf1={conf1} setConf1={setConf1} />
        <Cart conf1={conf1} setConf1={setConf1} />
      </Flex>
    </Container>
  );
};

export default IndexPage;
