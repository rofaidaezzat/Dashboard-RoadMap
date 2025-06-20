import { useState, useRef } from "react";
import Spinner from "./Ui/LoadingSpinner";

interface OTPFormProps {
  onVerify: (code: string) => void;
  isloading?: boolean;
  onClose?: () => void;
}

const OTPForm = ({ onVerify, isloading, onClose }: OTPFormProps) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length === 6) {
      onVerify(fullCode);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2.5 bg-[#333] rounded-xl shadow-2xl border border-white w-[22em] min-h-[15em] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 my-auto">
          <p className="text-center text-white font-bold text-sm md:text-sm lg:text-lg leading-relaxed">
            We have sent a verification code to your email. Please check your
            inbox
            <br />
            and enter the OTP code below to continue.
          </p>
          <div className="flex justify-center space-x-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="text-white h-10 w-10 text-center bg-transparent border border-white rounded transition-all duration-500 text-xl focus:outline-none focus:border-white placeholder-shown:bg-transparent not-placeholder-shown:bg-white not-placeholder-shown:w-4 not-placeholder-shown:h-4"
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={code.join("").length !== 6}
            className={`mx-auto text-white w-[10em] h-[2.5em] border rounded transition-all duration-500 ${
              code.join("").length === 6
                ? "bg-white text-[#000]"
                : "bg-transparent border-white cursor-not-allowed opacity-50"
            }`}
          >
            {isloading ? <Spinner /> : <>Verify</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPForm;
