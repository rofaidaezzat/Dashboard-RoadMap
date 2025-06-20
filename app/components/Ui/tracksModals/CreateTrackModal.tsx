import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import "./StyleForm.css";
import { SubmitHandler, useForm, useFieldArray, Path } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import InputErrorMessage from "@/app/components/Ui/inputErrorMsg";
import { useCreateDashboardMemberMutation } from "@/app/redux/services/crudTracks";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { CreateTrackSchema } from "@/app/Validation";
import { Create_Track_Form_FORM } from "./../../../data/index";
import Spinner from "../LoadingSpinner";

interface Iprops {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ICreateFormInput {
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

const CreateNewTrack = ({ isOpen, setIsOpen }: Iprops) => {
  const [CreateTrack, { isLoading, isSuccess }] =
    useCreateDashboardMemberMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreateFormInput>({
    resolver: yupResolver(CreateTrackSchema) as any,
    defaultValues: {
      header: [{ title: "", subTitle: "" }],
      core_languages: [{ name: "", icon: "" }],
      popular_frameworks: [{ name: "", icon: "" }],
      development_tools: [{ name: "", icon: "" }],
      description: "",
      career_opportunities: "",
      advanced_topics: "",
      project_based_learning: "",
      testimonials: "",
      title: "",
      requirments: "",
      target_audience: "",
    },
  });

  const headerArray = useFieldArray({ control, name: "header" });
  const coreLanguagesArray = useFieldArray({ control, name: "core_languages" });
  const frameworksArray = useFieldArray({
    control,
    name: "popular_frameworks",
  });
  const toolsArray = useFieldArray({ control, name: "development_tools" });

  //Handlers
  const onSubmit: SubmitHandler<ICreateFormInput> = (data) => {
    CreateTrack({
      body: {
        ...data,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("You Create member succussefully", {
        position: "bottom-center",
        duration: 2000,
        style: {
          backgroundColor: "black",
          color: "white",
          width: "fit-content",
        },
      });
      setIsOpen(false);
    }
  }, [isSuccess]);

  //render
  const renderCreateFrom = Create_Track_Form_FORM.map((input, idx) => (
    <div key={idx} className=" flex  gap-4 flex-col">
      <label htmlFor={input.name} className="flex-1">
        {input.Label}
      </label>
      <input
        id={input.name}
        placeholder={input.placeholder}
        className="input-member flex-1"
        type={input.type}
        {...register(input.name as Path<ICreateFormInput>)}
      />
      {errors[input.name as keyof ICreateFormInput] && (
        <InputErrorMessage
          msg={errors[input.name as keyof ICreateFormInput]?.message}
        />
      )}
    </div>
  ));

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
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-3xl shadow-xl cursor-default relative flex flex-col max-h-[90vh]"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10 overflow-y-auto pr-2">
              <h3 className="text-3xl font-bold text-center mb-2">
                Create Track
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="form-member">
                {renderCreateFrom}

                {/* Core Languages */}
                <div className="mb-4">
                  <label className="block font-bold mb-1">Core Languages</label>
                  {coreLanguagesArray.fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-2">
                      <input
                        {...register(
                          `core_languages.${index}.name` as Path<ICreateFormInput>
                        )}
                        placeholder="Name"
                        className="input-member"
                      />
                      <input
                        {...register(
                          `core_languages.${index}.icon` as Path<ICreateFormInput>
                        )}
                        placeholder="Icon"
                        className="input-member"
                      />
                      {errors.core_languages?.[index]?.name && (
                        <InputErrorMessage
                          msg={errors.core_languages?.[index]?.name?.message}
                        />
                      )}
                      {errors.core_languages?.[index]?.icon && (
                        <InputErrorMessage
                          msg={errors.core_languages?.[index]?.icon?.message}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => coreLanguagesArray.remove(index)}
                        disabled={coreLanguagesArray.fields.length === 1}
                        style={{
                          opacity:
                            coreLanguagesArray.fields.length === 1 ? 0.5 : 1,
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      coreLanguagesArray.append({ name: "", icon: "" })
                    }
                  >
                    Add Core
                  </button>
                </div>

                {/* Popular Frameworks */}
                <div className="mb-4">
                  <label className="block font-bold mb-1">
                    Popular Frameworks
                  </label>
                  {frameworksArray.fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-2">
                      <input
                        {...register(
                          `popular_frameworks.${index}.name` as Path<ICreateFormInput>
                        )}
                        placeholder="Name"
                        className="input-member"
                      />
                      <input
                        {...register(
                          `popular_frameworks.${index}.icon` as Path<ICreateFormInput>
                        )}
                        placeholder="Icon"
                        className="input-member"
                      />
                      {errors.popular_frameworks?.[index]?.name && (
                        <InputErrorMessage
                          msg={
                            errors.popular_frameworks?.[index]?.name?.message
                          }
                        />
                      )}
                      {errors.popular_frameworks?.[index]?.icon && (
                        <InputErrorMessage
                          msg={
                            errors.popular_frameworks?.[index]?.icon?.message
                          }
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => frameworksArray.remove(index)}
                        disabled={frameworksArray.fields.length === 1}
                        style={{
                          opacity:
                            frameworksArray.fields.length === 1 ? 0.5 : 1,
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      frameworksArray.append({ name: "", icon: "" })
                    }
                  >
                    Add Framework
                  </button>
                </div>

                {/* Development Tools */}
                <div className="mb-4">
                  <label className="block font-bold mb-1">
                    Development Tools
                  </label>
                  {toolsArray.fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-2">
                      <input
                        {...register(
                          `development_tools.${index}.name` as Path<ICreateFormInput>
                        )}
                        placeholder="Name"
                        className="input-member"
                      />
                      <input
                        {...register(
                          `development_tools.${index}.icon` as Path<ICreateFormInput>
                        )}
                        placeholder="Icon"
                        className="input-member"
                      />
                      {errors.development_tools?.[index]?.name && (
                        <InputErrorMessage
                          msg={errors.development_tools?.[index]?.name?.message}
                        />
                      )}
                      {errors.development_tools?.[index]?.icon && (
                        <InputErrorMessage
                          msg={errors.development_tools?.[index]?.icon?.message}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => toolsArray.remove(index)}
                        disabled={toolsArray.fields.length === 1}
                        style={{
                          opacity: toolsArray.fields.length === 1 ? 0.5 : 1,
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => toolsArray.append({ name: "", icon: "" })}
                  >
                    Add Tool
                  </button>
                </div>

                {/* Header */}
                <div className="mb-4">
                  <label className="block font-bold mb-1">Header</label>
                  {headerArray.fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-2">
                      <input
                        {...register(
                          `header.${index}.title` as Path<ICreateFormInput>
                        )}
                        placeholder="Title"
                        className="input-member"
                      />
                      <input
                        {...register(
                          `header.${index}.subTitle` as Path<ICreateFormInput>
                        )}
                        placeholder="SubTitle"
                        className="input-member"
                      />
                      {errors.header?.[index]?.title && (
                        <InputErrorMessage
                          msg={errors.header?.[index]?.title?.message}
                        />
                      )}
                      {errors.header?.[index]?.subTitle && (
                        <InputErrorMessage
                          msg={errors.header?.[index]?.subTitle?.message}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => headerArray.remove(index)}
                        disabled={headerArray.fields.length === 1}
                        style={{
                          opacity: headerArray.fields.length === 1 ? 0.5 : 1,
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      headerArray.append({ title: "", subTitle: "" })
                    }
                  >
                    Add Header
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                  >
                    cancel
                  </button>
                  <button className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded">
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-1">
                        <Spinner />
                        <p>Creating...</p>
                      </div>
                    ) : (
                      "Create"
                    )}
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
