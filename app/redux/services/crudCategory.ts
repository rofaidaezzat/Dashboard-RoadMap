
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./customBaseQuery";



export interface ICategory {
    _id: string;
    title: string;
    roadmap: {
        title:string
    };
    stage:{
        title:string
    }
}

export interface ICreate{
    title: string;
    stageId:string;
    
}
export interface IEdite{
    title: string;
}


export type ICategoryResponse =ICategory[];

export const CategoryApiSlice=createApi({
    reducerPath:'ApiCategory',
    tagTypes:['DashboardCategory'],
    baseQuery: baseQueryWithReauth,   
        endpoints:(builder)=>({
             //----------------------------- Get =>get---------------------
        getDashboardCategory:builder.query<ICategoryResponse, void>({
            query:()=>{
                return{
                    url:"category"
                }
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({
                        type: 'DashboardCategory' as const,
                        id: _id,
                        })),
                        { type: 'DashboardCategory', id: 'LIST' },
                    ]
                    : [{ type: 'DashboardCategory', id: 'LIST' }],
        }),
              //------------------------------------Create=>post----------------------
                CreateDashboardCategory: builder.mutation({
  query: ({ body }: { body: ICreate }) => {
    console.log("Creating category with body:", body);
    return {
      url: `category/create`,
      method: "POST",
      body: body,
    };
  },
  async onQueryStarted(_, { dispatch, queryFulfilled }) {
    try {
      const { data } = await queryFulfilled;
      dispatch(
        CategoryApiSlice.util.updateQueryData(
          "getDashboardCategory",
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
  invalidatesTags: [{ type: "DashboardCategory", id: "LIST" }],
}),

        


            //--------------------------update--------------------

            UpdateDashboardCategory: builder.mutation({
                    query: ({ _id, body }: { _id:string|null; body:IEdite }) => ({
                    url: `category/update/${_id}`,
                        method: "PUT",
                        body: body
                        }),
                     // to save the update in cash
                        async onQueryStarted({ _id, body }, { dispatch, queryFulfilled }) {
                            if (_id === null) return;
                        const patchResult = dispatch(
                            CategoryApiSlice.util.updateQueryData('getDashboardCategory', undefined, (draft) => {
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
                        invalidatesTags: [{ type: "DashboardCategory", id: "LIST" }]
                    }),
        //-------------------------  Delete=>delete------------------------
            deleteDashboardCategory:builder.mutation({
            query:(_id:string|null)=>{
                return{
                    url:`category/delete/${_id}`,
                    method:"DELETE",
                }
            },
            invalidatesTags: [{ type: 'DashboardCategory', id: 'LIST' }]
        })
    })

})

export const {useGetDashboardCategoryQuery ,useCreateDashboardCategoryMutation ,useUpdateDashboardCategoryMutation ,useDeleteDashboardCategoryMutation}=CategoryApiSlice


