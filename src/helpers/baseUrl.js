const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const BASE_URL = isLocalhost 
? 'http://127.0.0.1:8000/api' 
: 'http://192.168.100.13:8000/api'; // dito ip add ng laptop para ma-access backend sa ibang device
                                    // php artisan serve --host=0.0.0.0 --port=8000 ito command sa backend