import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

/*
 * ==========================================================================
 * */
import { ReactElement, ReactNode, useState } from "react";

/*
 * ==========================================================================
 * */
import {
  MdDarkMode,
  MdLightMode,
  MdOutlineFormatListBulleted,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { LogoutModal } from "./LogoutModal";

/*
 * ==========================================================================
 * */
import { SideBar } from "./SideBar";

/*
 * ==========================================================================
 * */

interface Props {
  children?: ReactNode | ReactElement;
}

/*
 * ==========================================================================
 * */
export const Main = ({ children }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isHidden, setIshHidden] = useState(true);
  
  const state = useSelector((state: RootState) => state.UserSlice);

  const barBackground = useColorModeValue("whiteAlpha.400", "whiteAlpha.100");
  // const background = useColorModeValue("#EDF2F7", "#2D3748");
  /*
   * ==========================================================================
   * */

  return (
    <Flex w="100%" h="100vh" flexBasis="100vh">
      <SideBar isHidden={isHidden} setIsHiden={setIshHidden} />
      <Box w="full" boxSizing="border-box">
        <Flex
          justifyContent="space-between"
          w="100%"
          py={1}
          px={4}
          shadow="lg"
          bg={barBackground}
        >
          <IconButton
            onClick={() => setIshHidden(!isHidden)}
            aria-label="..."
            icon={<MdOutlineFormatListBulleted size={25} />}
          />
          <HStack>
            <IconButton
              onClick={toggleColorMode}
              icon={
                colorMode === "dark" ? (
                  <MdLightMode size={20} />
                ) : (
                  <MdDarkMode size={20} />
                )
              }
              aria-label=".."
            />

            <LogoutModal />

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} />
              </MenuButton>
              <MenuList alignItems={"center"} zIndex={3}>
                <br />
                <Center>
                  <Avatar size={"2xl"} />
                </Center>
                <br />
                <Center>
                  <p>{state.user?.username}</p>
                </Center>
                <br />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
        <Box boxSizing="border-box" p={5}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
};
