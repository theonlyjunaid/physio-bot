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
    city: string;
    gender: string;
    occupation: string;
    age: string;
    conversations: AssismentResponse[];
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

export type Assisment = {
    name: string;
    age: string;
    gender: string;
    occupation: string;
    locationOfPain: string;
    durationOfPain: string;
    painStartedFrom: string;
    customerProblem: string;
    painIncreasesWhen: string;
    painPattern: string;
    qualityOfPain: string;
    severityOfPain: string;
    preExistingCondition: string;
    familyMadicalHistoryOfSameProblem: string;
    symptomExperienced: string;
    bodyTemperature: string;
    userInput: string;
    isRadiateToOtherPart: string;
    threadId: string;
};

export type AssismentResponse = {
    $id: string,
    $permissions: [],
    $createdAt: string,
    $updatedAt: string,
    $tenant: string,
    $databaseId: string,
    $collectionId: string
    name: string;
    age: string;
    gender: string;
    occupation: string;
    locationOfPain: string;
    durationOfPain: string;
    painStartedFrom: string;
    customerProblem: string;
    painIncreasesWhen: string;
    painPattern: string;
    qualityOfPain: string;
    severityOfPain: string;
    preExistingCondition: string;
    familyMadicalHistoryOfSameProblem: string;
    symptomExperienced: string;
    bodyTemperature: string;
    userInput: string;
    isRadiateToOtherPart: string;
    threadId: string;
};
