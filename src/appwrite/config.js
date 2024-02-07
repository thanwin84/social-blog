import { Client, Databases, ID, Storage, Query } from "appwrite"
import conf from "../conf/conf";

class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.projectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featureImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async updatePost(slug, {title,  content, featureImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status
                }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug

            )
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
        } catch (error) {
            console.log(error)
        }
    }

    async getPosts(queries= [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                queries
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error)
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.bucketId,
                fileId
            )
        } catch (error) {
            console.log(error)
        }
    }

    async getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.bucketId,
                fileId
            )
        } catch (error) {
            console.log(error)
        }
    }
}

const service = new Service()

export default service