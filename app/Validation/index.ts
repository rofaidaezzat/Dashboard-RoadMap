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
    .min(6, "Password should be at least 6 charachters."),
})
.required();


export const CreateTrackSchema = yup.object({
    title: yup
      .string()
      .required("Title is required")
      .min(3, "Title should be at least 3 characters."),
    requirments: yup
      .string()
      .required("Requirments is required")
      .min(6, "Requirments should be at least 6 characters."),
    target_audience: yup
      .string()
      .required("Target audience is required")
      .min(3, "Target audience should be at least 3 characters."),
  });
export const UpdateTrackSchema = yup
    .object({
    title: yup
    .string()
    .required("Title is required")
    .min(3,"Title should be at least 3 charachters."),
    requirments: yup
    .string()
    .required("requirments is required")
    .min(6, "requirments should be at least 6 charachters."),
    target_audience: yup
    .string()
    .required("target_audience is required")
    .min(3, "target_audience should be at least 3 numbers."),
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
    .min(2, "First Name should be at least 2 characters.")
    .max(20, "First Name should be at most 20 characters."),
    last_name: yup
    .string()
    .required("Last Name is required")
    .min(2, "Last Name should be at least 2 charachters.")
    .max(20, "Last Name should be at most 20 characters."),

    email: yup
    .string()
    .required("Email is required")
    .matches(/^[^@ ]+@[^@ ]+.[^@ .]{2,}$/, "Not a valid email address."),
    password: yup
    .string()
    .required("Password is required")
    .min(6, "Password should be at least 6 charachters."),
})
.required();
export const Update_Member_Schema = yup
    .object({
        first_name: yup
        .string()
        .required("First Name is required")
        .min(6, "First Name should be at least 6 charachters.")
        .max(20, "First Name should be at most 20 characters."),

        last_name: yup
        .string()
        .required("Last Name is required")
        .min(2, "Last Name should be at least 2 charachters.")
        .max(20, "Last Name should be at most 20 characters."),

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
    .max(20, "Title should be at most 20 characters."),
    stageId: yup
    .string()
    .required("StageId is required")
    .min(2, "StageId should be at least 2 charachters.")
    .max(40, "StageId should be at most 20 characters."),
})
.required();
export const Update_Category_Schema = yup
    .object({
    title: yup
    .string()
    .required("Title is required")
    .min(2, "Title should be at least 2 charachters.")
    .max(20, "Title should be at most 20 characters."),
})
.required();
export const Update_Stage_Schema = yup
    .object({
        title: yup
        .string()
        .required("Title is required")
        .min(6, "Title should be at least 6 charachters.")
        .max(20, "Title Name should be at most 20 characters."),

})
.required();


export const Create_Stage_Schema = yup
    .object({
        title: yup
        .string()
        .required("Title is required")
        .min(3, "Title should be at least 6 charachters.")
        .max(20, "Title Name should be at most 20 characters."),
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
        .min(3, "Title should be at least 6 charachters.")
        .max(20, "Title Name should be at most 20 characters."),
        description: yup
        .string()
        .required("Description is required")
        .min(3, "Description should be at least 6 charachters.")
        .max(20, "Description Name should be at most 20 characters."),
        link: yup
        .string()
        .required("Link is required")
        .min(3, "Link should be at least 6 charachters.")
        .max(20, "Link Name should be at most 20 characters."),
        category: yup
        .string()
        .required("Category is required")
        .min(3, "Category should be at least 6 charachters.")
        .max(40, "Category Name should be at most 20 characters."),
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
        .min(3, "Title should be at least 6 charachters.")
        .max(20, "Title Name should be at most 20 characters."),
        description: yup
        .string()
        .required("Description is required")
        .min(3, "Description should be at least 6 charachters.")
        .max(20, "Description Name should be at most 20 characters."),
        link: yup
        .string()
        .required("Link is required")
        .min(3, "Link should be at least 6 charachters.")
        .max(20, "Link Name should be at most 20 characters."),
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
    .min(2, "Title should be at least 2 charachters.")
    .max(20, "Title Name should be at most 20 characters."),
    
}).required();