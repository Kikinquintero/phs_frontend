export interface TypeUsers {
    success?: boolean;
    message?: string;
    data?:    User[];
}

export interface User {
    id?:                string;
    nombre?:            string;
    apellido?:          string;
    phone?:             null;
    email?:             string;
    password?:          string;
    activo?:            boolean;
    rol_id?:            number;
    email_verified_at?: null;
    remember_token?:    null;
    created_at?:        null;
    updated_at?:        null;
}
