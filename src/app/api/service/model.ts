export class User {
    uniqueId : string;
    userId : number;
    userName : string;
    password : string;
    firstName : string;
    lastName : string;
    isAdministrator : boolean;
    mobile : number;
    email : string;
    isActive : boolean;
    createdBy : number;
    createdDate: Date;
    lastModifiedBy: number;
    lastModifiedDate: Date;
    userTypeId: number;
    businessLocationId : number;
    businessGroupId : number;
    businessGroupName: string;
    businessGroupImage: string;
    sourceId: number;
    sourceName : string;
    IsAgeRestriction: boolean;
}

export class MemberData {
    uniqueId : string;
    id : number;
    memberId : number;
    signIn : Date;
    signOut : Date;
    businessId : number;
    stateId : number;
    isActive: true;
    createdBy: number;
    createdDate: Date;
    lastModifiedBy: number;
    lastModifiedDate: Date;
    memberName: string;
    phoneNo: string;
    email: string;
    badgeName: string;
    totalPoints: number;
    withdrawPoints: number;
}

export class ActivityHistory {
    uniqueId:string;
    id: number;
    memberId?: number;
    promotionId: number;
    autopilotId: number;
    activityDate: string;
    activityTypeId: number;
    points: number;
    sourceId: number;
    stateId: number;
    isActive: boolean;
    createdBy: number;
    createdDate: string;
    lastModifiedBy: number;
    lastModifiedDate: string;
}

export class MembersVistLog {
    UniqueId:string;
    Id: number;
    MemberId: number;
    SignIn: string;
    SourceId: number;
    BusinessLocationId: number;
    StateId: number;
    IsActive: boolean;
    CreatedBy: number;
    CreatedDate: string;
    LastModifiedBy: number;
    LastModifiedDate: string;
}