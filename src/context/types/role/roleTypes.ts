import { RoleListResponse, RoleResponse } from "../../models/role/role";

export const ROLE_SUCCESS = "ROLE_SUCCESS";
export const ROLE_FAIL = "ROLE_FAIL";

export const ROLE_LIST_SUCCESS = "ROLE_LIST_SUCCESS";
export const ROLE_LIST_FAIL = "ROLE_LIST_FAIL";
 
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