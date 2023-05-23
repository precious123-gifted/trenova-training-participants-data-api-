export interface WindowSize {
    width: number;
    height: number;
}

export interface IUser {
    _id?: string;
    participantName : string,
    schoolName : string,
    address : string,
    phoneNumber : string,
    email: string;
    createdDate : string;
    
}

export interface LoginUserParams {
    email: string;
    password: string;
}