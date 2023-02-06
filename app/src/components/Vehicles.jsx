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
  const VEHICLES_ENDPOINT = "http://localhost:3001/api/vehicles";

  //React States
  const [vehicles, setVehicles] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openVehicleForm, setOpenVehicleForm] = useState(false);
  const [type, setType] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [tableTitle, setTableTitle] = useState("Clientes Particulares");
  //selected rows state
  const [selectedRow, setSelectedRow] = useState([]);
  const DELETE_VEHICLES_ENDPOINT = `http://localhost:3001/api/vehicles-delete?id=${selectedRow.at(
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
      field: "model",
      headerName: "Modelo",
      width: 120,
      editable: true,
    },
    {
      field: "year",
      headerName: "Año",
      width: 120,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Fecha Registro",
      width: 120,
      editable: true,
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
                console.log(resp);
                console.log("selectedRows", selectedRow);
              });
            }}
          >
            <DeleteOutline />
          </IconButton>
        );
      },
    },
  ];
  const rows = vehicles;

  //Aux functions
  function getVehicles(e) {
    setTableTitle("Vehículos registrados");
    axios.get(VEHICLES_ENDPOINT).then((response) => {
      setVehicles(response.data);
    });
  }

  function handleNewVehicle() {
    setOpenVehicleForm(true);
  }

  useEffect(() => {
    getVehicles();
  }, []);

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
              onSelectionModelChange={(rowsId) => setSelectedRow(rowsId)}
            />
          </Box>
        </Grid>
        <NewVehicleForm
          props={{
            openVehicleForm,
            toastAlert,
            getVehicles,
            setOpenVehicleForm,
            setType,
            setAlertMsg,
          }}
        />
      </Grid>
    </>
  );
}
