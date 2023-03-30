import {
  Box,
  Flex,
  Heading,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

/*
 * ==========================================================================
 * */
import { MdClose, MdError } from "react-icons/md";

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
  close: Function;
}

/*
 * ==========================================================================
 * */

export const PermisionDenied = (_props: Props) => {
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
        <MdError color="red" size={50} />
        <Heading fontSize={22} color={fontColor}>
          Permiso Denegado
        </Heading>
      </Flex>
      <IconButton
        onClick={() => _props.close()}
        position="fixed"
        top={5}
        right={5}
        icon={<MdClose />}
        aria-label=".."
      />
    </Box>
  );
};
