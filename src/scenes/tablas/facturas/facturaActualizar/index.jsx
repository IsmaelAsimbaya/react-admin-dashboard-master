import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText, Typography   } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../../components/Header";
import { useState , useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ActFactura = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // State para manejar el estado de la respuesta de la API
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [patientOptions, setPatientOptions] = useState([]);
  const [recetaOptions, setRecetaOptions] = useState([]);
  const {
    id_fact, 
    fecha_emision_fact,
    paciente_fact,
    descripcion_fact,
    monto_fact,
    metodo_pago_fact,
    id_receta_fact,
    estado_fact,
  } = useParams(); 
  console.log(fecha_emision_fact); 
  const [rows, setRows] = useState([]);

  const initialValues = {
    fecha_emision_fact:fecha_emision_fact,
    paciente_fact:paciente_fact,
    descripcion_fact:descripcion_fact,
    monto_fact:monto_fact,
    metodo_pago_fact:metodo_pago_fact,
    id_receta_fact:id_receta_fact,
    estado_fact:estado_fact,
  };
  useEffect(() => {
    const fetchPatientOptions = async () => {
      try {
        const response = await axios.get("http://localhost:9090/pacientes");
        const data = response.data;
        setPatientOptions(data);
      } catch (error) {
        console.error("Error fetching patient options:", error);
      }
    };
    const fetchRecetaOptions = async () => {
      try {
        const response = await axios.get("http://localhost:9090/recetas");
        const data = response.data;
        setRecetaOptions(data);
      } catch (error) {
        console.error("Error fetching medicos options:", error);
      }
    };
    fetchRecetaOptions();
    fetchPatientOptions();
  }, []);
  const handleUpdate = async (row) => {
    
    // Invert the estado_pac value when the button is clicked
    
    //const navigate = useNavigate();

    // Prepare the data object to be sent in the PUT request
    const updatedData = {
      
      fecha_emision_fact: row.fecha_emision_fact,
      paciente_fact: row.paciente_fact,
      descripcion_fact: row.descripcion_fact,
      monto_fact: row.monto_fact,
      metodo_pago_fact: row.metodo_pago_fact,
      id_receta_fact: row.id_receta_fact,
      estado_fact: row.estado_fact,
     
    };

    // Send the updated data to the API using the PUT method

   
    try {

      await axios.put(`http://localhost:9090/facturas/${id_fact}`, updatedData);
      const updatedRows = rows.map((r) => {
        if (r.id === row.id) {
          return { ...r, estado_fact: row.estado_fact };
        }
        return r;
      });
      setRows(updatedRows);
      console.log("Estado Factura actualizado en la API.");
      alert("Se ha modificado los datos del PacienFacturate");
    }
    catch (error) {
      console.error("Error al obtener datos del Factura:", error);
      alert("No se pudieron modificar los datos de Factura");
    };
    row.paciente_fact= "";
    row.descripcion_fact="";
    row.monto_fact="";
    row.metodo_pago_fact= "";
    row.id_receta_fact= 0;
    row.fecha_emision_fact="";
    row.estado_fact= null;
  };


  return (
    <Box m="20px">
      <Header title="ACTUALIZAR FACTURA" subtitle="Actualizar Factura" />

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
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.paciente_fact && !!errors.paciente_fact}
              >
                <InputLabel htmlFor="paciente_fact-select" sx={{ fontSize: 14 }}>
                  Paciente
                </InputLabel>
                <Select
                  value={values.paciente_fact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="paciente_fact"
                  displayEmpty
                  inputProps={{
                    name: 'paciente_fact',
                    id: 'paciente_fact-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar ID Paciente
                  </MenuItem>
                  {patientOptions.map((patient) => (
                    <MenuItem key={patient.id_pac} value={patient.id_pac}>
                      {patient.id_pac} - {patient.nombre_pac} {patient.apellido_paterno_pac}
                    </MenuItem>
                  ))}
                </Select>
                {touched.paciente_fact && errors.paciente_fact && (
                  <FormHelperText>{errors.paciente_fact}</FormHelperText>
                )}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Fecha de Emision"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fecha_emision_fact}
                name="fecha_emision_fact"
                error={!!touched.fecha_emision_fact && !!errors.fecha_emision_fact}
                helperText={touched.fecha_emision_fact && errors.fecha_emision_fact}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Monto"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.monto_fact}
                name="monto_fact"
                error={!!touched.monto_fact && !!errors.monto_fact}
                helperText={touched.monto_fact && errors.monto_fact}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.metodo_pago_fact && !!errors.metodo_pago_fact}>
              <InputLabel htmlFor="estadp-select" sx={{ fontSize: 14 }}>Método de Pago</InputLabel>
                <Select
                  value={values.metodo_pago_fact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="metodo_pago_fact"
                  displayEmpty
                  inputProps={{
                    name: 'metodo_pago_fact',
                    id: 'metodo_pago_fact-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Metodo Pago
                  </MenuItem>
                  <MenuItem value= "1" >Credito</MenuItem>
                  <MenuItem value= "2">Efectivo</MenuItem>
                </Select>
                {touched.metodo_pago_fact && errors.metodo_pago_fact && <FormHelperText>{errors.metodo_pago_fact}</FormHelperText>}
              </FormControl>
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                error={!!touched.id_receta_fact && !!errors.id_receta_fact}
              >
                <InputLabel htmlFor="id_receta_fact-select" sx={{ fontSize: 14 }}>
                  Receta
                </InputLabel>
                <Select
                  value={values.id_receta_fact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="id_receta_fact"
                  displayEmpty
                  inputProps={{
                    name: 'id_receta_fact',
                    id: 'id_receta_fact-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Seleccionar receta
                  </MenuItem>
                  {recetaOptions.map((receta) => (
                    <MenuItem key={receta.id_rece} value={receta.id_rece}>
                      {receta.id_rece} - {receta.comentarios_rece} - Administracion: {receta.via_administracion_rece} 
                    </MenuItem>
                  ))}
                </Select>
                {touched.id_receta_fact && errors.id_receta_fact && (
                  <FormHelperText>{errors.id_receta_fact}</FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }} error={!!touched.estado_fact && !!errors.estado_fact}>
              <InputLabel htmlFor="estadp-select" sx={{ fontSize: 14 }}>Estado</InputLabel>
                <Select
                  value={values.estado_fact}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="estado_fact"
                  displayEmpty
                  inputProps={{
                    name: 'estado_fact',
                    id: 'estado_fact-select',
                  }}
                >
                  <MenuItem value="" disabled>
                    Estado
                  </MenuItem>
                  <MenuItem value= "true" >Activo</MenuItem>
                  <MenuItem value= "false">Inactivo</MenuItem>
                </Select>
                {touched.estado_fact && errors.estado_fact && <FormHelperText>{errors.estado_fact}</FormHelperText>}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Descripcion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.descripcion_fact}
                name="descripcion_fact"
                error={!!touched.descripcion_fact && !!errors.descripcion_fact}
                helperText={touched.descripcion_fact && errors.descripcion_fact}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                ACtualizar Factura
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
  fecha_emision_fact: yup.date().required("required"),
  paciente_fact: yup.string().required("required"),
  descripcion_fact: yup.string().required("required"),
  monto_fact: yup.string().required("required"),
  metodo_pago_fact: yup.string().required("required"),
  id_receta_fact: yup.number().required("required"),
  estado_fact: yup.boolean().required("required"),
});
const initialValues = {
  fecha_emision_fact:"",
  paciente_fact: "",
  descripcion_fact:"",
  monto_fact:"",
  metodo_pago_fact: "",
  id_receta_fact: 0,
  estado_fact: null,


};

export default ActFactura;
