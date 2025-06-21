const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const BASE_URL = isLocalhost 
? 'http://127.0.0.1:8000/api' 
: 'https://techfix.online/api';