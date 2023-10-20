import { RoleListResponse, RoleResponse } from "../../models/role/role";

export const ROLE_SUCCESS = "ROLE_SUCCESS";
export const ROLE_FAIL = "ROLE_FAIL";

export const ROLE_LIST_SUCCESS = "ROLE_LIST_SUCCESS";
export const ROLE_LIST_FAIL = "ROLE_LIST_FAIL";

export const GET_ROLE = "GET_ROLE";

export const GET_ROLES_ASSIGN = "GET_ROLES_ASSIGN";
export const GET_ROLES_ASSIGN_ERROR = "GET_ROLES_ASSIGN_ERROR";
export const GET_ROLES_UNASSIGNED = "GET_ROLES_UNASSIGNED";
export const GET_ROLES_UNASSIGNED_ERROR = "GET_ROLES_UNASSIGNED_ERROR";
export const ADD_ROLE = "ADD_ROLE";
export const ADD_ROLE_ERROR = "ADD_ROLE_ERROR";

export const METHOD = {
    create: "CREATE",
    update: "UPDATE"
};

export type ACTION = | 
    {
        type: "ROLE_SUCCESS",
        payload: {
            roleResponse: RoleResponse,
            roleListResponse: RoleListResponse
        }
    }
    | {
        type: "ROLE_LIST_SUCCESS",
        payload: {
            roleListResponse: RoleListResponse
        }
    }
    | {
        type: "ROLE_FAIL",
        payload: {
            roleResponse: RoleResponse
        }
    }
    | {
        type: "ROLE_LIST_FAIL",
        payload: {
            roleListResponse: RoleListResponse
        }
    }
    |
    {
        type: "GET_ROLE",
        payload: {
            idRole: number
        }
    }
    |
    {
        type: "GET_ROLES_ASSIGN",
        payload: {
            roleListAssignResponse: RoleListResponse
        }
    }
    |
    {
        type: "GET_ROLES_ASSIGN_ERROR",
        payload: {
            roleListAssignResponse: RoleListResponse
        }
    }
    |
    {
        type: "GET_ROLES_UNASSIGNED",
        payload: {
            roleListUnassignResponse: RoleListResponse
        }
    }
    |
    {
        type: "GET_ROLES_UNASSIGNED_ERROR",
        payload: {
            roleListUnassignResponse: RoleListResponse
        }
    }
    |
    {
        type: "ADD_ROLE",
        payload: {
            roleGrantResponse: RoleResponse
        }
    }
    |
    {
        type: "ADD_ROLE_ERROR",
        payload: {
            roleGrantResponse: RoleResponse
        }
    }

