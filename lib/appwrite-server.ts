"use server"

import { Client, Account, Users, Teams } from 'node-appwrite';

// const client = new Client()
//     .setEndpoint('http://localhost:8000/v1')
//     .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
//     .setKey(process.env.APPWRITE_SERVER_API_KEY!);


// export const account = new Account(client);
// export const users = new Users(client);
// export const teams = new Teams(client);

// 使用管理员身份执行服务端操作
export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
        .setKey(process.env.APPWRITE_SERVER_API_KEY!)
    
    return {
        get account() {
            return new Account(client)
        },
        get users() {
            return new Users(client)
        },
        get teams() {
            return new Teams(client)
        },
    }
}
