import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface IAccessToken{
    accesstoken:string
}

const initialState:IAccessToken={
    accesstoken:''
}

const AccessTokenSlice=createSlice(
    {
        name:'accessToken',
        initialState,
        reducers:{
            AccessTokenAction:(state,action:PayloadAction<string>)=>{
                state.accesstoken=action.payload
            },
            clearAccessToken: (state) => {
                state.accesstoken = '';
            },
        }
    }
)

export const {AccessTokenAction,clearAccessToken}=AccessTokenSlice.actions
export default AccessTokenSlice.reducer