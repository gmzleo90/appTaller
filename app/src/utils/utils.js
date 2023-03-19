
import axios from "axios";

export default class Utils {

    //Standar method to get clients from Api
    static async getClients(event, setClients, setTableTitle, PARTICULAR_CLIENTS_ENDPOINT, GENERAL_CLIENTS_ENDPOINT ) {
        if (event && event.target.innerText === "Cuenta Corriente") {
          setTableTitle("Clientes con Cuenta Corriente");
          return axios.get(PARTICULAR_CLIENTS_ENDPOINT).then((response) => {
            setClients(response.data);
          });
        } else {
          setTableTitle("Clientes Particulares");
         return axios
            .get(GENERAL_CLIENTS_ENDPOINT)
            .then((response) => {
              setClients(response.data);
            })
            .catch((err) => console.log(err));
        }
      }
}
