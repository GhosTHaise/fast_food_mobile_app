import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "mg.ghost.foodordering",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
     databaseId: process.env.EXPO_PUBLIC_DATABASE_ID!,
    userCollectionId: "687fd003002b7431d68c"
}

export const client = new Client();

client.setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);

export const SignIn = async ({ email, password }: SignInParams) => {
    try {
        const user = await account.createEmailPasswordSession(email, password);
        if(!user) throw new Error("User not signed in");

        return user;
    } catch (error) {
        throw new Error(error as string);
    }
}

export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);

        if(!newAccount) throw new Error("Account not created");

        await SignIn({email, password});

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId : newAccount.$id,
                email,
                name,
                avatar : avatarUrl
            }
        )
    } catch (error) {
         throw new Error(error as string);
    }
}