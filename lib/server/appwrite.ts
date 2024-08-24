"use server";
import { Client, Account, Databases, Query, ID, Avatars } from "node-appwrite";
import { cookies } from "next/headers";
import { Iuser, StartupDetail, StartupDetailResponse, INewUser } from "../types/types";


export async function createUserAccount(user: INewUser) {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    try {
        const { account } = await createAdminClient();

        const isUserExist = await getUserfromDB({
            email: user.email
        })
        // console.log(user, isUserExist)
        if (isUserExist) {
            return {
                success: false,
                message: "User already exist",
            }
        }
        console.log("user", ID.unique(),
            user.email,
            user.password,
            user.name)
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        console.log("newAccount", newAccount)
        if (!newAccount) {
            console.log("error")
        }
        const avatars = new Avatars(client);

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            userId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
        });
        console.log(newUser)

        const session = await account.createEmailPasswordSession(user.email, user.password);
        cookies().set("my-custom-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        await sentEmailVerification()
        return {
            success: true,
            message: "User created successfully, verification email is sent successfully",
            data: newUser,
            session
        };
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getUserfromDB(user: {
    email: string;
}) {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
        .setKey(process.env.NEXT_APPWRITE_KEY!);

    const databases = new Databases(client);
    try {

        const existing = await databases.listDocuments(
            process.env.APPWRITE_DB as string,
            process.env.APPWRITE_USER as string,
            [Query.equal("email", user.email)]

        )

        return existing.total;
    } catch (error) {
        console.log(error);
    }
}
export async function saveUserToDB(user: {
    userId: string;
    email: string;
    name: string;
}) {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
        .setKey(process.env.NEXT_APPWRITE_KEY!);

    const databases = new Databases(client);
    try {
        const newUser = await databases.createDocument(
            process.env.APPWRITE_DB as string,
            process.env.APPWRITE_USER as string,
            ID.unique(),
            user
        );
        return newUser;
    } catch (error) {
        console.log(error);
    }
}


export async function createSessionClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

    const session = cookies().get("my-custom-session");
    if (!session || !session.value) {
        throw new Error("No session");
    }

    client.setSession(session.value);

    return {
        get account() {
            return new Account(client);
        },
    };
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        return await account.get();
    } catch (error) {
        return null;
    }
}

export async function sentEmailVerification() {
    try {
        const { account } = await createSessionClient();
        return await account.createVerification(
            `${process.env.HOST}/verify`
        );
    } catch (error) {
        return null;
    }
}


export async function sendPasswordResetLink({ email }: {
    email: string;
}) {
    try {
        const { account } = await createAdminClient();
        console.log(email, `${process.env.HOST}/reset`)
        await account.createRecovery(
            email,
            `${process.env.HOST}/reset`
        );
        return {
            success: true,
            message: "Password reset link sent successfully",
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function setPasswordByResetLink({ userId, secret, password }: {
    userId: string;
    secret: string;
    password: string;
}) {
    try {
        const { account } = await createAdminClient();
        console.log(userId, `${process.env.HOST}/reset`)
        await account.updateRecovery(
            userId, // userId
            secret, // secret
            password // new password
        );
        return {
            success: true,
            message: "Password reset link sent successfully",
        };
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function verifyUserAccount({ userId, secret }: {
    userId: string;
    secret: string;
}) {
    try {
        const { account } = await createSessionClient();

        const result = await account.updateVerification(
            userId, // userId
            secret // secret
        );
        return {
            success: true,
            message: "User Verified successfully",
            result: result
        };
    } catch (error) {
        console.log(error);
        return "error";
    }
}

export async function signInAccount(user: { email: string; password: string }) {
    try {
        const { account } = await createAdminClient();

        const session = await account.createEmailPasswordSession(user.email, user.password);

        cookies().set("my-custom-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return session;
    } catch (error) {
        console.log(error);

    }
}

export async function getUserData() {
    try {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
            .setKey(process.env.NEXT_APPWRITE_KEY!);

        const databases = new Databases(client);
        const user = await getLoggedInUser();
        let isUserExist = databases.listDocuments(
            process.env.APPWRITE_DB as string,
            process.env.APPWRITE_USER as string,
            [Query.equal("userId", user?.$id!)]
        );
        if ((await isUserExist).total === 0) {
            return await databases.createDocument(
                process.env.APPWRITE_DB as string,
                process.env.APPWRITE_USER as string,
                ID.unique(),
                { userId: user?.$id, email: user?.email, name: user?.name }
            ) as Iuser;
        }
        return (await isUserExist).documents[0] as Iuser;
    } catch (error) {
        return null;
    }
}

export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
        .setKey(process.env.NEXT_APPWRITE_KEY!);

    return {
        get account() {
            return new Account(client);
        },
    };
}

export async function onboardUser({
    designation,
    city,
    organisation,
    dob
}: {
    designation: string,
    city: string,
    organisation: string,
    dob: string
}) {
    try {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
            .setKey(process.env.NEXT_APPWRITE_KEY!);

        const databases = new Databases(client);
        const user = await getUserData();

        await databases.updateDocument(
            process.env.APPWRITE_DB as string,
            process.env.APPWRITE_USER as string,
            user?.$id!,
            { designation, city, organisation, dob, is_onboarded: true }
        );
        return true;
    }
    catch (error) {
        console.log(error)
        return null
    }
}

export async function createStartupConvo(startupDetail: StartupDetail) {
    try {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
            .setKey(process.env.NEXT_APPWRITE_KEY!);

        const databases = new Databases(client);
        const user = await getUserData();


        return await databases.createDocument(
            process.env.APPWRITE_DB as string,
            process.env.APPWRITE_CONVO as string,
            ID.unique(),
            {
                startupName: startupDetail.startupName,
                startupDescription: startupDetail.startupDescription,
                industrySector: startupDetail.industrySector,
                stageOfStartup: startupDetail.stageOfStartup,
                purposeOfFunding: startupDetail.purposeOfFunding,
                countryRegion: startupDetail.countryRegion,
                threadId: startupDetail.threadId,
                userId: user?.$id,
            }
        );
    }
    catch (error) {
        console.log(error)
        return null
    }
}

export async function getStartupConvo(id: string) {

    try {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
            .setKey(process.env.NEXT_APPWRITE_KEY!);

        const databases = new Databases(client);
        const convos = databases.listDocuments(
            process.env.APPWRITE_DB as string,
            process.env.APPWRITE_CONVO as string,
            [Query.equal("$id", id!)]
        )
        return (await convos).documents[0] as StartupDetailResponse;
    } catch (error) {
        return null;
    }

}
export async function getAllStartupConvos() {
    try {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
            .setKey(process.env.NEXT_APPWRITE_KEY!);
        const user = await getUserData();
        const databases = new Databases(client);
        const convos = databases.listDocuments(
            process.env.APPWRITE_DB as string,
            process.env.APPWRITE_CONVO as string,
            [Query.equal("userId", user?.$id!)]
        )
        return (await convos).documents;
    } catch (error) {
        return null;
    }

}