import {
  Heading,
  IconButton,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

/*
 * ==========================================================================
 * conso
 * */
import {
  MdDashboard,
  MdFileUpload,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdPerson,
  MdTableChart,
} from "react-icons/md";

/*
 * ==========================================================================
 * conso
 * */

import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";

/*
 * ==========================================================================
 * conso
 * */

interface Props {
  isHidden?: boolean;
  setIsHiden: Function;
}

/*
 * ==========================================================================
 * conso
 * */
export const SideBar = ({ isHidden, setIsHiden }: Props) => {
  const { collapsed } = useProSidebar();

  const sidebarBackground = useColorModeValue("#F1F5F9", "#394353");
  const itemHover = useColorModeValue("teal", "#495260");
  /*
   * ==========================================================================
   * conso
   * */
  return (
    <Sidebar
      defaultCollapsed={collapsed}
      hidden={isHidden}
      backgroundColor={sidebarBackground}
      style={{
        border: "none",
        position: "fixed",
        height: "100%",
        zIndex: 2,
        transition: "1s all ease",
      }}
    >
      <Menu
        menuItemStyles={{
          button: ({ level, active, disabled }) => {
            if (level === 0) {
              return {
                color: disabled ? "#eee" : "#455A64",
                backgroundColor: active ? "#fff" : undefined,
                "&:hover": {
                  backgroundColor: `${itemHover} !important`,
                  color: "white !important",
                  borderRadius: "8px !important",
                  fontWeight: "bold !important",
                },
              };
            }
          },
        }}
      >
        <Stack
          padding={5}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {collapsed ? "" : <Heading fontSize="2xl">SYSTEM</Heading>}
          <IconButton
            onClick={() => setIsHiden(true)}
            aria-label=".."
            icon={
              collapsed ? (
                <MdKeyboardDoubleArrowRight size={30} />
              ) : (
                <MdKeyboardDoubleArrowLeft size={30} />
              )
            }
          />
        </Stack>

        <MenuItem
          component={<Link to="/admin/dashboard" />}
          icon={<MdDashboard size={collapsed ? 25 : 20} />}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          component={<Link to="/admin/excel/upload" />}
          icon={<MdFileUpload size={collapsed ? 30 : 25} />}
        >
          Subir Excel
        </MenuItem>
        <SubMenu
          label="Tabla Dinamica"
          icon={<MdTableChart size={collapsed ? 25 : 20} />}
        >
          <MenuItem
            component={<Link to={"/admin/excel/centro"} />}
            icon={<MdFileUpload size={collapsed ? 30 : 25} />}
          >
            Centro
          </MenuItem>
          <MenuItem
            component={<Link to={"/admin/excel/norte"} />}
            icon={<MdFileUpload size={collapsed ? 30 : 25} />}
          >
            Norte
          </MenuItem>

          <MenuItem
            component={<Link to={"/admin/excel/lima"} />}
            icon={<MdFileUpload size={collapsed ? 30 : 25} />}
          >
            Lima
          </MenuItem>

          <MenuItem
            component={<Link to={"/admin/excel/sur"} />}
            icon={<MdFileUpload size={collapsed ? 30 : 25} />}
          >
            Sur
          </MenuItem>
        </SubMenu>

        <MenuItem
          component={<Link to={"/admin/users"} />}
          icon={<MdPerson size={collapsed ? 30 : 25} />}
        >
          Usuarios
        </MenuItem>
      </Menu>
    </Sidebar>
  );
};
