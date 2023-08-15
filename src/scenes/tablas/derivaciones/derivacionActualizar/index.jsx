import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography   } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ActDerivacion = () => {
  const {
    id_deri, 
    descripcion_deri,
    id_usuario_deri,
    id_med_deri,
    fecha_deri,
    estado_deri,
  } = useParams(); 
  const [rows, setRows] = useState([]);
  const initialValues = {

    id_usuario_deri: id_usuario_deri,
    descripcion_deri: descripcion_deri,
    fecha_deri: fecha_deri,
    id_med_deri: id_med_deri,
    estado_deri: estado_deri,


  };
  const handleUpdate = async (row) => {
    
    // Invert the estado_pac value when the button is clicked
    
    //const navigate = useNavigate();

    // Prepare the data object to be sent in the PUT request
    const updatedData = {
      id_usuario_deri: row.id_usuario_deri,
      descripcion_deri: row.descripcion_deri,
      fecha_deri: row.fecha_deri,
      id_med_deri: row.id_med_deri,
      estado_deri: row.estado_deri,
     
    };
    console.log(descripcion_deri); 
    // Send the updated data to the API using the PUT method

   
    try {

      await axios.put(`http://localhost:9090/derivaciones/${id_deri}`, updatedData);
      const updatedRows = rows.map((r) => {
        if (r.id === row.id) {
          return { ...r, estado_deri: row.estado_deri };
        }
        return r;
      });
      setRows(updatedRows);
      console.log("Estado Derivacion actualizado en la API.");
      alert("Se ha modificado los datos del Derivacion");
    }
    catch (error) {
      console.error("Error al obtener datos del Derivacion:", error);
      alert("No se pudieron modificar los datos de Derivacion");
    };
    row.id_usuario_deri = 0;
    row.descripcion_deri = "";
    row.fecha_deri = "";
    row.id_med_deri = 0;
    row.estado_deri = null;
  };


  const isNonMobile = useMediaQuery("(min-width:600px)");
  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);

   // Función para enviar los datos del formulario a la API
   const handleSubmitApi = async (values) => {
    try {
      // Realiza una solicitud POST a la API con los datos del formulario
      const response = await axios.post("http://localhost:9090/derivaciones", values);

      // Maneja la respuesta de la API (opcional)
      setApiResponse(response.data);
      setApiError(null);
    } catch (error) {
      // Maneja los errores de la API (opcional)
      setApiResponse(null);
      setApiError(error.message || "Hubo un error al conectar con la API.");
    }
  };

  return (
    <Box m="20px">
      <Header title="ACTUALIZAR DERIVACIÓN" subtitle="Actualizar derivacion" />

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
                label="ID Usuario"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_usuario_deri}
                name="id_usuario_deri"
                error={!!touched.id_usuario_deri && !!errors.id_usuario_deri}
                helperText={touched.id_usuario_deri && errors.id_usuario_deri}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="ID Medico"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_med_deri}
                name="id_med_deri"
                error={!!touched.id_med_deri && !!errors.id_med_deri}
                helperText={touched.id_med_deri && errors.id_med_deri}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Fecha"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fecha_deri}
                name="fecha_deri"
                error={!!touched.fecha_deri && !!errors.fecha_deri}
                helperText={touched.fecha_deri && errors.fecha_deri}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_deri && !!errors.estado_deri}>
              <InputLabel htmlFor="sexo_pac-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_deri}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_deri"
                  displayEmpty
                  inputProps={{
                    name: 'estado_deri',
                    id: 'estado_deri-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_deri && errors.estado_deri && <FormHelperText>{errors.estado_deri}</FormHelperText>}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Descripcion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.descripcion_deri}
                name="descripcion_deri"
                error={!!touched.descripcion_deri && !!errors.descripcion_deri}
                helperText={touched.descripcion_deri && errors.descripcion_deri}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Actualizar Derivacion
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
  id_usuario_deri: yup.string().required("required"),
  descripcion_deri: yup.string().required("required"),
  fecha_deri: yup.date().required("required"),
  id_med_deri: yup.number().required("required"),
  estado_deri: yup.boolean().required("required"),
});
const initialValues = {
  id_usuario_deri:"",
  descripcion_deri: "",
  fecha_deri:"",
  id_med_deri:0,
  estado_deri: null,


};

export default ActDerivacion;