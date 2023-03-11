import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

function Confirm({ isOpen, onOpen, onClose, conf1, setConf1 }: any) {
  //   const [conf2, setConf2] = React.useState(false);
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader textAlign="center">Waiting for confirmation</ModalHeader> */}

          <ModalBody>
            {/* <Flex flexDir="column" h="300px"> */}
            <Box h="300px">
              <Flex
                //   h="300px"
                // justifyItem/s="space-around"
                // border="1px solid blue"
                flexDir="column"
                alignItems="center"
                justify="center"
                h="full"

                // w="300px"
              >
                {conf1 ? (
                  <Text fontSize="3xl">✅</Text>
                ) : (
                  <Spinner
                    w="4rem"
                    h="4rem"
                    color="green.500"
                    thickness="4px"
                  />
                )}
                {conf1 ? (
                  <Text
                    textAlign="center"
                    fontFamily="Inter"
                    fontWeight="bold"
                    mt="4"
                    //   flex="1"
                    //   h="10px"
                    //   border="1px solid red"
                    //   w="150px"
                    //   minW="100px"
                    fontSize="md"
                  >
                    Transaction Confirmed! 🎉
                  </Text>
                ) : (
                  <Text
                    textAlign="center"
                    fontFamily="Inter"
                    fontWeight="bold"
                    mt="4"
                    //   flex="1"
                    //   h="10px"
                    //   border="1px solid red"
                    //   w="150px"
                    //   minW="100px"
                    fontSize="md"
                  >
                    Waiting for confirmation from tinydancer
                  </Text>
                )}
              </Flex>
            </Box>
            {/* </Flex> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Confirm;
