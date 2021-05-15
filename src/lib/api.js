import axios from 'axios';

axios.create({
  baseURL: process.env.API_URL,
});

// Generates API token
const getToken = async (body) => {
  try {
    const response = await axios.post('/login', body);
    return {
      token: response.data.idToken,
      time: Date.now(),
    };
  } catch (e) {
    console.error('Error generating token ', e);
  }
};

// Gets results from last 30 days
const getResults = async (userId, auth) => {
  const d = new Date();
  const today = d.toLocaleDateString();
  const lastMonth = d.setMonth(d.getMonth() - 1).toLocaleDateString();

  try {
    const response = await axios.get(
      `/lumen-measurement?userId=${userId}&fromDate=${lastMonth}&toDate=${today}`,
      {
        headers: {
          authorization: auth,
        },
      }
    );
    return response;
  } catch (e) {
    console.error('Error getting results', e);
  }
};

export { getToken, getResults };
