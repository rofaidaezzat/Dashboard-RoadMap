
import { createSlice,PayloadAction } from "@reduxjs/toolkit"

interface IidClicked{
    ClickedId:string|null
}

const initialState:IidClicked={
    ClickedId:''
}

const clickedIdSlice=createSlice({
    name:"clickedId",
    initialState,
    reducers:{
        clickedIdAction:(state,action:PayloadAction<string|null>)=>{
            state.ClickedId=action.payload
        }
    }
})

export const {clickedIdAction}=clickedIdSlice.actions
export default  clickedIdSlice.reducer
