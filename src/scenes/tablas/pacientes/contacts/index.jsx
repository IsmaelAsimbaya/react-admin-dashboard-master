import { useState, useEffect } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../../theme";
//import { mockDataContacts } from "../../data/mockData";
import BorderColorIcon from '@mui/icons-material/BorderColor';
//import DeleteIcon from '@mui/icons-material/Delete';
import Header from "../../../../components/Header";
//import { useTheme } from "@mui/material";
import axios from "axios"; // Importa la librería axios para realizar la solicitud HTTP
import { useNavigate} from 'react-router-dom';
import ActPaciente from "../pacientesActualizar";

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
  const navigate = useNavigate();
  const handleEstadoButtonClick = (row) => {
    // Invert the estado_pac value when the button is clicked
    const updatedEstadoPac = !row.estado_pac;
    //const navigate = useNavigate();

    // Prepare the data object to be sent in the PUT request
    const updatedData = {
      cedula_pac: row.cedula_pac,
      nombre_pac: row.nombre_pac,
      apellido_paterno_pac: row.apellido_paterno_pac,
      apellido_materno_pac: row.apellido_materno_pac,
      sexo_pac: row.sexo_pac,
      fecha_nac_pac: row.fecha_nac_pac,
      domicilio_pac: row.domicilio_pac,
      telefono_pac: row.telefono_pac,
      num_expediente_pac: row.num_expediente_pac,
      id_hospitalario_pac: row.id_hospitalario_pac,
      estado_pac: updatedEstadoPac, // Use the updated estado_pac value
    };




    // Send the updated data to the API using the PUT method
    const id = row.id_pac; // Get the id of the row to be updated
    axios
      .put(`http://localhost:9090/pacientes/${id}`, updatedData)
      .then((response) => {
        // If the API call is successful, update the state with the new data
        const updatedRows = rows.map((r) => {
          if (r.id === row.id) {
            return { ...r, estado_pac: updatedEstadoPac };
          }
          return r;
        });
        setRows(updatedRows);
        console.log("Estado Paciente actualizado en la API.");
      })
      .catch((error) => {
        // Handle errors in case the API call fails
        console.error("Error al actualizar el estado del Paciente:", error);
      });
  };

  const editar = (props) => {
    const {
      cedula_pac,
      nombre_pac,
      apellido_paterno_pac,
      apellido_materno_pac,
      sexo_pac,
      fecha_nac_pac,
      domicilio_pac,
      telefono_pac,
      num_expediente_pac,
      id_hospitalario_pac,
      estado_pac,
    } = props; 
     
    navigate(`/actPaciente/${cedula_pac}/${nombre_pac}/${apellido_paterno_pac}/${apellido_materno_pac}/${sexo_pac}/${fecha_nac_pac}/${domicilio_pac}
    /${telefono_pac}/${num_expediente_pac}/${id_hospitalario_pac}/${estado_pac}`)
    
    
    return (
      <ActPaciente/>

    )
  }

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
      lex: 1,
      //type: "number",
      //headerAlign: "left",
      //align: "left",
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
    {
      field: "estado_pac",
      headerName: "Estado",
      flex: 1,
      renderCell: ({ row }) => {
        const buttonColor = row.estado_pac ? color.greenAccent[600] : color.red[600];
        return (
          <Box display="flex" alignItems="center" justifyContent="center">

            <Button
              onClick={() => handleEstadoButtonClick(row)}
              variant="contained"
              style={{ backgroundColor: buttonColor, width: "20%" }}
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
    <div>
    <Box m="20px">
      <Header
        title="PACIENTES"
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
        <button>
          
        </button>

      </Box>
      
    </Box>
    
    </div>
  );
};

export default Contacts;
