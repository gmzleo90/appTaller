//imports
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

export default function Clients() {
    
  //React States
  const [type, setType] = useState("");
  const [clients, setClients] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [openClientForm, setOpenClientForm] = useState(false);
  const [tableTitle, setTableTitle] = useState("Clientes Particulares");
  
 //Constant ENDPOINTS
  const GENERAL_CLIENTS_ENDPOINT = "https://app-taller-api.vercel.app/api/clients/general";
  const PARTICULAR_CLIENTS_ENDPOINT = "https://app-taller-api.vercel.app/api/clients/checking-accounts";
  const DELETE_CLIENTS_ENDPOINT = `https://app-taller-api.vercel.app/api/clients-delete?id=${selectedRow.at(0)}`;
  
  //data-table columns setup
  const columns = [
    {
      field: "id",
      headerName: "Nro. Cliente",
      width: 120,
    },
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
      field: "phone",
      headerName: "Teléfono",
      width: 120,
    },
    {
      field: "address",
      headerName: "Dirección",
      width: 120,
    },
    {
      field: "cuit",
      headerName: "CUIT",
      width: 120,
    },
    {
      field: "dni",
      headerName: "D.N.I",
      width: 120,
    },

    // {
    //   field: "lastUpdate",
    //   headerName: "Ultima Actualización",
    //   width: 150,
    // },

    {
      field: "delete",
      width: 130,
      sortable: false,
      disableColumnMenu: true,
      renderHeader: () => {
        return (
          <IconButton
            onClick={() => {
              axios.delete(DELETE_CLIENTS_ENDPOINT).then((resp) => {
                getClients();
                console.log(resp);
                console.log("selectedRows", selectedRow);
              });
            }}
          >
            <DeleteOutline />
            <span>Borrar</span>
          </IconButton>
        );
      },
    },
  ];
  const rows = clients;

  //Aux functions
  function getClients(e) {
    if (e && e.target.innerText === "Cuenta Corriente") {
      setTableTitle("Clientes con Cuenta Corriente");
      axios.get(PARTICULAR_CLIENTS_ENDPOINT).then((response) => {
        setClients(response.data);
        console.log('PARTICULAR_CLIENTS_ENDPOINT-->',response);
      });
    } else {
      setTableTitle("Clientes Particulares");
      axios
        .get(GENERAL_CLIENTS_ENDPOINT)
        .then((response) => {
          setClients(response.data);
          console.log('GENERAL_CLIENTS_ENDPOINT-->',response);
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
                  <ListItemButton onClick={handleNewClient}>
                    <ListItemText primary="Nuevo Cliente" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemText
                      primary="Particulares"
                      onClick={(e) =>
                        getClients(
                          e,
                          setTableTitle,
                          setClients,
                          PARTICULAR_CLIENTS_ENDPOINT,
                          GENERAL_CLIENTS_ENDPOINT
                        )
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <ListItemText
                      primary="Cuenta Corriente"
                      onClick={(e) =>
                        getClients(
                          e,
                          setTableTitle,
                          setClients,
                          PARTICULAR_CLIENTS_ENDPOINT,
                          GENERAL_CLIENTS_ENDPOINT
                        )
                      }
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
              experimentalFeatures={{ newEditingApi: true }}
              onSelectionModelChange={(rowsId) => setSelectedRow(rowsId)}
            />
          </Box>
        </Grid>
        <NewClientForm
          props={{
            openClientForm,
            toastAlert,
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
