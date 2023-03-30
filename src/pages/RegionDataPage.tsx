import { Box, useColorModeValue } from "@chakra-ui/react";
import { ReactSession } from "react-client-session";
import axios, { AxiosError } from "axios";
// import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Main } from "../components/Main";
import { SkeletonTable } from "../components/SkeletonTable";
import { TableData } from "../components/TableData";
import { FerrisWheelSpinnerOverlay } from "react-spinner-overlay";
import { PermisionDenied } from "../components/PermisionDenied";

export const RegionDataPage = () => {
  const overlayBackground = useColorModeValue("#dce6ef", "#101a23");
  const [alertPermision, setAlertPermision] = useState(false);
  const [data, setData] = useState<any[]>();
  const params = useParams();

  /*
   * ==========================================================================
   * */
  const closeAlertPermision = useCallback(() => {
    setAlertPermision(false);
  }, [alertPermision]);

  /*
   * ==========================================================================
   * */
  useEffect(() => {
    const timeout = setTimeout(async () => {
      setData(data ? undefined : data);
      /*
       * ==========================================================================
       * */
      try {
        let response = await axios({
          url: "/api/excel/data/region/" + params.region,
          headers: {
            authorization: ReactSession.get("token"),
          },
        });
        setData(response.data);

        /*
         * ==========================================================================
         * */
      } catch (error: any) {
        setData([]);
        const err = error as AxiosError;
        if (err.response?.status == 403) {
          setAlertPermision(true);
        }
      }
    }, 300);

    /*
     * ==========================================================================
     * */
    return () => clearTimeout(timeout);
  }, [params]);

  /*
   * ==========================================================================
   * */
  return (
    <Main>
      <Box boxSizing="border-box" p={5}>
        {!data ? <SkeletonTable /> : <TableData data={data} />}

        <FerrisWheelSpinnerOverlay
          color="rgba(10,12,16,0)"
          size={40}
          message={<PermisionDenied close={closeAlertPermision} />}
          overlayColor={overlayBackground}
          loading={alertPermision}
        />
      </Box>
    </Main>
  );
};
