export type Iuser = {
    userId: string,
    email: string,
    name: string,
    $id: string,
    $permissions: [],
    $createdAt: string,
    $updatedAt: string,
    $tenant: string,
    is_onboarded: false,
    plan: string,
    city: null,
    organisation: null,
    dob: null,
    designation: null,
    $databaseId: string,
    $collectionId: string
}

export type INewUser = {
    name: string;
    email: string;
    password: string;
};
export type StartupDetail = {
    startupName: string;
    startupDescription: string;
    industrySector: string;
    stageOfStartup: string;
    purposeOfFunding: string;
    countryRegion: string;
    threadId: string;
};
export type StartupDetailResponse = {
    $id: string,
    $permissions: [],
    $createdAt: string,
    $updatedAt: string,
    $tenant: string,
    startupName: string;
    startupDescription: string;
    industrySector: string;
    stageOfStartup: string;
    purposeOfFunding: string;
    countryRegion: string;
    threadId: string;
    $databaseId: string,
    $collectionId: string
};