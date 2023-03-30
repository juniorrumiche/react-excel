import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";

/*
 * ==========================================================================
 * */
import { useRef, useState } from "react";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/user/slices";

/*
 * ==========================================================================
 * */
export const LogoutModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  /*
   * ==========================================================================
   * */

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  /*
   * ==========================================================================
   * */

  const sendLogout = async () => {
    await sleep(4000);
    dispatch(logoutUser());
  };

  return (
    <>
      <IconButton onClick={onOpen} icon={<MdLogout />} aria-label="..." />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Cerrar Session</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Estas seguro que deseas cerrar la session ?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              isLoading={isLoading}
              loadingText="Si"
              onClick={async () => {
                setIsLoading(true);
                await sendLogout();
                setIsLoading(false);
              }}
              colorScheme="red"
              ml={3}
            >
              Si
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
