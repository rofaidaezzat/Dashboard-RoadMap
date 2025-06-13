import { useState, useRef } from "react";

interface OTPFormProps {
  onVerify: (code: string) => void;
}

const OTPForm = ({ onVerify }: OTPFormProps) => {
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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2.5 bg-[#333] rounded-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] border border-white backdrop-blur-md w-[17em] h-[12em]"
    >
      <div className="flex flex-col gap-2.5 my-auto">
        <p className="text-center text-white font-bold">
          We’ve sent a verification code to your email. Please check your inbox
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
              className="text-white h-8 w-8 text-center bg-transparent border border-white rounded transition-all duration-500 text-lg focus:outline-none focus:border-white placeholder-shown:bg-transparent not-placeholder-shown:bg-white not-placeholder-shown:w-4 not-placeholder-shown:h-4"
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={code.join("").length !== 6}
          className={`mx-auto text-white w-[8.5em] h-[2.3em] border rounded transition-all duration-500 ${
            code.join("").length === 6
              ? "bg-white text-black"
              : "bg-transparent border-white cursor-not-allowed opacity-50"
          }`}
        >
          Verify
        </button>
      </div>
    </form>
  );
};

export default OTPForm;
