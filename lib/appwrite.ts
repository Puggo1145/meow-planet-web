import { Client, Account, Storage, Teams, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint('http://localhost:8000/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

// 创建单例实例
export const account = new Account(client);
export const storage = new Storage(client);
export const teams = new Teams(client);
export const databases = new Databases(client);

// Storage Bucket ID 常量
export const BUCKETS_IDS = {
    AVATARS: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID_AVATARS!,
    CATS: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID_CATS!,
} as const;

// 用户角色常量
export const TEAM_IDS = {
    ADMINS: 'ADMINS',
} as const;

// Database IDs 常量
export const DATABASES_IDS = {
    MAIN: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID_MAIN!,
    COLLECTIONS: {
        CATS: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CATS!,
        CAT_IMAGES: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_CAT_IMAGES!,
    }
} as const;
