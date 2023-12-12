let apiUrl;

if (process.env.NODE_ENV === 'production') {
  apiUrl = 'https://pinky-api.onrender.com/api/';
} else {
  apiUrl = 'http://localhost:4000/api/';
}

export const serverUrl = apiUrl;
