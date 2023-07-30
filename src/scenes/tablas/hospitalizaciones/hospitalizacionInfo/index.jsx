import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
//import { mockDataContacts } from "../../data/mockData";
import Header from "../../../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios"; // Importa la librería axios para realizar la solicitud HTTP


const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]); // Estado para almacenar los datos obtenidos desde la API

  useEffect(() => {
    // Utiliza el hook useEffect para realizar la solicitud a la API al cargar el componente
    axios
      .get("http://localhost:9090/pacientes") // Reemplaza "http://ruta-de-tu-api.com/pacientes" con la URL de tu API
      .then((response) => {
        // Asigna un id único a cada fila antes de actualizar el estado
        const rowsWithId = response.data.map((row, index) => ({
          ...row,
          id: index + 1, // Puedes utilizar algún campo único de tus datos para obtener un id más adecuado
        }));
        // Cuando se obtienen los datos de la API con éxito
        //setRows(response.data); // Actualiza el estado con los datos de la API
        setRows(rowsWithId);
      })
      .catch((error) => {
        // Manejo de errores en caso de que la solicitud falle
        console.error("Error al obtener datos desde la API:", error);
      });
  }, []);

  const columns = [
    { 
      field: "id_pac", 
      headerName: "ID", 
      flex: 0.5 
    },
    { 
      field: "cedula_pac", 
      headerName: "Cedula" 
    },
    {
      field: "nombre_pac",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "apellido_paterno_pac",
      headerName: "Apellido Paterno",
      flex: 1,
    },
    {
      field: "apellido_materno_pac",
      headerName: "Apellido Materno",
      flex: 1,
    },
    {
      field: "sexo_pac",
      headerName: "Sexo",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "fecha_nac_pac",
      headerName: "Fecha Nacimiento",
      flex: 1,
    },
    {
      field: "domicilio_pac",
      headerName: "Domicilio",
      flex: 1,
    },
    {
      field: "telefono_pac",
      headerName: "Telefono",
      flex: 1,
    },
    {
      field: "num_expediente_pac",
      headerName: "N.Expediente",
      flex: 1,
    },
    {
      field: "id_hospitalario_pac",
      headerName: "ID.Hospitalario",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="HOSPITALIZACIÓN"
        subtitle="Lista de pacientes registrados"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows} // Reemplaza "mockDataContacts" con "rows"
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.id} // Especifica la función para obtener el id de cada fila
        />
      </Box>
    </Box>
  );
};

export default Contacts;
