"use client";
import React, { useState } from "react";
import "./LoginForm.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/app/Validation";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { IErrorResponse } from "@/app/interfaces";
import { LOGIN_FORM } from "@/app/data";
import InputErrorMessage from "../Ui/inputErrorMsg";
import Button from "../Ui/Button";
import { useDispatch } from "react-redux";
import { AccessTokenAction } from "@/app/redux/features/accessTokenSlice";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm = () => {
  const Dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  // ** Handler
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);

    // Fullfiled
    try {
      const { status, data: resData } = await axios.post(
        "https://b684-102-189-220-226.ngrok-free.app/auth/login",
        data,
        { withCredentials: true }
      );
      console.log(resData);
      if (status === 200) {
        //set accesstoken
        localStorage.setItem("loggedInUser", JSON.stringify(resData));
        localStorage.setItem("First-name", JSON.stringify(resData.first_name));
        localStorage.setItem("last-name", JSON.stringify(resData.last_name));
        localStorage.setItem("email", JSON.stringify(resData.email));
        localStorage.setItem("role", JSON.stringify(resData.role));
        localStorage.setItem("id", JSON.stringify(resData.id));
        const accessToken = resData.accessToken;
        localStorage.setItem("accessToken", accessToken);
        Dispatch(AccessTokenAction(resData.accessToken));
        const roleUser = localStorage.getItem("role");
        const roleData = roleUser ? JSON.parse(roleUser) === "admin" : null;

        if (roleData) {
          toast.success("You will navigate to the home page after 1 seconds", {
            position: "bottom-center",
            duration: 3000,
            style: {
              backgroundColor: "black",
              color: "white",
              width: "fit-content",
            },
          });
          setTimeout(() => {
            location.replace("/");
          }, 2000);
        } else {
          toast.error("The user must be admin", {
            position: "bottom-center",
            duration: 4000,
            style: {
              backgroundColor: "black",
              color: "white",
              width: "fit-content",
            },
          });
        }
      }

      //Reject =>field => optional
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      toast.error(`${errorObj.response?.data?.error.message}`, {
        position: "bottom-center",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  {
    /**Render */
  }
  const renderLogInUpForm = LOGIN_FORM.map(
    ({ name, Label, placeholder, type, validation }, idx) => (
      <div key={idx}>
        <div className="flex-column ">
          <label>{Label}</label>
        </div>
        <div className="inputForm">
          <input
            placeholder={placeholder}
            className="input"
            type={type}
            {...register(name, validation)}
          />
        </div>
        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
      </div>
    )
  );

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="text-center font-bold text-[30px] text-white">LogIn</h3>
      {renderLogInUpForm}
      <div className="flex-row">
        <span className="span">Forgot password?</span>
      </div>

      <Button isLoading={isLoading} className="button-submit">
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
