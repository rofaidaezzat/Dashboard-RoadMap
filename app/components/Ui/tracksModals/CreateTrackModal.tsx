
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import './StyleForm.css'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputErrorMessage from "@/app/components/Ui/inputErrorMsg";
import {  useCreateDashboardMemberMutation } from "@/app/redux/services/crudTracks";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { CreateTrackSchema } from '@/app/Validation';
import { Create_Track_Form_FORM } from './../../../data/index';
import Spinner from "../LoadingSpinner";

interface Iprops {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


interface ICreateFormInput {
  title:string
  requirments:string
  target_audience:string

}


const CreateNewTrack = ({ isOpen, setIsOpen }: Iprops) => {

const   [CreateTrack,{isLoading,isSuccess}]=useCreateDashboardMemberMutation()


  const {register, handleSubmit ,formState:{errors},} = useForm<ICreateFormInput>({
          resolver: yupResolver(CreateTrackSchema), 
          });


    //Handlers
    const onSubmit:SubmitHandler<ICreateFormInput>=(data)=>{


      CreateTrack({
        body:{
          title:data.title,
          requirments:data.requirments,
          target_audience:data.target_audience
        }
      })
    }

    useEffect(() => {
      if (isSuccess ) {
      toast.success("You Create member succussefully",{
                          position:"bottom-center",
                          duration:2000,
                          style:{
                          backgroundColor:"black",
                          color:"white",
                          width:"fit-content",
                          },
                      })
      setIsOpen(false)
    }
}, [isSuccess]);


  //render
  const renderCreateFrom=Create_Track_Form_FORM.map((input,idx)=>(
    <div key={idx} className=" flex  gap-4 flex-col">
      <label htmlFor={input.name} className="flex-1">
        {input.Label}
      </label>
      <input
        id={input.name}
        placeholder={input.placeholder}
        className="input-member flex-1"
        type={input.type}
        {...register(input.name,input.validation)}
      />
      {errors[input.name]&&<InputErrorMessage msg={errors[input.name]?.message}/>}
    </div>
  ))


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
                Create Track
              </h3>
              <form  onSubmit={handleSubmit(onSubmit)} className="form-member">{renderCreateFrom}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  cancel
                </button>
                <button
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  {
                    isLoading?(
                      <div className="flex items-center justify-center gap-1">
                      <Spinner/>
                      <p>Creating...</p>
                      </div>
                      
                    ):(
                      "Create"
                    )
                  }
                
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

export default CreateNewTrack;
