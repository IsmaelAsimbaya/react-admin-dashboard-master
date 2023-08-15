import { useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
//import { mockDataContacts } from "../../data/mockData";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate} from 'react-router-dom';

import Header from "../../../../components/Header";
//import { useTheme } from "@mui/material";
import axios from "axios"; // Importa la librería axios para realizar la solicitud HTTP


const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]); // Estado para almacenar los datos obtenidos desde la API
  const color = {
    greenAccent: {
      100: "#e7f6e7",
      200: "#c2e9c2",
      600: "#00a800",
      // Add other variants if necessary
    },
    red: {
      100: "#fee5e5",
      200: "#fcaaaf",
      600: "#e53935",
      // Add other variants if necessary
    },
    // Add other colors if necessary
  };
  const navigate = useNavigate(); 
  const editar = (props) => {
    const {
      id_labo, 
      nombre_pac_labo,
      med_solicitante_labo,
      fecha_labo,
      tipo_prueba_labo,
      observaciones_labo,
      id_personal_labo,
      estado_labo,
    }= props;
  navigate(`/actLaboratorio/${id_labo}/${nombre_pac_labo}/${med_solicitante_labo}/${fecha_labo}/${tipo_prueba_labo}/${observaciones_labo}
  /${id_personal_labo}/${estado_labo}`); 
  }
  useEffect(() => {
    // Utiliza el hook useEffect para realizar la solicitud a la API al cargar el componente
    axios
      .get("http://localhost:9090/laboratorios") // Reemplaza "http://ruta-de-tu-api.com/pacientes" con la URL de tu API
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

  const handleEstadoButtonClick = (row) => {
    // Invert the estado_pac value when the button is clicked
    const updatedEstadoLabo = !row.estado_labo;

    // Prepare the data object to be sent in the PUT request
    const updatedData = {
      nombre_pac_labo: row.nombre_pac_labo,
      med_solicitante_labo: row.med_solicitante_labo,
      fecha_labo: row.fecha_labo,
      tipo_prueba_labo: row.tipo_prueba_labo,
      observaciones_labo: row.observaciones_labo,
      id_personal_labo: row.id_personal_labo,
      estado_labo: updatedEstadoLabo, // Use the updated estado_pac value
    };

    // Send the updated data to the API using the PUT method
    const id = row.id_labo; // Get the id of the row to be updated
    axios
      .put(`http://localhost:9090/laboratorios/${id}`, updatedData)
      .then((response) => {
        // If the API call is successful, update the state with the new data
        const updatedRows = rows.map((r) => {
          if (r.id === row.id) {
            return { ...r, estado_labo: updatedEstadoLabo };
          }
          return r;
        });
        setRows(updatedRows);
        console.log("Estado Laboratorio actualizado en la API.");
      })
      .catch((error) => {
        // Handle errors in case the API call fails
        console.error("Error al actualizar el estado del Laboratorio:", error);
      });
  };

  const columns = [
    { 
      field: "id_labo", 
      headerName: "ID", 
      flex: 0.5 
    },
    {
      field: "nombre_pac_labo",
      headerName: "Nombre Paciente",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "med_solicitante_labo",
      headerName: "Medico Solicitante",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "fecha_labo",
      headerName: "Fecha",
      flex: 1,
    },
    {
      field: "tipo_prueba_labo",
      headerName: "Tipo Prueba",
      flex: 1,
    },
    {
      field: "id_personal_labo",
      headerName: "ID Personal",
      flex: 1,
    },
    {
      field: "observaciones_labo",
      headerName: "Observaciones",
      flex: 1,
    },
    {
      field: "estado_labo",
      headerName: "Estado",
      flex: 1,
      renderCell: ({ row }) => {
        const buttonColor = row.estado_labo ? color.greenAccent[600] : color.red[600];
        return (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              onClick={() => handleEstadoButtonClick(row)}
              variant="contained"
              style={{ backgroundColor: buttonColor, width: "100%" }}
              sx={{ textAlign: "center" }}
              startIcon={<BorderColorIcon />}
            />
            <Button
              onClick={() => editar(row)}
              varian  t="variable"
              style={{ backgroundColor: color.greenAccent[200], width: "30%" }}
              sx={{ textAlign: "center" }}
              startIcon={<BorderColorIcon />}
              
            />
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="LABORATORIO"
        subtitle="Lista de Laboratorio registrados"
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
