
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./customBaseQuery";



export interface ILesson {
    _id: string;
    title: string;
    description:string;
    roadmap: {
        title:string
    };
    stage:{
        title:string
    }
    category:{
        title:string
    }
    link:string;
    
}

export interface ICreate{
    title: string;
    description:string;
    link:string;
    category:string;
    lesson_duration:number;

    
}
export interface IEdite{
    title: string;
    description:string;
    link:string;
}


export type ILessonResponse =ILesson[];

export const LessonApiSlice=createApi({
    reducerPath:'ApiLesson',
    tagTypes:['DashboardLesson'],
    baseQuery: baseQueryWithReauth,   
        endpoints:(builder)=>({
             //----------------------------- Get =>get---------------------
        getDashboardLesson:builder.query<ILessonResponse, void>({
            query:()=>{
                return{
                    url:"lesson"
                }
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({
                        type: 'DashboardLesson' as const,
                        id: _id,
                        })),
                        { type: 'DashboardLesson', id: 'LIST' },
                    ]
                    : [{ type: 'DashboardLesson', id: 'LIST' }],
        }),
              //------------------------------------Create=>post----------------------
                CreateDashboardLesson: builder.mutation({
  query: ({ body }: { body: ICreate }) => {
    return {
      url: `lesson/create`,
      method: "POST",
      body: body,
    };
  },
  async onQueryStarted(_, { dispatch, queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      dispatch(
        LessonApiSlice.util.updateQueryData(
          "getDashboardLesson",
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
  invalidatesTags: [{ type: "DashboardLesson", id: "LIST" }],
}),

        


            //--------------------------update--------------------

            UpdateDashboardLesson: builder.mutation({
                    query: ({ _id, body }: { _id:string|null; body:IEdite }) => ({
                    url: `lesson/update/${_id}`,
                        method: "PUT",
                        body: body
                        }),
                     // to save the update in cash
                        async onQueryStarted({ _id, body }, { dispatch, queryFulfilled }) {
                            if (_id === null) return;
                        const patchResult = dispatch(
                            LessonApiSlice.util.updateQueryData('getDashboardLesson', undefined, (draft) => {
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
                        invalidatesTags: [{ type: "DashboardLesson", id: "LIST" }]
                    }),
        //-------------------------  Delete=>delete------------------------
            deleteDashboardLesson:builder.mutation({
            query:(_id:string|null)=>{
                return{
                    url:`lesson/delete/${_id}`,
                    method:"DELETE",
                }
            },
            invalidatesTags: [{ type: 'DashboardLesson', id: 'LIST' }]
        })
    })

})

export const {useGetDashboardLessonQuery ,useCreateDashboardLessonMutation ,useUpdateDashboardLessonMutation ,useDeleteDashboardLessonMutation}=LessonApiSlice


