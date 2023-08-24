import React, { useContext, useState } from "react";
import {
  Box,
  IconButton,
  useTheme,
  Dialog,
  DialogContent,
  InputBase,
  Button,
} from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [username, setUsername] = useState("invitado");
  const [password, setPassword] = useState("invitado");

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleLogin = () => {
    console.log("Usuario:", username);
    console.log("Contraseña:", password);

    setUsername(username)
    setPassword(password)

    handleDialogClose();
  };

  const handleLogout = () => {
    console.log("Cerrando sesion de ", username, "...");

    setUsername("")
    setPassword("")

    handleDialogClose();
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleDialogOpen}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent>
          <InputBase
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputBase
            placeholder="Contraseña"
            type={"password"} // Cambiar entre "text" y "password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Iniciar Sesión
          </Button>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </DialogContent>
      </Dialog>

    </Box>
  );
};

export default Topbar;
