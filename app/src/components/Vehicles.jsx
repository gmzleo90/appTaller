import { React, useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import {
  Alert,
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import axios from "axios";
import NewClientForm from "./NewClientForm";
import NewVehicleForm from "./NewVehicleForm";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

export default function Clients() {
  const VEHICLES_ENDPOINT = "https://app-taller-api.vercel.app/api/vehicles";
  //const GET_ALL_CUSTOMERS_ENDPOINT = "https://app-taller-api.vercel.app/api/all-customers";

  //React States
  const [vehicles, setVehicles] = useState([]);
 // const [rows, setRows] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openVehicleForm, setOpenVehicleForm] = useState(false);
  const [type, setType] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [tableTitle, setTableTitle] = useState("Clientes Particulares");
  const [openClientForm, setOpenClientForm] = useState(false);
  //selected rows state
  const [selectedRow, setSelectedRow] = useState([]);
  const DELETE_VEHICLES_ENDPOINT = `https://app-taller-api.vercel.app/api/vehicles-delete?id=${selectedRow.at(
    0
  )}`;
  //data-table data assign
  const columns = [
    {
      field: "domain",
      headerName: "Dominio",
      sortable: false,
      width: 120,
    },
    {
      field: "customer",
      headerName: "Propietario",
      width: 160,
    },
    {
      field: "brand",
      headerName: "Marca",
      width: 120,
    },
    {
      field: "model",
      headerName: "Modelo",
      width: 120,
    },
    {
      field: "year",
      headerName: "Año",
      width: 120,
    },
    {
      field: "createdAt",
      headerName: "Fecha Registro",
      width: 120,
    },

    {
      field: "delete",
      width: 75,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return (
          <IconButton
            onClick={() => {
              axios.delete(DELETE_VEHICLES_ENDPOINT).then((resp) => {
                getVehicles();
              });
            }}
          >
            <DeleteOutline />
          </IconButton>
        );
      },
    },
  ];
  //Aux functions
  function getVehicles() {
    setTableTitle("Vehículos registrados");
    axios.get(VEHICLES_ENDPOINT).then((response) => {
      setVehicles(response.data);
    });
    
  } 

 const rows = vehicles.map( (resp) => {
     return {
      id: resp.id,
      domain: resp.domain,
      model: resp.model,
      year: resp.year,
      customer:  resp.Customer ? `${resp.Customer.firstName} ${resp.Customer.lastName} ` : "No propietario",
      brand: resp.Brand.brandName,
      createdAt: resp.createdAt,
     }})

  

  function handleNewVehicle() {
    getVehicles()
    setOpenVehicleForm(true);
  }

  function handleNeClient() {
    setOpenVehicleForm(false);
    setOpenClientForm(true);
  }

  useEffect(() => {
    getVehicles();
  }, [openVehicleForm]);

  function toastAlert() {
    setOpenAlert(true);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  return (
    <>
      <Snackbar open={openAlert} autoHideDuration={4500} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={type ? type : "warning"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
      <Grid container spacing={2}>
        <Grid xs={2} item={true}>
          <Box
            border={0}
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            <nav aria-label="main">
              <List>
                <ListItem>
                  <ListItemButton onClick={handleNewVehicle}>
                    <ListItemText primary="Ingresar Vehículo" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={handleNeClient}>
                    <ListItemText primary="Ingresar Propietario" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </Box>
        </Grid>
        <Grid xs={8} item={true}>
          <Box sx={{ width: "100%", height: "80vh", border: "hidden" }}>
            <Typography variant="h5" color="initial" align="center">
              {tableTitle}
            </Typography>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              experimentalFeatures={{ newEditingApi: true }}
              onSelectionModelChange={(rowsId) => setSelectedRow(rowsId)
            }
            />
          </Box>
        </Grid>
        <NewVehicleForm
          props={{
            openClientForm,
            openVehicleForm,
            toastAlert,
            getVehicles,
            setOpenVehicleForm,
            setOpenClientForm,
            setType,
            setAlertMsg,
          }}
        />
        <NewClientForm
          props={{
            openClientForm,
            toastAlert,
            setOpenClientForm,
            setType,
            setAlertMsg,
          }}
        />
      </Grid>
    </>
  );
}
