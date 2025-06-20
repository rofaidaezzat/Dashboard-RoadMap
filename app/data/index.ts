import { ICreateCategoryForm, ICreateLessonForm, ICreateMemberForm, ICreateStageForm, ICreateTrackFormInput, ILoginInput, IUpdateAdminProfile, IUpdateCategoryForm, IUpdateLessonForm, IUpdateMemberForm, IUpdateStageForm, IUpdateTaskForm, IUpdateTrackFormInput } from "../interfaces";

export const LOGIN_FORM: ILoginInput[] = [
    {
        name: "email",
        Label:"Email",
        placeholder: "Email",
        type: "email",
        validation: {
        required: true,
        pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    },
    },
    {
        name: "password",
        Label:"Password",
        placeholder: "Password",
        type: "password",
        validation: {
        required: true,
        minLength: 6,
        },
    },
    ];

    export const Create_Track_Form_FORM: ICreateTrackFormInput[] = [
        {
            name: "title",
            Label:"Title",
            placeholder: "Title",
            type: "text",
            validation: {
            required: true,
            minLength:3
        },
        },
        {
            name: "requirments",
            Label:"Requirments",
            placeholder: "Requirments",
            type: "text",
            validation: {
            required: true,
            minLength: 6,
            },
        },
        {
            name: "target_audience",
            Label:"Target_Audience",
            placeholder: "Target_Audience",
            type: "number",
            validation: {
            required: true,
            minLength: 1,
            },
        },
        
        ];


        export const Update_Track_Form_FORM: IUpdateTrackFormInput[] = [
            {
                name: "title",
                Label:"Title",
                placeholder: "Title",
                type: "text",
                validation: {
                required: true,
                minLength:3
            },
            },
            {
                name: "requirments",
                Label:"Requirments",
                placeholder: "Requirments",
                type: "text",
                validation: {
                required: true,
                minLength: 6,
                },
            },
            {
                name: "target_audience",
                Label:"Target_Audience",
                placeholder: "Target_Audience",
                type: "number",
                validation: {
                required: true,
                minLength: 1,
                },
            },
            {
                name: "assignedTo",
                Label:"assignedTo",
                placeholder: "assignedTo",
                type: "string",
                validation: {
                required: true,
                minLength: 1,
                },
            },

            {
                name: "image",
                Label:"image",
                placeholder: "choose file",
                type: "file",
                validation: {
                required: true,
                },
            },
            ];
            


            export const Create_Member_FORM: ICreateMemberForm[] = [
                {
                    name: "first_name",
                    Label:"First Name",
                    placeholder: "First Name",
                    type: "text",
                    validation: {
                    required: true,
                    minLength: 6,
                },
                },
                {
                    name: "last_name",
                    Label:"Last Name",
                    placeholder: "Last Name",
                    type: "text",
                    validation: {
                    required: true,
                    minLength: 6,
                    },
                },
                {
                    name: "email",
                    Label:"Email",
                    placeholder: "Email",
                    type: "email",
                    validation: {
                        required: true,
                        pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    },
                },
                {
                    name: "password",
                    Label:"Password",
                    placeholder: "Password",
                    type: "password",
                    validation: {
                    required: true,
                    minLength: 6,
                    },
                },
                ];
                export const Update_Member_FORM: IUpdateMemberForm[] = [
                    {
                        name: "first_name",
                        Label:"First Name",
                        placeholder: "First Name",
                        type: "text",
                        validation: {
                        required: true,
                        minLength: 6,
                    },
                    },
                    {
                        name: "last_name",
                        Label:"Last Name",
                        placeholder: "Last Name",
                        type: "text",
                        validation: {
                        required: true,
                        minLength: 6,
                        },
                    },
                    {
                        name: "email",
                        Label:"Email",
                        placeholder: "Email",
                        type: "email",
                        validation: {
                            required: true,
                            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        },
                    },
                    
                    ];
                    export const Create_Category_FORM: ICreateCategoryForm[] = [
                        {
                            name: "title",
                            Label:"Title",
                            placeholder: "Title",
                            type: "text",
                            validation: {
                            required: true,
                            minLength: 6,
                        },
                        },
                         {
                            name: "stageId",
                            Label:"StageId",
                            placeholder: "StageId",
                            type: "text",
                            validation: {
                            required: true,
                            minLength: 6,

                        },
                        }
                    ]
                    export const Update_Category_FORM: IUpdateCategoryForm[] = [
                        {
                            name: "title",
                            Label:"Title",
                            placeholder: "Title",
                            type: "text",
                            validation: {
                            required: true,
                            minLength: 6,
                        },
                        }
                    ]
                    export const Update_Stage_Form_FORM:IUpdateStageForm[] = [
                        {
                            name: "title",
                            Label:"Title",
                            placeholder: "Title",
                            type: "text",
                            validation: {
                            required: true,
                            minLength:3
                        },
                        },
                        ];

                        export const Create_Stage_Form_FORM:ICreateStageForm[] = [
                            {
                                name: "title",
                                Label:"Title",
                                placeholder: "Title",
                                type: "text",
                                validation: {
                                required: true,
                                minLength:3
                            },
                            },
                            {
                                name: "roadmap",
                                Label:"Roadmap",
                                placeholder: "Roadmap",
                                type: "text",
                                validation: {
                                required: true,
                                minLength:3
                            },
                            },
                            ];
                            export const Create_Lesson_Form:ICreateLessonForm[] = [
                                {
                                    name: "title",
                                    Label:"Title",
                                    placeholder: "Title",
                                    type: "text",
                                    validation: {
                                    required: true,
                                    minLength:3
                                },
                                },
                                {
                                    name: "description",
                                    Label:"Description",
                                    placeholder: "Description",
                                    type: "text",
                                    validation: {
                                    required: true,
                                    minLength:3
                                },
                                
                                },
                                {
                                    name:"link",
                                    Label:"Link",
                                    placeholder: "Link",
                                    type: "text",
                                    validation: {
                                    required: true,
                                    minLength:3
                                    }
                                },
                                {
                                    name:"category",
                                    Label:"Category",
                                    placeholder: "Category",
                                    type: "text",
                                    validation: {
                                    required: true,
                                    minLength:3
                                    }
                                }
                                ,{
                                    name: "lesson_duration",
                                    Label:"Lesson_Duration",
                                    placeholder: "lesson_duration",
                                    type: "number",
                                    validation: {
                                    required: true,
                                    minLength: 1,
                                    },
                                }
                            ]
                            export const Update_Lesson_Form:IUpdateLessonForm[] = [
                                {
                                    name: "title",
                                    Label:"Title",
                                    placeholder: "Title",
                                    type: "text",
                                    validation: {
                                    required: true,
                                    minLength:3
                                }
                            },
                                {
                                    name: "description",
                                    Label:"Description",
                                    placeholder: "Description",
                                    type: "text",
                                    validation: {
                                    required: true,
                                    minLength:3
                                }
                            },
                                {
                                    name:"link",
                                    Label:"Link",
                                    placeholder: "Link",
                                    type: "text",
                                    validation: {
                                    required: true,
                                    minLength:3
                                }
                                }
                            ]
                            export const UpdateAdminProfile: IUpdateAdminProfile[] = [
  {
    name: "first_name",
    Label: "First Name",
    placeholder: "First Name",
    type: "text",
    validation: {
      required: true,
      minLength: 2,
    },
  },
  {
    name: "last_name",
    Label: "Last Name",
    placeholder: "Last Name",
    type: "text",
    validation: {
      required: true,
      minLength: 2,
    },
  },
  {
    name: "email",
    Label: "Email",
    placeholder: "Email",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    },
  },
];
export const Update_Task_FORM:IUpdateTaskForm[]=[
    {
    name: "title",
    Label: "Title",
    placeholder: "Title",
    type: "text",
    validation: {
      required: true,
      minLength: 2,
    },
  },
]
