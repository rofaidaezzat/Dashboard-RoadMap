export interface ILoginInput {
    name: "email" | "password";
    Label:"Email"|"Password"
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;// regular Expression
    };
}
export interface ICreateMemberForm {
    name: "first_name" | "last_name" | "email" | "password";
    Label:"First Name"|"Last Name"|"Email"|"Password";
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;// regular Expression
    };
}
export interface IUpdateMemberForm {
    name: "first_name" | "last_name" | "email" ;
    Label:"First Name"|"Last Name"|"Email";
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;// regular Expression
    };
}

export interface ICreateTrackFormInput {
    name: "title" | "requirments"|"target_audience";
    Label:"Title"|"Requirments"|"Target_Audience"|"image"
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;// regular Expression
    };
}

export interface IUpdateTrackFormInput {
    name: "title" | "requirments"|"target_audience"|"assignedTo"|"image";
    Label:"Title"|"Requirments"|"Target_Audience"|"assignedTo" |"image"
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;// regular Expression
    };
}

export interface ICreateCategoryForm{
    name: "title" | "stageId";
    Label:"Title"|"StageId"
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;// regular Expression
    };
}
export interface IUpdateCategoryForm{
    name: "title";
    Label:"Title"
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;// regular Expression
    };
}
export interface IUpdateStageForm{
    name: "title" ;
    Label:"Title";
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;// regular Expression
    };

}

export interface ICreateStageForm{
    name: "title"|"roadmap" ;
    Label:"Title"|"Roadmap";
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;// regular Expression
    };

}
export interface ICreateLessonForm {
    name: "title"|"description"|"link"|"category"|"lesson_duration" ;
    Label:"Title"|"Description"|"Link"|"Category"|"Lesson_Duration";
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;// regular Expression
    };
}
    export interface IUpdateLessonForm{
        name:"title"|"description"|"link";
        Label:"Title"|"Description"|"Link";
         placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;// regular Expression
    };
    }
    export interface IUpdateAdminProfile {
  name: "first_name" | "last_name" | "email";
  Label: "First Name" | "Last Name" | "Email";
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp; // regular Expression
  };
}
export interface IUpdateTaskForm{
    name: "title";
    Label:"Title";
    placeholder: string;
    type: string;
    validation: {
        required?: boolean;
        minLength?: number;
        pattern?: RegExp;// regular Expression
    };
}


export interface IErrorResponse {
    error: {
        message?: string;// انا كده بطلع المسدج الي جوا ال ايرور
    };
}


