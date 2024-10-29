import { Client, Account, Storage } from 'appwrite';

const client = new Client()
    .setEndpoint('http://localhost:8000/v1')
    .setProject('671769ea001a3d4a3153');

// 创建单例实例
export const account = new Account(client);
export const storage = new Storage(client);

// 存储桶 ID 常量
export const BUCKETS_IDS = {
    AVATARS: 'user_avatars'
} as const;
