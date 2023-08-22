import { Box, Button, TextField, FormControl,InputLabel ,Select, MenuItem, FormHelperText, Typography   } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [proveedorOptions, setProveedorOptions] = useState([]);
  const [recetaOptions, setRecetaOptions] = useState([]);
   // Función para enviar los datos del formulario a la API
   const handleSubmitApi = async (values) => {
    try {
      // Realiza una solicitud POST a la API con los datos del formulario
      const response = await axios.post("http://localhost:9090/medicinas", values);

      // Maneja la respuesta de la API (opcional)
      setApiResponse(response.data);
      setApiError(null);
    } catch (error) {
      // Maneja los errores de la API (opcional)
      setApiResponse(null);
      setApiError(error.message || "Hubo un error al conectar con la API.");
    }
  };
  useEffect(() => {
    const fetchPatientOptions = async () => {
      try {
        const response = await axios.get("http://localhost:9090/proveedores");
        const data = response.data;
        setProveedorOptions(data);
      } catch (error) {
        console.error("Error fetching proveedores options:", error);
      }
    };
    const fetchRecetaOptions = async () => {
      try {
        const response = await axios.get("http://localhost:9090/recetas");
        const data = response.data;
        setRecetaOptions(data);
      } catch (error) {
        console.error("Error fetching recetas options:", error);
      }
    };
    fetchPatientOptions();
    fetchRecetaOptions(); 
  }, []);
  return (
    <Box m="20px">
      <Header title="CREAR MEDICINA" subtitle="Crear un nuevo Perfil de Medicina" />

      <Formik
        onSubmit={handleSubmitApi} // Utiliza la función para enviar los datos a la API
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
                label="Componentes"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.componentes_medi}
                name="componentes_medi"
                error={!!touched.componentes_medi && !!errors.componentes_medi}
                helperText={touched.componentes_medi && errors.componentes_medi}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.disponibilidad_medi && !!errors.disponibilidad_medi}>
              <InputLabel htmlFor="estadp-select" sx={{ fontSize: 14 }}>Disponibilidad</InputLabel>
                <Select
                  value={values.disponibilidad_medi}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="disponibilidad_medi"
                  displayEmpty
                  inputProps={{
                    name: 'disponibilidad_medi',
                    id: 'disponibilidad_medi-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Disponibilidad
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.disponibilidad_medi && errors.disponibilidad_medi && <FormHelperText>{errors.disponibilidad_medi}</FormHelperText>}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Cantidad"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cantidad_medi}
                name="cantidad_medi"
                error={!!touched.cantidad_medi && !!errors.cantidad_medi}
                helperText={touched.cantidad_medi && errors.cantidad_medi}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_proveedor_medi && !!errors.id_proveedor_medi}
              >
                <InputLabel htmlFor="id_proveedor_medi-select" sx={{ fontSize: 14 }}>
                  ID Proveedor
                </InputLabel>
                <Select
                  value={values.id_proveedor_medi}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_proveedor_medi"
                  displayEmpty
                  inputProps={{
                    name: 'id_proveedor_medi',
                    id: 'id_proveedor_medi-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar ID Paciente
                  </MenuItem>
                  {proveedorOptions.map((proveedor) => (
                    <MenuItem key={proveedor.id_prov} value={proveedor.id_prov}>
                      {proveedor.id_prov} - {proveedor.direccion_prov} 
                    </MenuItem>
                  ))}
                </Select>
                {touched.id_proveedor_medi && errors.id_proveedor_medi && (
                  <FormHelperText>{errors.id_proveedor_medi}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_receta_medi && !!errors.id_receta_medi}
              >
                <InputLabel htmlFor="id_receta_medi-select" sx={{ fontSize: 14 }}>
                  Receta
                </InputLabel>
                <Select
                  value={values.id_receta_medi}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_receta_medi"
                  displayEmpty
                  inputProps={{
                    name: 'id_receta_medi',
                    id: 'id_receta_medi-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar la receta
                  </MenuItem>
                  {recetaOptions.map((receta) => (
                    <MenuItem key={receta.id_rece} value={receta.id_rece}>
                      {receta.id_rece} - {receta.comentarios_rece} 
                    </MenuItem>
                  ))}
                </Select>
                {touched.id_receta_medi && errors.id_receta_medi && (
                  <FormHelperText>{errors.id_receta_medi}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_medi && !!errors.estado_medi}>
              <InputLabel htmlFor="estadp-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_medi}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_medi"
                  displayEmpty
                  inputProps={{
                    name: 'estado_medi',
                    id: 'estado_medi-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_medi && errors.estado_medi && <FormHelperText>{errors.estado_medi}</FormHelperText>}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Crear Nueva Medicina
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
  componentes_medi: yup.string().required("required"),
  disponibilidad_medi: yup.boolean().required("required"),
  cantidad_medi: yup.number().required("required"),
  id_proveedor_medi: yup.number().required("required"),
  id_receta_medi: yup.number().required("required"),
  estado_medi: yup.boolean().required("required"),
});
const initialValues = {
  componentes_medi:"",
  disponibilidad_medi: null,
  cantidad_medi:0,
  id_proveedor_medi:0,
  id_receta_medi: 0,
  estado_medi: null,
};

export default Form;
