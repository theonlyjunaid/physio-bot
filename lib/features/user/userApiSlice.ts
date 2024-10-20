import { createAppSlice } from "@/lib/createAppSlice";
import { Iuser } from "@/lib/types/types";
import { PayloadAction } from "@reduxjs/toolkit";

export interface UserSliceState {
    user: Iuser;
    status: "idle" | "loading" | "failed";
}
const user: Iuser = {
    userId: "",
    email: "",
    name: "",
    $id: "",
    $permissions: [],
    $createdAt: "",
    $updatedAt: "",
    $tenant: "",
    is_onboarded: false,
    city: "",
    gender: "",
    occupation: "",
    age: "",
    conversations: [],
    $databaseId: "",
    $collectionId: ""
}

const initialState: UserSliceState = {
    user,
    status: "idle",
}

export const userSlice = createAppSlice({
    name: "user",
    initialState,
    reducers: (create) => ({
        initialise: create.reducer((state, { payload }: PayloadAction<Iuser>) => {
            state.user = payload;
            state.status = "idle";
        }),
    }),
});


export const { initialise } = userSlice.actions;

