export interface AuthResponse {
    ok           : boolean;
    data?        : User;
    message?     : String;
    error?       : any;
    access_token?: string;
}

export interface User {
    uuid          : string;
    name          : string;
    last_name     : string;
    profile_image?: string;
    email         : string;
    phone?        : string;
    notes?        : string;  
    created_at?   : Date;
    updated_at?   : Date;
}
