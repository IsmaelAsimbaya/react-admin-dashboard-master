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
      id_hosp, 
      fecha_inic_hosp,
      fecha_fin_hosp,
      personal_encarg_hosp,
      descripcion_hosp,
      estado_hosp,
    }= props;
  navigate(`/ActHospitalizacion/${id_hosp}/${fecha_inic_hosp}/${fecha_fin_hosp}/${personal_encarg_hosp}/${descripcion_hosp}/${estado_hosp}`); 
  }

  useEffect(() => {
    // Utiliza el hook useEffect para realizar la solicitud a la API al cargar el componente
    axios
      .get("http://localhost:9090/hospitalizaciones") // Reemplaza "http://ruta-de-tu-api.com/pacientes" con la URL de tu API
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
    const updatedEstadoHosp = !row.estado_hosp;

    // Prepare the data object to be sent in the PUT request
    const updatedData = {
      fecha_inic_hosp: row.fecha_inic_hosp,
      fecha_fin_hosp: row.fecha_fin_hosp,
      personal_encarg_hosp: row.personal_encarg_hosp,
      descripcion_hosp: row.descripcion_hosp,
      estado_hosp: updatedEstadoHosp, // Use the updated estado_pac value
    };

    // Send the updated data to the API using the PUT method
    const id = row.id_hosp; // Get the id of the row to be updated
    axios
      .put(`http://localhost:9090/hospitalizaciones/${id}`, updatedData)
      .then((response) => {
        // If the API call is successful, update the state with the new data
        const updatedRows = rows.map((r) => {
          if (r.id === row.id) {
            return { ...r, estado_hosp: updatedEstadoHosp };
          }
          return r;
        });
        setRows(updatedRows);
        console.log("Estado Hospitalizacion actualizado en la API.");
      })
      .catch((error) => {
        // Handle errors in case the API call fails
        console.error("Error al actualizar el estado de la hospitalizacion:", error);
      });
  };

  const columns = [
    { 
      field: "id_hosp", 
      headerName: "ID", 
      flex: 0.5 
    },
    {
      field: "personal_encarg_hosp",
      headerName: "Personal Encargado",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "fecha_inic_hosp",
      headerName: "Fecha Inicio",
      flex: 1,
    },
    {
      field: "fecha_fin_hosp",
      headerName: "Fecha Fin",
      flex: 1,
    },
    {
      field: "descripcion_hosp",
      headerName: "Descripcion",
      flex: 1,
    },
    {
      field: "estado_hosp",
      headerName: "Estado",
      flex: 1,
      renderCell: ({ row }) => {
        const buttonColor = row.estado_hosp ? color.greenAccent[600] : color.red[600];
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
        title="HOSPITALIZACIÓN"
        subtitle="Lista de Hospitalizaciones"
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
