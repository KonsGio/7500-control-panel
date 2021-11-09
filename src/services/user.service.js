import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://10.0.9.122:8888/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL +'api/v1/panel/status',{ headers: authHeader() });
  }

  // getUserBoard() {
  //   return axios.get(API_URL + 'user', { headers: authHeader() });
  // }

  // getModeratorBoard() {
  //   return axios.get(API_URL + 'mod', { headers: authHeader() });
  // }

  // getAdminBoard() {
  //   return axios.get(API_URL + 'admin', { headers: authHeader() });
  // }
}

export default new UserService();
