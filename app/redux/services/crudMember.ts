import { createApi} from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './customBaseQuery';


export interface IMember {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}
interface ICreate {
    first_name:string,
    last_name:string,
    email:string,
    password:string
}


interface IUpdate {
    first_name:string,
    last_name:string,
    email:string
}

interface IRole{
    role:string
}


export type ImemberResponse =IMember[];



export const MemberApiSlice=createApi({
    reducerPath:'ApiMember',
    tagTypes:['DashboardMember'],
    baseQuery: baseQueryWithReauth,   
        endpoints:(builder)=>({
        // -----------------Get =>get--------------------
        getDashboardMember:builder.query<ImemberResponse, void>({
            query:()=>{
                return{
                    url:"/users/getallusers"
                }
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({
                        type: 'DashboardMember' as const,
                        id: _id, // لازم id هنا
                        })),
                        { type: 'DashboardMember', id: 'LIST' },
                    ]
                    : [{ type: 'DashboardMember', id: 'LIST' }],
        }),
        //------------------Create=>post------------------
        CreateDashboardMember: builder.mutation({
            query: ({ body }: { body:ICreate }) => ({
                url: `users/adduser`,
                method: "POST",
                body: body
            }),
             // to save the update in cash
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(
                        MemberApiSlice.util.updateQueryData(
                        'getDashboardMember',
                        undefined,
                        (draft) => {
                        draft.unshift(data);
                        }
                    )
                    );
                } catch (err) {
                    console.error("Error in cache update after create:", err);
                }
                },
                invalidatesTags: [{ type: "DashboardMember", id: "LIST" }]
        }),
         //-----------------update=>put---------------------
        UpdateDashboardMember: builder.mutation({
            query: ({ _id, body }: { _id:string|null; body:IUpdate }) => ({
                url: `users/update-profile/${_id}`,
                method: "PUT",
                body: body
            }),
            // to save the update in cash
            async onQueryStarted({ _id, body }, { dispatch, queryFulfilled }) {
                if (_id === null) return;
            
                const patchResult = dispatch(
                    MemberApiSlice.util.updateQueryData('getDashboardMember', undefined, (draft) => {
                    const index = draft.findIndex((member) => member._id === _id);
                    if (index !== -1) {
                        draft[index] = { ...draft[index], ...body };
                    }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
                },
            invalidatesTags: [{ type: "DashboardMember", id: "LIST" }]
        }),
         //-----------------------Delete=>delete---------------------
            deleteDashboardMember:builder.mutation({
            query:(_id:string|null)=>{
                return{
                    url:`users/delete-account/${_id}`,
                    method:"Delete",
                    
                }
            },
            invalidatesTags: [{ type: 'DashboardMember', id: 'LIST' }]
        }),
          //-----------------------Delete=>delete---------------------
            GiveRoleDashboardMember: builder.mutation({
            query: ({ _id, body }: { _id:string|null; body:IRole}) => ({
                url: `users/set-role/${_id}`,
                method: "PUT",
                body: body
            }),
            // to save the update in cash
            async onQueryStarted({ _id, body }, { dispatch, queryFulfilled }) {
                if (_id === null) return;
            
                const patchResult = dispatch(
                    MemberApiSlice.util.updateQueryData('getDashboardMember', undefined, (draft) => {
                    const index = draft.findIndex((member) => member._id === _id);
                    if (index !== -1) {
                        draft[index] = { ...draft[index], ...body };
                    }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
                },
            invalidatesTags: [{ type: "DashboardMember", id: "LIST" }]
        }),
    })

})
export const {useGetDashboardMemberQuery,useDeleteDashboardMemberMutation,useCreateDashboardMemberMutation,useUpdateDashboardMemberMutation,useGiveRoleDashboardMemberMutation}=MemberApiSlice;