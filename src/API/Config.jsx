const Config = {
  API_BASE_URL: 'https://masterapi.virtualfilaments.com/api',
  getToken: () => {
    const sessiondata = sessionStorage.getItem('logindata');
    const parsedSessionData = sessiondata ? JSON.parse(sessiondata) : null;
    const token = parsedSessionData ? parsedSessionData.token : null;
    return token;
  },
  getId: () => {
    const sessiondata = sessionStorage.getItem('logindata');
    const parsedSessionData = sessiondata ? JSON.parse(sessiondata) : null;
    const Id = parsedSessionData ? parsedSessionData.Id : null;
    return Id;
  },
};

export default Config;
