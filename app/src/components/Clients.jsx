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

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

export default function Clients() {
  //React States
  const [clients, setClients] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openClientForm, setOpenClientForm] = useState(false);
  //const [customerTypeValue, setCustomerTypeValue] = useState(false);
  const [type, setType] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [tableTitle, setTableTitle] = useState("Clientes Particulares");
  //data-table data assign
  const columns = [
    {
      field: "fullName",
      headerName: "Nombre",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "address",
      headerName: "Dirección",
      width: 120,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Teléfono",
      width: 120,
      editable: true,
    },
    {
      field: "dni",
      headerName: "D.N.I",
      width: 120,
      editable: true,
    },
    {
      field: "cuit",
      headerName: "CUIT",
      width: 120,
      editable: true,
    },
    {
      field: "lastUpdate",
      headerName: "Ultima Actualización",
      width: 150,
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
              console.log("delete Pressed");
            }}
          >
            <DeleteOutline />
          </IconButton>
        );
      },
    },
  ];
  const rows = clients;

  //Aux functions
  function getClients(e) {
    let generalCLients = "http://localhost:3001/api/clients/general";
    let particularClients =
      "http://localhost:3001/api/clients/checking-accounts";
    if (e && e.target.innerText === "Cuenta Corriente") {
      setTableTitle("Clientes con Cuenta Corriente");
      axios.get(particularClients).then((response) => {
        setClients(response.data);
      });
    } else {
      setTableTitle("Clientes Particulares");
      axios
        .get(generalCLients)
        .then((response) => {
          setClients(response.data);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleNewClient() {
    setOpenClientForm(true);
  }

  useEffect(() => {
    getClients();
  }, []);

  function ToastAlert() {
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
                  <ListItemButton onClick={handleNewClient}>
                    <ListItemText primary="Nuevo Cliente" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemText primary="Particulares" onClick={getClients} />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemText
                      primary="Cuenta Corriente"
                      onClick={getClients}
                    />
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
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </Grid>
        <NewClientForm
          props={{
            openClientForm,
            ToastAlert,
            getClients,
            setOpenClientForm,
            setType,
            setAlertMsg,
          }}
        />
      </Grid>
    </>
  );
}
