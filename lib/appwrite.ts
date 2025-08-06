import { CreateUserParams, GetMenuParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "mg.ghost.foodordering",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: process.env.EXPO_PUBLIC_DATABASE_ID!,
    bucketId : "68923eb8001e9891d8dd",
    userCollectionId: "687fd003002b7431d68c",
    categoryCollectionId: "6890fca800066c2394be",
    menuCollectionId: "6890fd2100049d6a988e",
    customizationCollectionId: "6890fe23000e32ac8500",
    menuCustomizationCollectionId: "6890fec4002839f3661e",
}

export const client = new Client();

client.setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
const avatars = new Avatars(client);
export const storage = new Storage(client);

export const SignIn = async ({ email, password }: SignInParams) => {
    try {
        const user = await account.createEmailPasswordSession(email, password);
        if (!user) throw new Error("User not signed in");

        return user;
    } catch (error) {
        throw new Error(error as string);
    }
}

export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name);

        if (!newAccount) throw new Error("Account not created");

        await SignIn({ email, password });

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                name,
                avatar: avatarUrl
            }
        )
    } catch (error) {
        throw new Error(error as string);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) { throw Error };

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        )

        if (!currentUser) { throw Error };
   
        return currentUser.documents[0];
    } catch (error) {
        console.log("🚀 ~ getCurrentUser ~ error:", error)
        throw new Error(error as string);
    }
}

export const getMenu = async ({ category, query} : GetMenuParams) => {
    try {
        const queries : string[] = [];

        if (category) {
          queries.push(Query.equal('categories', category));
        }

        if (query) {
          queries.push(Query.search('name', query));
        }

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries
        )

        return menus.documents;
    } catch (error) {
        throw new Error(error as string);
    }
}


export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoryCollectionId
        )

        return categories.documents;
    } catch (error) {
        throw new Error(error as string);
    }
}