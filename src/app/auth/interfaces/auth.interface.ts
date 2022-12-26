export interface LoginResponse {
    data:         User;
    access_token: string;
    token_type:   string;
}

export interface User {
    uuid:          string;
    name:          string;
    last_name:     string;
    profile_image?: string;
    email:         string;
    phone?:         string;
    created_at:    Date;
    updated_at:    Date;
}
