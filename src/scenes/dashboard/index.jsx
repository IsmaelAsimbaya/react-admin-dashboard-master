import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import BoyIcon from '@mui/icons-material/Boy';
import BiotechIcon from '@mui/icons-material/Biotech';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import HotelIcon from '@mui/icons-material/Hotel';


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="15px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD - HOSPITAL DEL IESS QUITO SUR" subtitle="Welcome to your dashboard" />

        
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,361"
            subtitle="Camas"
            progress="0.75"
            increase="+14%"
            icon={
              <HotelIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="455"
            subtitle="Pacientes"
            progress="0.50"
            increase="+21%"
            icon={
              <BoyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="6"
            subtitle="Laboratorios"
            progress="0.30"
            increase="+5%"
            icon={
              <BiotechIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="2,134"
            subtitle="Stock Medicinas"
            progress="0.80"
            increase="+43%"
            icon={
              <MedicationLiquidIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          display="flex" justifyContent="center" alignItems="center"
        >
          <img
            alt="hospital-pic"
            width="900px"
            height="450px"
            src={`../../assets/hospital.jpg`}
            style={{ cursor: "pointer" }}
          />
        </Box>
        
      </Box>
    </Box>
  );
};

export default Dashboard;
