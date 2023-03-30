import { Flex, Heading, useColorModeValue } from "@chakra-ui/react";

export const NotFoundPage = () => {
  const containerBg = useColorModeValue("gray.200", "gray.7000");
  const headingFg = useColorModeValue("gray.400", "whiteAlpha.500");

  return (
    <Flex
      w="full"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bg={containerBg}
    >
      <Heading color={headingFg}>404 NOT FOUND</Heading>
    </Flex>
  );
};
