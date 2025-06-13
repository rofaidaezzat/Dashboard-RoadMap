"use client";
import { AnimatePresence, motion } from "framer-motion";
import "./form.css";
import { FiAlertCircle } from "react-icons/fi";
import { useCreateDashboardLessonMutation } from "@/app/redux/services/crudLesson";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Create_Lesson_Schema } from "@/app/Validation";
import { Create_Lesson_Form } from "@/app/data";
import InputErrorMessage from "../inputErrorMsg";
import { useGetDashboardCategoryQuery } from "@/app/redux/services/crudCategory";
import Spinner from "../LoadingSpinner";



interface Iprops {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ICreate {
  title: string;
  description: string;
  link: string;
  category: string;
  lesson_duration: number;
}
const CreateNewLessonModal = ({ isOpen, setIsOpen }: Iprops) => {
  const { data: Fetchcategory } = useGetDashboardCategoryQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreate>({
    resolver: yupResolver(Create_Lesson_Schema),
  });

  const [createLesson, { isLoading }] = useCreateDashboardLessonMutation();

  // ------------------onsubmit----------------------
  const onSubmit: SubmitHandler<ICreate> = async (data) => {
    try {
      await createLesson({ body: data }).unwrap(); // send to API and wait for success
      reset(); // clear form
      setIsOpen(false); // close modal
    } catch (error) {
      console.error("Error creating member:", error);
    }
  };
  //   ----------------------Render Form-----------------------
  const renderCreateLessonForm = () => {
    return Create_Lesson_Form.filter((input) => input.name !== "category").map(
      ({ name, validation, Label, placeholder, type }, index) => (
        <div key={index} className="flex flex-col">
          <label htmlFor={name} className="flex-1">
            {Label}
          </label>
          <input
            id={name}
            placeholder={placeholder}
            className="input-member flex-1"
            type={type}
            {...register(name, validation)}
          />
          {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
        </div>
      )
    );
  };
  // category select manually
  const renderCategorySelect = (
    <div className="flex gap-4 flex-col">
      <label htmlFor="roadmap" className="flex-1">
        Category
      </label>
      <select
        id="category"
        className="custom-select flex-1 input-member"
        {...register("category")}
      >
        <option value="" className="text-black">
          Select Categort
        </option>
        {Fetchcategory?.map((option) => (
          <option key={option._id} value={option._id} className="text-black">
            {option.title}
          </option>
        ))}
      </select>

      {errors.category && <InputErrorMessage msg={errors.category.message} />}
    </div>
  );
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-center mb-2">
                Add New Lesson
              </h3>
              <form
                className="form-member space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                {renderCreateLessonForm()}
                {renderCategorySelect}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                    disabled={isLoading}
                  >
                    {isLoading ? 
                    (
                      <div  className="flex gap-1 items-center justify-center">
                              <Spinner/>
                              <p>Creating...</p>
                      </div>
                    )
                    : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateNewLessonModal;
