import DataTable, { TableStyles } from "react-data-table-component";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";

/*
 * ==========================================================================
 * */
interface Props {
  data: any[];
}

export const TableData = ({ data }: Props) => {
  const background = useColorModeValue("#F1F5F9", "#454E5D");
  const tableFg = useColorModeValue("#6D7078", "#A0AEC0");
  const { colorMode } = useColorMode();

  /*
   * ==========================================================================
   * */

  const getLabels = () => {
    const labelArray = Object.keys(data[0] || []);
    let labels: any = [];
    labelArray.map((value) => {
      labels.push({
        name: value,
        selector: (row: any) => row[value],
        sortable: true,
      });
    });

    return labels;
  };

  /*
   * ==========================================================================
   * */

  const customStyle: TableStyles = {
    header: {
      style: {
        backgroundColor: background,
        textTransform: "uppercase",
        color: tableFg,
        fontSize: "22px",
        minHeight: "56px",
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: "16px",
        paddingRight: "8px",
      },
    },
    headRow: {
      style: {
        minHeight: "56px",
        textTransform: "uppercase",
        color: tableFg,
        fontWeight: "bold",
        fontSize: 15,
        backgroundColor: background,
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
      },
    },
    rows: {
      style: {
        fontSize: "12px",
        fontWeight: 400,
        paddingTop: 20,
        paddingBottom: 20,

        color: tableFg,
        backgroundColor: background,
        minHeight: "48px",

        "&:hover": {
          backgroundColor: "teal",
        },
      },
      highlightOnHoverStyle: {
        backgroundColor: "teal",
        transitionDuration: "0.15s",
        color: "black",
        transitionProperty: "background-color",
        outlineStyle: "solid",
        outlineWidth: "1px",
      },
    },
    pagination: {
      style: {
        backgroundColor: background,

        color: tableFg,
        fontSize: "13px",
        minHeight: "56px",
        borderTopStyle: "solid",
        borderTopWidth: "1px",
      },
    },
  };

  /*
   * ==========================================================================
   * */
  console.log(data[0]);
  return (
    <DataTable
      theme={colorMode}
      customStyles={customStyle}
      highlightOnHover
      pointerOnHover
      fixedHeader
      pagination
      title="Tabla de datos"
      columns={getLabels()}
      data={data}
      defaultSortFieldId={-1}
    />
  );
};
