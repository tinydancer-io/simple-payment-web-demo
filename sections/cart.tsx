import {
  Heading,
  HStack,
  VStack,
  Image,
  AspectRatio,
  Text,
  Divider,
  Stack,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
// import { connect } from "http2";
import React, { useEffect } from "react";
import { ConnectWallet } from "./ct";

const Cart = ({ conf1, setConf1 }: any) => {
  const { toggleColorMode } = useColorMode();
  const { connect, connected, publicKey, disconnect, signTransaction } =
    useWallet();
  const [address, setAddress] = React.useState(publicKey?.toBase58() || "");
  console.log(connected, publicKey?.toBase58());
  const bgColor = useColorModeValue("gray.50", "whiteAlpha.50");
  const secondaryTextColor = useColorModeValue("gray.600", "gray.400");
  useEffect(() => {
    disconnect();
  }, []);
  return (
    <>
      <Button
        position="absolute"
        top="1rem"
        right="1rem"
        style={{
          margin: "1rem",
          backgroundColor: "white",
          color: "black",
          textAlign: "center",
        }}
        // onClick={async () => await connect()}
        icon={
          <Image
            src="https://res.cloudinary.com/dev-connect/image/upload/v1678537416/phantom_piokgm.svg"
            alt="phantom"
            width="25%"
            height="25%"
          />
        }
      >
        <ConnectWallet setAddress={setAddress} noToast={false}>
          {connected
            ? address.length > 0 &&
              address.substring(0, 5) +
                "..." +
                address.substring(35, address.length - 5)
            : "Connect Wallet"}
        </ConnectWallet>
      </Button>
      <VStack
        w="full"
        h="full"
        p={10}
        spacing={6}
        align="flex-start"
        bg={bgColor}
      >
        <VStack alignItems="flex-start" spacing={3}>
          <Heading size="2xl">Your cart</Heading>
          <Text>
            Complete your purchase for{" "}
            <Button
              onClick={toggleColorMode}
              variant="link"
              colorScheme="black"
            >
              Solana Monke Business #1
            </Button>
          </Text>
        </VStack>
        <HStack spacing={6} alignItems="center" w="full">
          <AspectRatio ratio={1} w={24}>
            <Image
              src="https://img-cdn.magiceden.dev/rs:fill:400:400:0:0/plain/https://i.imgur.com/bMH6qNc.png"
              alt="Skateboard"
              borderRadius="full"
            />
          </AspectRatio>
          <Stack
            spacing={0}
            w="full"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <VStack w="full" spacing={0} alignItems="flex-start">
              <Heading size="md">Solana Monke Business</Heading>
              <Text color={secondaryTextColor}>#1</Text>
            </VStack>
            <Heading size="sm" textAlign="end">
              Ⓞ69
            </Heading>
          </Stack>
        </HStack>
        <VStack spacing={4} alignItems="stretch" w="full">
          <HStack justifyContent="space-between">
            <Text color={secondaryTextColor}>Subtotal</Text>
            <Heading size="sm">Ⓞ 69</Heading>
          </HStack>
          <HStack justifyContent="space-between">
            <Text color={secondaryTextColor}>Shipping</Text>
            <Heading size="sm">Ⓞ 0</Heading>
          </HStack>
          <HStack justifyContent="space-between">
            <Text color={secondaryTextColor}>Taxes (estimated)</Text>
            <Heading size="sm">Ⓞ 0</Heading>
          </HStack>
        </VStack>
        <Divider />
        <HStack justifyContent="space-between" w="full">
          <Text color={secondaryTextColor}>Total</Text>
          <Heading size="lg">Ⓞ 69</Heading>
        </HStack>
      </VStack>
    </>
  );
};

export default Cart;
