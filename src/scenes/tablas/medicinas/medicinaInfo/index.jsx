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
  const navigate = useNavigate(); 
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
  const editar = (props) => {
    const {
      id_medi, 
      componentes_medi,
      disponibilidad_medi,
      cantidad_medi,
      id_proveedor_medi,
      id_receta_medi,
      estado_medi,
    }= props;
  navigate(`/actMedicina/${id_medi}/${componentes_medi}/${disponibilidad_medi}/${cantidad_medi}/${id_proveedor_medi}/${id_receta_medi}
  /${estado_medi}`); 
  }
  useEffect(() => {
    // Utiliza el hook useEffect para realizar la solicitud a la API al cargar el componente
    axios
      .get("http://localhost:9090/medicinas") // Reemplaza "http://ruta-de-tu-api.com/pacientes" con la URL de tu API
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
    const updatedEstadoMedi = !row.estado_medi;

    // Prepare the data object to be sent in the PUT request
    const updatedData = {
      componentes_medi: row.componentes_medi,
      disponibilidad_medi: row.disponibilidad_medi,
      cantidad_medi: row.cantidad_medi,
      id_proveedor_medi: row.id_proveedor_medi,
      id_receta_medi: row.id_receta_medi,
      estado_medi: updatedEstadoMedi, // Use the updated estado_pac value
    };

    // Send the updated data to the API using the PUT method
    const id = row.id_medi; // Get the id of the row to be updated
    axios
      .put(`http://localhost:9090/medicinas/${id}`, updatedData)
      .then((response) => {
        // If the API call is successful, update the state with the new data
        const updatedRows = rows.map((r) => {
          if (r.id === row.id) {
            return { ...r, estado_medi: updatedEstadoMedi };
          }
          return r;
        });
        setRows(updatedRows);
        console.log("Estado Medicinas actualizado en la API.");
      })
      .catch((error) => {
        // Handle errors in case the API call fails
        console.error("Error al actualizar el estado de la Medicina:", error);
      });
  };

  const columns = [
    { 
      field: "id_medi", 
      headerName: "ID", 
      flex: 0.5 
    },
    {
      field: "id_proveedor_medi",
      headerName: "ID Proveedor",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "id_receta_medi",
      headerName: "ID Receta",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "componentes_medi",
      headerName: "Componentes",
      flex: 1,
    },
    {
      field: "disponibilidad_medi",
      headerName: "Disponibilidad",
      flex: 1,
    },
    {
      field: "cantidad_medi",
      headerName: "Cantidad",
      flex: 1,
    },
    {
      field: "estado_medi",
      headerName: "Estado",
      flex: 1,
      renderCell: ({ row }) => {
        const buttonColor = row.estado_medi ? color.greenAccent[600] : color.red[600];
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
        title="MEDICINA"
        subtitle="Lista de Medicinas registradas"
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
