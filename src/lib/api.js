import axios from 'axios';
import { formatDate, hasTokenExpired } from '../utils/utils';

// environment variables
const {
  REACT_APP_CORS_PROXY,
  REACT_APP_API_EMAIL,
  REACT_APP_API_URL,
  REACT_APP_API_PASSWORD,
  REACT_APP_CONSUMER_CODE,
} = process.env;

// Set base URL requests
axios.defaults.baseURL = REACT_APP_CORS_PROXY + REACT_APP_API_URL;

// Lumen API account
const config = {
  consumerCode: REACT_APP_CONSUMER_CODE,
  email: REACT_APP_API_EMAIL,
  password: REACT_APP_API_PASSWORD,
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
const getResults = async (token) => {
  if (!hasTokenExpired(token.time)) {
    const d = new Date();
    const today = d.toLocaleDateString();
    const lastMonth = new Date(d.setMonth(d.getMonth() - 1)).toLocaleDateString();
    try {
      const response = await axios.get(
        `/lumen-measurement?userId=${REACT_APP_CONSUMER_CODE}&fromDate=${formatDate(
          lastMonth
        )}&toDate=${formatDate(today)}`,
        {
          headers: {
            authorization: token.idToken,
          },
        }
      );
      return response.data;
    } catch (e) {
      console.error('Error getting results', e);
    }
  }
};

export { getToken, getResults };
