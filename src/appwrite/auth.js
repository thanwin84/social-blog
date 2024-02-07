import conf from '../conf/conf'
import { Client, Account, ID } from "appwrite"

class AuthService {
    client = new Client()
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.projectId)
        this.account = new Account(this.client)
        
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount){
                // call another method
                return this.login({email, password})
            }
            else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }


    async login({email, password}){
        try {
            const response = await this.account.createEmailSession(email, password)
            return response
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        
        try {
            return await this.account.get()
        } catch (error) {
            console.log("appwrite service:: getCurrentUser :: error", error)
            
        }
        return null
    }

    async logout(){
        
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService()

export default authService

