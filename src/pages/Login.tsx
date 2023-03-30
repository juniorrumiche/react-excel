import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  useColorMode,
  useColorModeValue,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import axios from "axios";
import { ReactSession } from "react-client-session";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/user/slices";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";
/*
 * ==========================================================================
 * */
export const Login = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const state = useSelector((state: RootState) => state.UserSlice);
  const dispatch = useDispatch();
  const formBackground = useColorModeValue("whiteAlpha.400", "whiteAlpha.100");

  /*
   * ==========================================================================
   * */

  const HangleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /*
   * ==========================================================================
   * */
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  /*
   * ==========================================================================
   * */

  const sendForm = async () => {
    await sleep(3000);

    /*
     * =============================================
     * */
    try {
      const response = await axios({
        method: "POST",
        url: "/api/auth",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: form,
      });

      /*
       * =============================================
       * */
      ReactSession.set("user_id", response.data.user_id);
      ReactSession.set("username", response.data.username);
      ReactSession.set("token", response.data.token);

      dispatch(
        setUser({
          user_id: ReactSession.get("user_id") || undefined,
          username: ReactSession.get("username") || undefined,
          token: ReactSession.get("token") || undefined,
        })
      );

      /*
       * =============================================
       * */
    } catch (error) {
      toast({
        position: "top",
        variant: "subtle",
        title: "Credenciales Incorrectas",
        description: "por favor vuelva a intentarlo",
        status: "info",
        duration: 12000,
        isClosable: true,
      });
    }
  };
  /*
   * ==========================================================================
   * */

  return !!state.user.token && !!state.user.user_id && !!state.user.username ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="center"
      bg={colorMode === "dark" ? "gray.700" : "gray.100"}
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        bg={formBackground}
        p={12}
        position="relative"
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Log In</Heading>
        <Input
          onChange={(e) => HangleInputchange(e)}
          name="username"
          placeholder="username"
          type="text"
          variant="filled"
          mb={3}
        />
        <Input
          onChange={(e) => HangleInputchange(e)}
          name="password"
          placeholder="**********"
          type="password"
          variant="filled"
          mb={6}
        />
        <Button
          isLoading={loading}
          loadingText={"Autorizando"}
          onClick={async () => {
            setLoading(true);
            await sendForm();
            setLoading(false);
          }}
          colorScheme="teal"
          mb={8}
        >
          Log In
        </Button>
        <FormControl display="flex" alignItems="center">
          <IconButton
            onClick={toggleColorMode}
            position="fixed"
            top={5}
            right={5}
            icon={colorMode === "dark" ? <MdLightMode /> : <MdDarkMode />}
            aria-label=".."
          />
        </FormControl>
      </Flex>
    </Flex>
  );
};
