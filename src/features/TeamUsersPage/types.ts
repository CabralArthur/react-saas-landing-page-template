export interface Permission {
    module: string;
    name: string;
}

export interface TeamUser {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    createdAt: string;
    permissions?: Permission[];
}

export interface CreateUserData {
    name: string;
    email: string;
    isAdmin: boolean;
}

export interface UpdateUserData {
    name?: string;
    isAdmin?: boolean;
}

export interface UpdatePermissionsData {
    permissions: Permission[];
}

export interface Module {
    name: string;
    permissions: {
        view: boolean;
        create: boolean;
        edit: boolean;
        delete: boolean;
        operate: boolean;
    };
} 