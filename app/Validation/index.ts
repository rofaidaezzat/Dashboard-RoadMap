import * as yup from "yup"


export const loginSchema = yup
    .object({
    email: yup
    .string()
      .required("Email is required")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address."),
    password: yup
    .string()
      .required("Password is required")
      .min(2, "Password should be at least 2 characters.")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
      .matches(/\d/, "Password must contain at least one number.")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character."
      ),
})
.required();


export const CreateTrackSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(2, "Title should be at least 2 characters."),
  requirments: yup
    .string()
    .required("Requirments is required")
    .min(2, "Requirments should be at least 2 characters."),
  target_audience: yup
    .string()
    .required("Target audience is required")
    .min(2, "Target audience should be at least 2 characters."),
  header: yup
    .array()
    .of(
      yup.object({
        title: yup.string().required("Header title is required"),
        subTitle: yup.string().required("SubTitle is required"),
      })
    )
    .min(1, "At least one header is required"),
  description: yup.string().required("Description is required"),
  core_languages: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("Language name is required"),
        icon: yup.string().required("Language icon is required"),
      })
    )
    .min(1, "At least one language is required"),
  popular_frameworks: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("Framework name is required"),
        icon: yup.string().required("Framework icon is required"),
      })
    )
    .min(1, "At least one framework is required"),
  development_tools: yup
    .array()
    .of(
      yup.object({
        name: yup.string().required("Tool name is required"),
        icon: yup.string().required("Tool icon is required"),
      })
    )
    .min(1, "At least one tool is required"),
  career_opportunities: yup.string().required("Career Opportunities is required"),
  advanced_topics: yup.string().required("Advanced Topics is required"),
  project_based_learning: yup.string().required("Project-Based Learning is required"),
  testimonials: yup.string().required("Testimonials is required"),
});
export const UpdateTrackSchema = yup
    .object({
    title: yup
    .string()
    .required("Title is required")
    .min(2,"Title should be at least 2 charachters."),
    requirments: yup
    .string()
    .required("requirments is required")
    .min(2, "requirments should be at least 2 charachters."),
    target_audience: yup
    .string()
    .required("target_audience is required")
    .min(2, "target_audience should be at least 2 numbers."),
    assignedTo: yup
    .string() // تغير إلى string بدلاً من array
    .required("Users are required")
    .test('is-valid-users', 'Please provide a valid comma-separated list of users', (value) => {
        // تأكد من أن القيمة تحتوي على أسماء مستخدمين مفصولة بفواصل
        return value ? value.split(',').every(user => user.trim().length > 0) : false;
        }),
        image: yup
        .mixed<FileList>()
        .nullable()
        .required("Image is required")
        .test("fileType", "Only image files are allowed", (value) => {
          if (!value || value.length === 0) return false;
          return ["image/jpeg", "image/png", "image/webp"].includes(value[0]?.type);
        })
        .test("fileSize", "Image size should be less than 2MB", (value) => {
          if (!value || value.length === 0) return false;
          return value[0]?.size <= 2 * 1024 * 1024;
        }),
})
.required();

export const Create_Member_Schema = yup
    .object({
    first_name: yup
    .string()
    .required("First Name is required")
    .min(2, "First Name should be at least 2 characters."),
   
    last_name: yup
    .string()
    .required("Last Name is required")
    .min(2, "Last Name should be at least 2 charachters.")
    ,

    email: yup
    .string()
    .required("Email is required")
    .matches(/^[^@ ]+@[^@ ]+.[^@ .]{2,}$/, "Not a valid email address."),
    password: yup
    .string()
    .required("Password is required")
    .min(2, "Password should be at least 2 charachters."),
})
.required();
export const Update_Member_Schema = yup
    .object({
        first_name: yup
        .string()
        .required("First Name is required")
        .min(2, "First Name should be at least 2 charachters.")
        ,

        last_name: yup
        .string()
        .required("Last Name is required")
        .min(2, "Last Name should be at least 2 charachters.")
        ,

    email: yup
    .string()
    .required("Email is required")
    .matches(/^[^@ ]+@[^@ ]+.[^@ .]{2,}$/, "Not a valid email address."),

})
.required();
export const Create_Category_Schema = yup
    .object({
    title: yup
    .string()
    .required("Title is required")
    .min(2, "Title should be at least 2 charachters.")
    ,
    stageId: yup
    .string()
    .required("StageId is required")
    .min(2, "StageId should be at least 2 charachters.")
    ,
})
.required();
export const Update_Category_Schema = yup
    .object({
    title: yup
    .string()
    .required("Title is required")
    .min(2, "Title should be at least 2 charachters.")
    ,
})
.required();
export const Update_Stage_Schema = yup
    .object({
        title: yup
        .string()
        .required("Title is required")
        .min(2, "Title should be at least 2 charachters.")
        ,

})
.required();


export const Create_Stage_Schema = yup
    .object({
        title: yup
        .string()
        .required("Title is required")
        .min(2, "Title should be at least 2 charachters.")
        ,
        roadmap: yup
        .string()
        .required("roadmap is required")
})
.required();
export const Create_Lesson_Schema = yup
    .object({
        title: yup
        .string()
        .required("Title is required")
        .min(2, "Title should be at least 2 charachters.")
        ,
        description: yup
        .string()
        .required("Description is required")
        .min(2, "Description should be at least 2 charachters.")
        ,
        link: yup
        .string()
        .required("Link is required")
        .min(2, "Link should be at least 2 charachters.")
        ,
        category: yup
        .string()
        .required("Category is required")
        .min(2, "Category should be at least 2 charachters.")
        ,
        lesson_duration: yup
        .number()
        .required("lesson_duration is required")
        .min(1, "lesson_duration should be at least 6 charachters.")
        
})
export const Update_Lesson_Schema=yup
    .object({
        title: yup
        .string()
        .required("Title is required")
        .min(2, "Title should be at least 2 charachters.")
        ,
        description: yup
        .string()
        .required("Description is required")
        .min(3, "Description should be at least 6 charachters.")
        ,
        link: yup
        .string()
        .required("Link is required")
        .min(2, "Link should be at least 2 charachters.")
        ,
})
.required();
export const UpdateProfileSchema = yup.object({
    first_name: yup
    .string()
    .required("first name is required")
    .min(2, "first name should be at least 6 charachters."),
    last_name: yup
    .string()
    .required("last name is required")
    .min(2, "last name should be at least 6 charachters."),
    email: yup
    .string()
    .required("email is required")
    .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address."),
})
.required();
export const Update_Task_Schema=yup.object({
    title:yup
    .string()
    .required("Title is required")
    .min(2, "Title should be at least 2 charachters."),
    
}).required();