import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState , useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ActMedicina = () => {

  const {
    id_medi,
    componentes_medi,
    disponibilidad_medi,
    cantidad_medi,
    id_proveedor_medi,
    id_receta_medi,
    estado_medi,


  } = useParams();
  const [rows, setRows] = useState([]);
  const [proveedorOptions, setProveedorOptions] = useState([]);
  const [recetaOptions, setRecetaOptions] = useState([]);
  const initialValues = {
    componentes_medi: componentes_medi,
    disponibilidad_medi: disponibilidad_medi,
    cantidad_medi: cantidad_medi,
    id_proveedor_medi: id_proveedor_medi,
    id_receta_medi: id_receta_medi,
    estado_medi: estado_medi,
  };
  useEffect(() => {
    const fetchPatientOptions = async () => {
      try {
        const response = await axios.get("https://cloud-service-leonardo13344.cloud.okteto.net/proveedores");
        const data = response.data;
        setProveedorOptions(data);
      } catch (error) {
        console.error("Error fetching proveedores options:", error);
      }
    };
    const fetchRecetaOptions = async () => {
      try {
        const response = await axios.get("https://cloud-service-leonardo13344.cloud.okteto.net/recetas");
        const data = response.data;
        setRecetaOptions(data);
      } catch (error) {
        console.error("Error fetching recetas options:", error);
      }
    };
    fetchPatientOptions();
    fetchRecetaOptions(); 
  }, []);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const handleUpdate = async (row) => {

    // Invert the estado_pac value when the button is clicked

    //const navigate = useNavigate();

    // Prepare the data object to be sent in the PUT request
    const updatedData = {

      componentes_medi: row.componentes_medi,
      disponibilidad_medi: row.disponibilidad_medi,
      cantidad_medi: row.cantidad_medi,
      id_proveedor_medi: row.id_proveedor_medi,
      id_receta_medi: row.id_receta_medi,
      estado_medi: row.estado_medi,

    };

    // Send the updated data to the API using the PUT method


    try {

      await axios.put(`https://cloud-service-leonardo13344.cloud.okteto.net/medicinas/${id_medi}`, updatedData);
      const updatedRows = rows.map((r) => {
        if (r.id === row.id) {
          return { ...r, estado_medi: row.estado_medi };
        }
        return r;
      });
      setRows(updatedRows);
      console.log("Estado Medicina actualizado en la API.");
      alert("Se ha modificado los datos del Medicina");
    }
    catch (error) {
      console.error("Error al obtener datos del Medicina:", error);
      alert("No se pudieron modificar los datos de Medicina");
    };
    row.componentes_medi= "";
    row.disponibilidad_medi= null; 
    row.cantidad_medi= 0; 
    row.id_proveedor_medi= 0;
    row.id_receta_medi= 0;
    row.estado_medi= null; 
  };
  // Función para enviar los datos del formulario a la API
  const handleSubmitApi = async (values) => {
    try {
      // Realiza una solicitud POST a la API con los datos del formulario
      const response = await axios.post("https://cloud-service-leonardo13344.cloud.okteto.net/medicinas", values);

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
      <Header title="ACTUALIZAR MEDICINA" subtitle="Actualizar Perfil de Medicina" />

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
                  <MenuItem value="true" >Activo</MenuItem>
                  <MenuItem value="false">Inactivo</MenuItem>
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
                  <MenuItem value="true" >Activo</MenuItem>
                  <MenuItem value="false">Inactivo</MenuItem>
                </Select>
                {touched.estado_medi && errors.estado_medi && <FormHelperText>{errors.estado_medi}</FormHelperText>}
              </FormControl>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Actualizar Medicina
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
  componentes_medi: "",
  disponibilidad_medi: null,
  cantidad_medi: 0,
  id_proveedor_medi: 0,
  id_receta_medi: 0,
  estado_medi: null,
};

export default ActMedicina;
