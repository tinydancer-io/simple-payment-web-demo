import {
  Select,
  Checkbox,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import axios from "axios";
import Confirm from "./confirm";

const Details = ({ conf1, setConf1 }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { connect, connected, publicKey, signTransaction } = useWallet();
  const colSpan = useBreakpointValue({ base: 2, md: 1 });
  const send = async () => {
    if (!connected) {
      console.log("Please connect your wallet first");
      return;
    }
    console.log("publicKey", publicKey?.toBase58());
    const connection = new Connection("http://0.0.0.0:8899");
    const transferTransaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey!,
        toPubkey: new PublicKey("D5t7GYiAXgLFQVSwzR3i3QhBfZbSeZVTjk6vSyjCV9DS"),
        lamports: 0.1 * LAMPORTS_PER_SOL,
      })
    );
    console.log("transferTransaction", transferTransaction);
    const { blockhash } = await connection.getLatestBlockhash();
    transferTransaction.recentBlockhash = blockhash;
    transferTransaction.feePayer = publicKey!;
    if (connected && signTransaction) {
      const txn = await signTransaction(transferTransaction);
      const signature = await connection.sendRawTransaction(txn.serialize());
      console.log("signature", signature);
      let res = await axios.post("http://0.0.0.0:8890", {
        jsonrpc: "2.0",
        id: 1,
        method: "getSignatureStatuses",
        params: [
          [signature],
          {
            searchTransactionHistory: true,
          },
        ],
      });
      console.log("res", res.data);
      //   res.value.map((v) => {
      //     if (v) {
      //       v.confirmationStatus === "confirmed" && setConf1(true);
      //     }
      //   });
      //@ts-ignore
      if (res.data.result.context.sampled === false)
        alert("dont trust confirmation");
      setConf1(true);
    }
  };
  return (
    <VStack w="full" h="full" p={10} spacing={10} alignItems="flex-start">
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="2xl">Your Details</Heading>
        <Text>If you already have an account, click here to log in.</Text>
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input placeholder="Raj" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input placeholder="Gokal" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input placeholder="Solana Beach" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>State</FormLabel>
            <Input placeholder="California" />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Select>
              <option value="usa">United States of America</option>
              <option value="ca">Canada</option>
              <option value="ja">Japan</option>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <Checkbox defaultChecked>Send email invoice</Checkbox>
        </GridItem>
        <GridItem colSpan={2}>
          <Button
            variant="primary"
            size="lg"
            w="full"
            onClick={async () => {
              onOpen();
              await send();
            }}
          >
            Place Order
          </Button>
          <Confirm
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            conf1={conf1}
            setConf1={setConf1}
          />
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
};

export default Details;
