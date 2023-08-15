import { Box, Button, TextField, FormControl, Select, MenuItem, FormHelperText, Typography , InputLabel   } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ActHistorial = () => {

  const {
    id_hist,
    id_consulta_hist,
    id_paciente_hist,
    estado_hist,
  } = useParams();
  const [rows, setRows] = useState([]);
  const initialValues = {

    id_consulta_hist: id_consulta_hist,
    id_paciente_hist: id_paciente_hist,
    estado_hist: estado_hist,

  };

  const handleUpdate = async (row) => {
    
    // Invert the estado_pac value when the button is clicked
    
    //const navigate = useNavigate();

    // Prepare the data object to be sent in the PUT request
    const updatedData = {
      id_consulta_hist: row.id_consulta_hist,
      id_paciente_hist: row.id_paciente_hist,
      estado_hist: row.estado_hist,
    };

   // console.log("Consulta", id_consulta_hist);
    // console.log("Paciente", id_paciente_hist);

   
    try {
      console.log(updatedData); 
      await axios.put(`http://localhost:9090/historial/${id_hist}`, updatedData);
      
      const updatedRows = rows.map((r) => {
        if (r.id === row.id) {
          return { ...r, estado_hist: row.estado_hist };
        }
        return r;
      });
      setRows(updatedRows);
      console.log("Estado Historial actualizado en la API.");
      alert("Se ha modificado los datos del Historial");
    }
    catch (error) {
      console.error("Error al obtener datos del Historial:", error);
      alert("No se pudieron modificar los datos de Historial");
    };
    row.id_consulta_hist = 0; 
    row.id_paciente_hist = 0; 
    row.estado_hist = null; 
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);

  return (
    <Box m="20px">
      <Header title="ACTUALIZAR HISTORIAL" subtitle="Actualizar Historial" />

      <Formik
        onSubmit={handleUpdate} // Utiliza la función para enviar los datos a la API
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID Consulta"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_consulta_hist}
                name="id_consulta_hist"
                error={!!touched.id_consulta_hist && !!errors.id_consulta_hist}
                helperText={touched.id_consulta_hist && errors.id_consulta_hist}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID Paciente"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_paciente_hist}
                name="id_paciente_hist"
                error={!!touched.id_paciente_hist && !!errors.id_paciente_hist}
                helperText={touched.id_paciente_hist && errors.id_paciente_hist}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_hist && !!errors.estado_hist}>
              <InputLabel htmlFor="estadp-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_hist}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_hist"
                  displayEmpty
                  inputProps={{
                    name: 'estado_hist',
                    id: 'estado_hist-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_hist && errors.estado_hist && <FormHelperText>{errors.estado_hist}</FormHelperText>}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Actualizar Historial
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {apiResponse && (
        <Box mt={2}>
          <Typography variant="subtitle1">API Response:</Typography>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </Box>
      )}
      {apiError && (
        <Box mt={2}>
          <Typography variant="subtitle1" color="error">
            API Error: {apiError}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  id_consulta_hist: yup.number().required("required"),
  id_paciente_hist: yup.number().required("required"),
  estado_hist: yup.boolean().required("required"),
});


export default ActHistorial;
