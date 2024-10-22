import {
    Client,
} from 'appwrite';

export const client = new Client()
    .setEndpoint('http://localhost:8000/v1')
    .setProject('671769ea001a3d4a3153');
