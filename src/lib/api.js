import axios from 'axios';
import { formatDate, hasTokenExpired } from '../utils/utils';

// Set base URL requests
axios.defaults.baseURL = process.env.REACT_APP_CORS_PROXY + process.env.REACT_APP_API_URL;

// Lumen API account
const config = {
  consumerCode: process.env.REACT_APP_CONSUMER_CODE,
  email: process.env.REACT_APP_API_EMAIL,
  password: process.env.REACT_APP_API_PASSWORD,
};

// Generates API token
const getToken = async () => {
  try {
    const response = await axios.post('/login', config);
    return {
      idToken: response.data.data.idToken,
      time: Date.now(),
    };
  } catch (e) {
    console.error('Error generating token ', e);
  }
};

// Gets results from last 30 days
const getResults = async (userId, token) => {
  if (hasTokenExpired(token.idToken)) {
    const d = new Date();
    const today = d.toLocaleDateString();
    const lastMonth = new Date(d.setMonth(d.getMonth() - 1)).toLocaleDateString();
    try {
      const response = await axios.get(
        `/lumen-measurement?userId=${userId}&fromDate=${formatDate(lastMonth)}&toDate=${formatDate(
          today
        )}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return response;
    } catch (e) {
      console.error('Error getting results', e);
    }
  }
};

export { getToken, getResults };
