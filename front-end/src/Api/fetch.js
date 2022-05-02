export const fetchMyApi = (url) => fetch(`localhost:3001${url}`).then((response) => response.json());
