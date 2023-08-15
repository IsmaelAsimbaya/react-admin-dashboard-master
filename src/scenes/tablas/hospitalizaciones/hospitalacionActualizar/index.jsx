import { Box, Button, TextField, FormControl, Select, MenuItem, FormHelperText, Typography  , InputLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ActHospitalizacion = () => {

  const {
    id_hosp, 
    fecha_inic_hosp,
    fecha_fin_hosp,
    personal_encarg_hosp,
    descripcion_hosp,
    estado_hosp,
  } = useParams(); 
  const [rows, setRows] = useState([]);
  const initialValues = {

    fecha_inic_hosp: fecha_inic_hosp,
    fecha_fin_hosp: fecha_fin_hosp,
    personal_encarg_hosp: personal_encarg_hosp,
    descripcion_hosp: descripcion_hosp,
    estado_hosp: estado_hosp,
  };

  const handleUpdate = async (row) => {
    
    // Invert the estado_pac value when the button is clicked
    
    //const navigate = useNavigate();

    // Prepare the data object to be sent in the PUT request
    const updatedData = {
      
      fecha_inic_hosp: row.fecha_inic_hosp,
      fecha_fin_hosp: row.fecha_fin_hosp,
      personal_encarg_hosp: row.personal_encarg_hosp,
      descripcion_hosp: row.descripcion_hosp,
      estado_hosp: row.estado_hosp,
     
    };

    // Send the updated data to the API using the PUT method

   
    try {

      await axios.put(`http://localhost:9090/hospitalizaciones/${id_hosp}`, updatedData);
      const updatedRows = rows.map((r) => {
        if (r.id === row.id) {
          return { ...r, estado_hosp: row.estado_hosp };
        }
        return r;
      });
      setRows(updatedRows);
      console.log("Estado Hospitalizacion actualizado en la API.");
      alert("Se ha modificado los datos del Hospitalizacion");
    }
    catch (error) {
      console.error("Error al obtener datos del Hospitalizacion:", error);
      alert("No se pudieron modificar los datos de Hospitalizacion");
    };
    row.fecha_inic_hosp="";
    row.fecha_fin_hosp= "";
    row.personal_encarg_hosp=0;
    row.descripcion_hosp="";
    row.estado_hosp= null;
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);

   // Función para enviar los datos del formulario a la API

  return (
    <Box m="20px">
      <Header title="ACTUALIZAR HOSPITALIZACIÓN" subtitle="Actualizar perfil de Hospitalizacion" />

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
                type="date"
                label="Fecha de Inicio"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fecha_inic_hosp}
                name="fecha_inic_hosp"
                error={!!touched.fecha_inic_hosp && !!errors.fecha_inic_hosp}
                helperText={touched.fecha_inic_hosp && errors.fecha_inic_hosp}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Fecha de Fin"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fecha_fin_hosp}
                name="fecha_fin_hosp"
                error={!!touched.fecha_fin_hosp && !!errors.fecha_fin_hosp}
                helperText={touched.fecha_fin_hosp && errors.fecha_fin_hosp}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Personal Encargado"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.personal_encarg_hosp}
                name="personal_encarg_hosp"
                error={!!touched.personal_encarg_hosp && !!errors.personal_encarg_hosp}
                helperText={touched.personal_encarg_hosp && errors.personal_encarg_hosp}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_hosp && !!errors.estado_hosp}>
              <InputLabel htmlFor="estadp-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_hosp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_hosp"
                  displayEmpty
                  inputProps={{
                    name: 'estado_hosp',
                    id: 'estado_hosp-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_hosp && errors.estado_hosp && <FormHelperText>{errors.estado_hosp}</FormHelperText>}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Descripcion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.descripcion_hosp}
                name="descripcion_hosp"
                error={!!touched.descripcion_hosp && !!errors.descripcion_hosp}
                helperText={touched.descripcion_hosp && errors.descripcion_hosp}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
              Actualizar Hospitalizacion
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
  fecha_inic_hosp: yup.date().required("required"),
  fecha_fin_hosp: yup.date().required("required"),
  personal_encarg_hosp: yup.number().required("required"),
  descripcion_hosp: yup.string().required("required"),
  estado_hosp: yup.boolean().required("required"),
});
const initialValues = {
  fecha_inic_hosp:"",
  fecha_fin_hosp: "",
  personal_encarg_hosp:0,
  descripcion_hosp:"",
  estado_hosp: null,
};

export default ActHospitalizacion;
