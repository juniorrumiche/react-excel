import {
  Flex,
  Heading,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Main } from "../components/Main";

export const ErrorBoundary = () => {
  const containerBg = useColorModeValue("gray.200", "gray.7000");

  return (
    <Main>
      <Flex
        w="full"
        h="100vh"
        alignItems="center"
        justifyContent="center"
        bg={containerBg}
      >
        <VStack>
          <Heading fontSize={35} color={"red.300"}>
            Ups ha ocurrido un error
          </Heading>
          <Text>
            si el error persiste por favor contactese con el programador
          </Text>
        </VStack>
      </Flex>
    </Main>
  );
};
