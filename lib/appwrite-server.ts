// 使用 Appwrite Server SDK 访问敏感 API, 此配置仅在 node 服务器端运行

import { Client, Users, Teams } from 'node-appwrite';

const client = new Client()
    .setEndpoint('http://localhost:8000/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_SERVER_API_KEY!);

export const users = new Users(client);
export const teams = new Teams(client);
