import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

/*
 * ==========================================================================
 * */
import { MdCheckCircle, MdClose, MdError, MdWarning } from "react-icons/md";

/*
 * ==========================================================================
 * */

interface Props {
  counter?: number;
  ignoreCounter?: number;
  succesCounter?: number;
  failCounter?: number;
  length?: number;
  total?: number;
  isCompleted?: boolean;
  closeOverlay?: Function;
}

/*
 * ==========================================================================
 * */

export const MessageLoding = (props: Props) => {
  const bgContainer = useColorModeValue("whiteAlpha.400", "whiteAlpha.50");
  const fontColor = useColorModeValue("gray.500", "gray.300");
  return (
    <Box
      mt={10}
      background={bgContainer}
      w={["80%", "60%", "45%", "30%"]}
      padding={5}
      borderRadius="2xl"
    >
      <Flex
        alignItems="center"
        flexDir="column"
        gap={5}
        justifyContent="center"
        padding={10}
      >
        <Spinner
          thickness="5px"
          w={59}
          h={59}
          speed="0.65s"
          emptyColor="gray.200"
          color="gray.500"
          size="xl"
        />
        <Heading fontSize={22} color={fontColor}>
          {props.counter} de {props.total}
        </Heading>
      </Flex>
      <HStack spacing={5} justifyContent="center" color={fontColor}>
        <HStack alignItems="center">
          <MdCheckCircle color="green" size={20} />
          <Text> {props.succesCounter} exito</Text>
        </HStack>

        <HStack alignItems="center">
          <MdError color="red" size={20} />
          <Text> {props.failCounter} error</Text>
        </HStack>

        <HStack alignItems="center">
          <MdWarning color="orange" size={20} />
          <Text> {props.ignoreCounter} ignore</Text>
        </HStack>
      </HStack>
      {props.isCompleted ? (
        <IconButton
          position="fixed"
          top={5}
          right={5}
          icon={<MdClose />}
          aria-label=".."
        />
      ) : (
        ""
      )}
    </Box>
  );
};
