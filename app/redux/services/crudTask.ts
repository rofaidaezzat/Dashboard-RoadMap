import { createApi} from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './customBaseQuery';


export interface ITask {
    _id: string;
    title: string;
    description: string;
    status: string;
    
}

interface IUpdate {
    title:string,
}
export type ITaskResponse =ITask[];
export const TaskApiSlice=createApi({
    reducerPath:'ApiTask',
    tagTypes:['DashboardTask'],
    baseQuery: baseQueryWithReauth,   
        endpoints:(builder)=>({
        // -----------------Get =>get--------------------
        getDashboardTask:builder.query<ITaskResponse, void>({
            query:()=>{
                return{
                    url:"tasks"
                }
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({
                        type: 'DashboardTask' as const,
                        id: _id, // لازم id هنا
                        })),
                        { type: 'DashboardTask', id: 'LIST' },
                    ]
                    : [{ type: 'DashboardTask', id: 'LIST' }],
        }),
         //-----------------update=>put---------------------
        UpdateDashboardTask: builder.mutation({
            query: ({ _id, body }: { _id:string|null; body:IUpdate }) => ({
                url: `tasks/update/${_id}`,
                method: "PUT",
                body: body
            }),
            // to save the update in cash
            async onQueryStarted({ _id, body }, { dispatch, queryFulfilled }) {
                if (_id === null) return;
            
                const patchResult = dispatch(
                    TaskApiSlice.util.updateQueryData('getDashboardTask', undefined, (draft) => {
                    const index = draft.findIndex((task) => task._id === _id);
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
            invalidatesTags: [{ type: "DashboardTask", id: "LIST" }]
        }),
         //-----------------------Delete=>delete---------------------
            deleteDashboardTask:builder.mutation({
            query:(_id:string|null)=>{
                return{
                    url:`tasks/delete/${_id}`,
                    method:"Delete",
                    
                }
            },
            invalidatesTags: [{ type: 'DashboardTask', id: 'LIST' }]
        }),
         
    })

})
export const {useGetDashboardTaskQuery,useDeleteDashboardTaskMutation,useUpdateDashboardTaskMutation}=TaskApiSlice;