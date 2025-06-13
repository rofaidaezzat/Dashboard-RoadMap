import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./customBaseQuery";


export interface ITracks {
    _id: string;
    title: string;
    order: number;
    roadmap: {
        title:string
    };
}

interface IEdite{
    title:string
}


interface Icreate{
    title:string,
    roadmap:string
}


export type IStagesResponse =ITracks[];



export const StatgesApiSlice=createApi({
    reducerPath:'ApiStages',
    tagTypes:['DashboardStages'],
    baseQuery: baseQueryWithReauth,   
        endpoints:(builder)=>({
             // Get =>get
        getDashboardStages:builder.query<IStagesResponse, void>({
            query:()=>{
                return{
                    url:"/stages"
                }
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({
                        type: 'DashboardStages' as const,
                        id: _id,
                        })),
                        { type: 'DashboardStages', id: 'LIST' },
                    ]
                    : [{ type: 'DashboardStages', id: 'LIST' }],
        }),     
        //Create=>post
                CreateDashboardStage: builder.mutation({
                query: ({ body }: { body: Icreate}) => ({
                    url: `stages/create`,
                    method: "POST",
                    body: body
                }),
                 // to save the update in cash
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        dispatch(
                            StatgesApiSlice.util.updateQueryData(
                            'getDashboardStages',
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
                    invalidatesTags: [{ type: "DashboardStages", id: "LIST" }]
            }),
         //update
            UpdateDashboardStages: builder.mutation({
                    query: ({ _id, body }: { _id:string|null; body:IEdite }) => ({
                    url: `stages/update/${_id}`,
                        method: "PUT",
                        body: body
                        }),
                     // to save the update in cash
                        async onQueryStarted({ _id, body }, { dispatch, queryFulfilled }) {
                            if (_id === null) return;
                        const patchResult = dispatch(
                            StatgesApiSlice.util.updateQueryData('getDashboardStages', undefined, (draft) => {
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
                        invalidatesTags: [{ type: "DashboardStages", id: "LIST" }]
                    }),
        //  Delete=>delete
            deleteDashboardStages:builder.mutation({
            query:(_id:string|null)=>{
                return{
                    url:`stages/delete/${_id}`,
                    method:"DELETE",
                }
            },
            invalidatesTags: [{ type: 'DashboardStages', id: 'LIST' }]
        })
    })
})

export const {useGetDashboardStagesQuery,useDeleteDashboardStagesMutation,useUpdateDashboardStagesMutation,useCreateDashboardStageMutation}=StatgesApiSlice

