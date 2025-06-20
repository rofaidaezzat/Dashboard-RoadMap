import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./customBaseQuery";



export interface ITracks {
    _id: string;
    title: string;
    requirments: string;
    target_audience: string;
    assignedTo:string
    user:string[]
    image:string
    header:[
        {
            title:string
            subTitle:string
        }
    ]
    description:string
    core_languages:[
       { name:string
        icon:string
        }
    ]
    popular_frameworks:[{
        name:string
        icon:string
    }]
    development_tools:[
        {
            name:string
            icon:string
        }
    ]
    career_opportunities:string
    advanced_topics:string
    project_based_learning:string
    testimonials:string
}


interface IEdite{
    title:string,
    requirments:string,
    target_audience:string,
    assignedTo:string[]

}

interface Icreate {
    title: string;
    requirments: string;
    target_audience: string;
    header: { title: string; subTitle: string }[];
    description: string;
    core_languages: { name: string; icon: string }[];
    popular_frameworks: { name: string; icon: string }[];
    development_tools: { name: string; icon: string }[];
    career_opportunities: string;
    advanced_topics: string;
    project_based_learning: string;
    testimonials: string;
}

export type ITracksResponse =ITracks[];

export const TracksApiSlice=createApi({
    reducerPath:'ApiTracks',
    tagTypes:['DashboardTracks'],
    baseQuery: baseQueryWithReauth,   
        endpoints:(builder)=>({
             // Get =>get
        getDashboardTracks:builder.query<ITracksResponse, void>({
            query:()=>{
                return{
                    url:"/roadmaps"
                }
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({
                        type: 'DashboardTracks' as const,
                        id: _id,
                        })),
                        { type: 'DashboardTracks', id: 'LIST' },
                    ]
                    : [{ type: 'DashboardTracks', id: 'LIST' }],
        }),
              //Create=>post
                CreateDashboardMember: builder.mutation({
                query: ({ body }: { body: Icreate}) => ({
                    url: `roadmaps/create`,
                    method: "POST",
                    body: body
                }),
                 // to save the update in cash
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        dispatch(
                            TracksApiSlice.util.updateQueryData(
                            'getDashboardTracks',
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
                    invalidatesTags: [{ type: "DashboardTracks", id: "LIST" }]
            }),
             //Create Image=>post
            CreateDashboardImageMember: builder.mutation({
                query: ({_id, body }: {_id:string|null; body: FormData}) => ({
                    url: `roadmaps/upload-roadmap-image/${_id}`,
                    method: "POST",
                    body: body
                }),
                 // to save the update in cash
                async onQueryStarted(_, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        dispatch(
                            TracksApiSlice.util.updateQueryData(
                            'getDashboardTracks',
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
                    invalidatesTags: [{ type: "DashboardTracks", id: "LIST" }]
            }),
            //update

            UpdateDashboardTrack: builder.mutation({
                query: ({ _id, body }: { _id: string | null; body: IEdite }) => {
                    const assignedToArray = Array.isArray(body.assignedTo)
                    ? body.assignedTo
                    : (body.assignedTo as unknown as string).split(',').map(id => id.trim());
                    return {
                    url: `/roadmaps/update/${_id}`,
                    method: "PUT",
                    body: {
                        ...body,
                        assignedTo: assignedToArray,
                    },
                    };
                },
                async onQueryStarted ({ _id, body }, { dispatch, queryFulfilled }) {
                    if (!_id) return;
                    const patchResult = dispatch(
                        TracksApiSlice.util.updateQueryData('getDashboardTracks', undefined, (draft) => {
                        const index = draft.findIndex((track) => track._id === _id);
                        if (index !== -1) {
                            draft[index].title = body.title;
                            draft[index].requirments = body.requirments;
                            draft[index].target_audience = body.target_audience;
                          draft[index].assignedTo = body.assignedTo.join(','); // ❗ حول array إلى string
                        }
                        })
                    );
                    try {
                        await queryFulfilled;
                    } catch {
                        patchResult.undo();
                    }
                    },
    
                invalidatesTags: [{ type: "DashboardTracks", id: "LIST" }]
                }),
            
        //  Delete=>delete
            deleteDashboardTracks:builder.mutation({
            query:(_id:string|null)=>{
                return{
                    url:`roadmaps/delete/${_id}`,
                    method:"DELETE",
                }
            },
            invalidatesTags: [{ type: 'DashboardTracks', id: 'LIST' }]
        })
    })

})

export const {useCreateDashboardImageMemberMutation,useGetDashboardTracksQuery,useDeleteDashboardTracksMutation,useCreateDashboardMemberMutation,useUpdateDashboardTrackMutation}=TracksApiSlice


