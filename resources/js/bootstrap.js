import axios from 'axios';
import endpoints from './plugins/endpoints.js';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
