"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import "./form.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useUpdateDashboardLessonMutation } from "@/app/redux/services/crudLesson";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { clickedIdAction } from "@/app/redux/features/clickedIdSlice";
import toast from "react-hot-toast";
import InputErrorMessage from "../inputErrorMsg";
import { Update_Lesson_Form } from "@/app/data";
import { Update_Lesson_Schema } from "@/app/Validation";
import Spinner from "../LoadingSpinner";
interface Iprops {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  LessonData: {
    _id: string;
    title: string;
    description: string;
    link: string;
  };
}

interface IUpdate {
  title: string;
  description: string;
  link: string;
}
const UpdateLessonModal = ({ isOpen, setIsOpen, LessonData }: Iprops) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdate>({
    resolver: yupResolver(Update_Lesson_Schema),
  });

  const [updateLesson, { isLoading }] = useUpdateDashboardLessonMutation();

  useEffect(() => {
    if (LessonData) {
      reset({
        title: LessonData.title,
        description: LessonData.description,
        link: LessonData.link,
      });
    }
  }, [LessonData, reset]);
  //   ------------------onsubmit-------------
  const onSubmit: SubmitHandler<IUpdate> = async (data) => {
    try {
      await updateLesson({ _id: LessonData._id, body: data }).unwrap();
      reset();
      dispatch(clickedIdAction(null));
      toast.success("You Updated Member successfully", {
        position: "bottom-center",
        duration: 2000,
        style: {
          backgroundColor: "black",
          color: "white",
          width: "fit-content",
        },
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Error updating member:", error);
    }
  };
  // ------------------render form---------------
  const renderUpdateLessonForm = () => {
    return Update_Lesson_Form.map(
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
                Update Member
              </h3>
              <form className="form-member" onSubmit={handleSubmit(onSubmit)}>
                {renderUpdateLessonForm()}
                <div className="flex gap-2 mt-4">
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
                  >
                    {isLoading ? (
                      <div className="flex gap-1 items-center justify-center" >
                            <Spinner/>
                            <p>Updating...</p>
                      </div>
                    )
                    : "Update"}
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
export default UpdateLessonModal;
