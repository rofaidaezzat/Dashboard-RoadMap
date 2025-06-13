"use client";
import { useDispatch } from "react-redux";
import "./Form.css";
import { useUpdateDashboardCategoryMutation } from "@/app/redux/services/crudCategory";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useEffect } from "react";
import { Update_Category_Schema } from "@/app/Validation";
import { Update_Category_FORM } from "@/app/data";
import InputErrorMessage from "../inputErrorMsg";
import { clickedIdAction } from "@/app/redux/features/clickedIdSlice";
import Spinner from "../LoadingSpinner";
interface Iprops {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  CategoryData: {
    _id: string;
    title: string;
  };
}
interface IUpdate {
  title: string;
}
const UpdateCategoryModal = ({ isOpen, setIsOpen, CategoryData }: Iprops) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdate>({
    resolver: yupResolver(Update_Category_Schema),
  });

  const [updateCatedory, { isLoading }] = useUpdateDashboardCategoryMutation();
  useEffect(() => {
    if (CategoryData) {
      reset({
        title: CategoryData.title,
      });
    }
  }, [CategoryData, reset]);
  //   ---------------------onsubmit----------------------
  const onSubmit: SubmitHandler<IUpdate> = async (data) => {
    try {
      await updateCatedory({ _id: CategoryData._id, body: data }).unwrap();
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
  // ------------------------Render------------------------
  const renderUpdateCategoryForm = () => {
    return Update_Category_FORM.map(
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
                Update Category
              </h3>
              <form className="form-member" onSubmit={handleSubmit(onSubmit)}>
                {renderUpdateCategoryForm()}
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
                    {isLoading ? 
                    (
                      <div className="flex items-center justify-center">
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

export default UpdateCategoryModal;
