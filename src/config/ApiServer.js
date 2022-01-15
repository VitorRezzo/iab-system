
import axios from "axios";


     const ApiServer = axios.create({
            baseURL: 'http://192.168.100.8:3010/api',     
          });
  
export default ApiServer;