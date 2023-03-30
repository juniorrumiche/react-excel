import { Main } from "../components/Main";
import { ReactSession } from "react-client-session";

import {
  Box,
  Button,
  HStack,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { TableData } from "../components/TableData";
import csv from "csvtojson";
import { useState } from "react";
import axios from "axios";
import { FerrisWheelSpinnerOverlay } from "react-spinner-overlay";
import { MessageLoding } from "../components/MessageLoading";
import moment from "moment";

/*
 * ==========================================================================
 * */

export const Upload = () => {
  const overlayBackground = useColorModeValue("#dce6ef", "#101a23");
  const background = useColorModeValue("#F1F5F9", "#454E5D");
  const tableFg = useColorModeValue("#6D7078", "#A0AEC0");
  const [dateUpload, setDateUpload] = useState<string>(
    moment().format("YYYY-MM-DD")
  );

  const toast = useToast();

  const [tableDataState, setTableDataState] = useState<object[]>();

  const [isCompleted, setIsCompleted] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [counter, setCounter] = useState(1);
  const [failCounter, setFailCouter] = useState(0);
  const [succesCounter, setSuccesCounter] = useState(0);
  const [ignoreCounter, setIgnorecounter] = useState(0);

  const sendData = async () => {
    let counter = 0;
    let succesCounter = 0;
    let ignoreCounter = 0;
    let failCounter = 0;

    for (let obj of tableDataState || []) {
      let form = new FormData();

      // form data
      Object.entries(obj).forEach(([key, value]) => {
        form.append(key, value);
      });

      form.append("createAt", dateUpload);

      const length = form.get("Material")?.toString().length || 0;

      if (length <= 7) {
        ignoreCounter += 1;
        counter += 1;
        setCounter(counter);
        setIgnorecounter(ignoreCounter);
        continue;
      }

      // fetch
      // await sleep(100);
      try {
        await axios("/api/excel/upload", {
          method: "POST",
          data: form,
          headers: {
            authorization: ReactSession.get("token"),
          },
        });

        succesCounter += 1;
        setSuccesCounter(succesCounter);
      } catch (error) {
        failCounter += 1;
        setFailCouter(failCounter);
      }

      counter += 1;
      setCounter(counter);
    }
  };
  const closeOverlayLoader = () => {
    setIsloading(false);
  };

  /*
   * ==========================================================================
   * */
  const loadDataFromCSV = (file: File) => {
    /*
     * ====================================
     * */
    const reader = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");

      /*
       * ====================================
       * */
      fileReader.onload = (e) => {
        csv()
          .fromString(e.target?.result?.toString() || "")
          .then((result) => {
            setTableDataState(result);
            resolve(result);
          });

        fileReader.onerror = (error) => {
          reject(error);
        };
      };
    });

    /*
     * ====================================
     * */

    reader.then((_) => {
      toast({
        variant: "subtle",
        position: "bottom-right",
        status: "success",
        description: "archivo cargado",
      });
    });
  };

  /*
   * ==========================================================================
   * */

  return (
    <Main>
      <Box background={background} p={3} borderRadius="lg" shadow="lg">
        <HStack color={tableFg}>
          <Input
            onChange={(e) =>
              e.target.files && loadDataFromCSV(e.target.files[0])
            }
            border="none"
            pt={1}
            background="none"
            type="file"
            accept=".csv"
          />
          <HStack>
            <Input
              value={dateUpload}
              type="date"
              onChange={(e) => setDateUpload(e.target.value)}
            />

            <Button
              onClick={async () => {
                if (!tableDataState?.length) {
                  toast({
                    position: "top",
                    variant: "subtle",
                    title: "Error",
                    description: "no hay datos para cargar",
                    status: "info",
                    duration: 4000,
                    isClosable: true,
                  });
                  return;
                }
                setIsCompleted(false);
                setIsloading(true);
                await sendData();
                setIsCompleted(true);
                // setIsloading(false);
              }}
            >
              Enviar
            </Button>
          </HStack>
        </HStack>
      </Box>

      <Box boxSizing="border-box" shadow="lg" mt={3}>
        {tableDataState && <TableData data={tableDataState} />}
      </Box>
      <FerrisWheelSpinnerOverlay
        color="rgba(10,12,16,0)"
        size={40}
        message={
          <MessageLoding
            closeOverlay={closeOverlayLoader}
            total={tableDataState?.length}
            counter={counter}
            failCounter={failCounter}
            succesCounter={succesCounter}
            ignoreCounter={ignoreCounter}
            isCompleted={isCompleted}
          />
        }
        overlayColor={overlayBackground}
        loading={isloading}
      />
    </Main>
  );
};
