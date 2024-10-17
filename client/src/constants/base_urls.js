let apiUrl;

if (process.env.NODE_ENV === 'production')
{
  apiUrl = 'drip-api-mu.vercel.app/api/';
} else
{
  apiUrl = 'http://localhost:5000/api/';
}

export const serverUrl = apiUrl;
