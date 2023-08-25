import { useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate} from 'react-router-dom';
import Header from "../../../../components/Header";
import axios from "axios"; 


const Contacts = () => {
  const navigate = useNavigate(); 
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
  const editar = (props) => {
    const {
    id_depa, 
    num_empl_depa, 
    encargado_id_dep,
    oficina_depa,
    estado_depart,
    }= props;
    
    navigate(`/actDepartamento/${id_depa}/${num_empl_depa}/${encargado_id_dep}/${oficina_depa}/${estado_depart}`); 
  }
  useEffect(() => {
    // Utiliza el hook useEffect para realizar la solicitud a la API al cargar el componente
    axios
      .get("https://cloud-service-leonardo13344.cloud.okteto.net/departamentos") // Reemplaza "http://ruta-de-tu-api.com/pacientes" con la URL de tu API
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
    const updatedEstadoDept = !row.estado_pac;

    // Prepare the data object to be sent in the PUT request
    const updatedData = {
      num_empl_depa: row.num_empl_depa,
      encargado_id_dep: row.encargado_id_dep,
      oficina_depa: row.oficina_depa,
      estado_depart: updatedEstadoDept, // Use the updated estado_pac value
    };

    // Send the updated data to the API using the PUT method
    const id = row.id_depa; // Get the id of the row to be updated
    axios
      .put(`https://cloud-service-leonardo13344.cloud.okteto.net/departamentos/${id}`, updatedData)
      .then((response) => {
        // If the API call is successful, update the state with the new data
        const updatedRows = rows.map((r) => {
          if (r.id === row.id) {
            return { ...r, estado_depart: updatedEstadoDept };
          }
          return r;
        });
        setRows(updatedRows);
        console.log("Estado Departamento actualizado en la API.");
      })
      .catch((error) => {
        // Handle errors in case the API call fails
        console.error("Error al actualizar el estado del Departamento:", error);
      });
  };

  const columns = [
    { 
      field: "id_depa", 
      headerName: "ID", 
      flex: 0.5 
    },
    {
      field: "oficina_depa",
      headerName: "Oficina",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "num_empl_depa",
      headerName: "N.Empleado",
      flex: 1,
    },
    {
      field: "encargado_id_dep",
      headerName: "ID Encargado",
      flex: 1,
    },
    {
      field: "estado_depart",
      headerName: "Estado",
      flex: 1,
      renderCell: ({ row }) => {
        const buttonColor = row.estado_depart ? color.greenAccent[600] : color.red[600];
        return (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Button
              onClick={() => handleEstadoButtonClick(row)}
              variant="contained"
              style={{ backgroundColor: buttonColor, width: "100%" }}
              sx={{ textAlign: "center" }}
              startIcon={<RestoreFromTrashIcon />}
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
        title="DEPARTAMENTO"
        subtitle="Lista de departamentos registrados"
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
