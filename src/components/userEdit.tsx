import {
  Avatar,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
} from "@chakra-ui/react";
import { MdPerson } from "react-icons/md";

interface Props {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
}

export const UserConfig = ({ isOpen, onClose }: Props) => {
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack>
              <MdPerson size={30} />
              <Heading fontSize={20}>Tu cuenta</Heading>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            <Center>
              <Avatar size={"2xl"} />
            </Center>
            <FormControl mt={5}>
              <FormLabel> Nombre</FormLabel>

              <Input />
            </FormControl>

            <FormControl mt={5}>
              <FormLabel> Apellido</FormLabel>

              <Input />
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cerrar
            </Button>
            <Button colorScheme="blue">Guardar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
