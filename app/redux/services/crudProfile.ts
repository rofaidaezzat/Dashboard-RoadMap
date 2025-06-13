import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./customBaseQuery";




export const ProfileApiSlice=createApi({
    reducerPath:'ApiProfile',
    tagTypes:['UserProfile'],
    baseQuery: baseQueryWithReauth,   
        endpoints:(builder)=>({

              //Update=>put Image
                UploadImageProfile: builder.mutation({
                query: ({ body }: { body: FormData}) => ({
                    url: `users/update-profile`,
                    method: "PUT",
                    body: body
                }),
            }),
             //Update=>put Image
                deleteImageProfile: builder.mutation({
                query: () => ({
                    url: `users/delete-profile-image`,
                    method: "DELETE",
                }),
            }),

    })

})

export const {useUploadImageProfileMutation,useDeleteImageProfileMutation}=ProfileApiSlice


