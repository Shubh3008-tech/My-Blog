import { Client, Databases, Storage, Query, ID, Permission, Role } from "appwrite";
import config from "./config";

export class DbService {
    client = new Client();
    databases;
    bucket; // storage

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Post methods
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug, // Use slug as document ID
                {
                    title,
                    slug, // Required attribute fix
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.error("Appwrite service :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
            return true; // Return true on success
        } catch (error) {
            console.error("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.error("Appwrite service :: getPost :: error", error);
            return null;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.error("Appwrite service :: getPosts :: error", error);
            return null;
        }
    }

    // --- THIS IS THE NEW FUNCTION ---
    async getUserPosts(userId) {
        try {
            // Query for posts where the 'userId' attribute matches
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [Query.equal("userId", userId)]
            );
        } catch (error) {
            console.error("Appwrite service :: getUserPosts :: error", error);
            return null;
        }
    }
    // --- END OF NEW FUNCTION ---

    // File (Storage) methods
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
                [Permission.read(Role.any())] // Public file fix
            );
        } catch (error) {
            console.error("Appwrite service :: uploadFile :: error", error);
            return null;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(config.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.error("Appwrite service :: deleteFile :: error", error);
            return false; // Prevent crash fix
        }
    }

    getFileView(fileId) { // Free plan fix (was getFilePreview)
        try {
             return this.bucket.getFileView(config.appwriteBucketId, fileId);
        } catch (error) {
            console.error("Appwrite service :: getFileView :: error", error);
            return null;
        }
    }
}

const dbService = new DbService();
export default dbService;