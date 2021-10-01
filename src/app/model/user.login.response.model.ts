export class UserLoginResponse {

    isSuccessful: boolean;
    message: string;
    data: Data[];
    fullname: string;

}

export class Data {

    id: string;
    internalId: string;
    name: string;
    subsidiary: Subsidiary;
    role: Role;
}
export class Subsidiary {

    name: string;
    id: string;

}
export class Role {
    name: string;
    id: string;
}