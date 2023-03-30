import {
  Box,
  FormLabel,
  HStack,
  Input,
  Select,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { Main } from "../components/Main";
import { ReactSession } from "react-client-session";
import moment from "moment";

interface dataChart {
  pie_chart?: {
    value: number;
    name: string;
  }[];
  line_chart?: {
    value: number;
    name: string;
  }[];
  data_cacs?: {
    value: number;
    name: string;
  }[];
}

/*
 * ==========================================================================
 * */
export const Dashboard = () => {
  // const [data, setData] = useState<any[]>([]);
  const [data, setData] = useState<dataChart>();

  const [startDateFilter, setStartDateFilter] = useState<string>(
    moment().subtract(7, "days").format("YYYY-MM-DD")
  );
  const [endDateFilter, setEndDateFilter] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const [regionFilter, setRegionFilter] = useState("norte");

  const { colorMode } = useColorMode();
  const chartBackground = useColorModeValue("#F1F5F9", "#454E5D");

  /*
   * ==========================================================================
   * */

  useEffect(() => {
    const timeout = setTimeout(async () => {
      let response = await axios({
        url: "/api/excel/datacharts",

        params: {
          start: startDateFilter,
          end: endDateFilter,
          region: regionFilter,
        },

        headers: {
          authorization: ReactSession.get("token"),
        },
      });
      setData(response.data);
    }, 300);
    return () => clearTimeout(timeout);
  }, [startDateFilter, endDateFilter, regionFilter]);

  /*
   * ==========================================================================
   * */

  const options = {
    backgroundColor: chartBackground,
    toolbox: {
      feature: {
        saveAsImage: { show: true },
      },
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Telefono",
        type: "pie",
        radius: "50%",
        data: data?.pie_chart || [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  const options2 = {
    backgroundColor: chartBackground,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    toolbox: {
      show: true,
      feature: {
        magicType: { show: true, type: ["line", "bar"] },
        saveAsImage: { show: true },
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: data?.line_chart?.map((value) => value.name) || [],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Region",
        type: "bar",
        barWidth: "60%",
        data: data?.line_chart?.map((value) => value.value) || [],
      },
    ],
  };

  const options3 = {
    backgroundColor: chartBackground,
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Nombre Centro",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data?.data_cacs || [],
      },
    ],
  };
  /*
   * ==========================================================================
   * */

  return (
    <Main>
      <Box
        shadow="md"
        w="full"
        p={3}
        background="whiteAlpha.100"
        mb={5}
        borderRadius="lg"
      >
        <HStack justifyContent="flex-end" spacing={5}>
          <HStack alignItems="center">
            <Input
              value={startDateFilter}
              type="date"
              onChange={(e) => setStartDateFilter(e.target.value)}
            />
          </HStack>

          <HStack alignItems="center">
            <FormLabel>-</FormLabel>
            <Input
              value={endDateFilter}
              type="date"
              onChange={(e) => setEndDateFilter(e.target.value)}
            />
          </HStack>
        </HStack>
      </Box>

      <HStack spacing={0} justifyContent="space-between" wrap="wrap">
        <Box
          boxShadow="lg"
          mb={[3, 3, 0, 0]}
          p={3}
          width={["100%", "100%", "49%", "49%"]}
          background="whiteAlpha.100"
          borderRadius="lg"
        >
          <Select onChange={(e) => setRegionFilter(e.target.value)}>
            <option value="norte">NORTE</option>
            <option value="lima">LIMA</option>
            <option value="centro">CENTRO</option>
            <option value="sur">SUR</option>
          </Select>
          <ReactEcharts
            theme={colorMode === "dark" ? "dark" : "light"}
            option={options}
            style={{ width: "100%", height: "355px" }}
          ></ReactEcharts>
        </Box>

        <Box
          boxShadow="lg"
          mb={[3, 3, 0, 0]}
          p={3}
          width={["100%", "100%", "49%", "49%"]}
          background="whiteAlpha.100"
          borderRadius="lg"
        >
          <ReactEcharts
            theme={colorMode === "dark" ? "dark" : "light"}
            option={options2}
            style={{ width: "100%", height: "400px" }}
          />
        </Box>
      </HStack>

      <HStack spacing={0} justifyContent="space-between" wrap="wrap">
        <Box
          boxShadow="lg"
          mt={5}
          p={3}
          width={["100%", "100%", "49%", "49%"]}
          background="whiteAlpha.100"
          borderRadius="lg"
        >
          <ReactEcharts
            theme={colorMode === "dark" ? "dark" : "light"}
            option={options3}
            style={{ width: "100%", height: "400px" }}
          />
        </Box>
      </HStack>
    </Main>
  );
};
