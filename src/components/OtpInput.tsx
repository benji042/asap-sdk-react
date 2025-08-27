import { useState, useRef, useEffect } from "react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length: number;
  disabled?: boolean;
}

export default function OtpInput({
  value,
  onChange,
  length = 6,
  disabled = false,
}: OtpInputProps) {
  const [, setActiveInput] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  useEffect(() => {
    // Focus on first empty input or last input if all filled
    const indexOfFirstEmptyInput =
      value.split("").findIndex((v) => v === "") || value.length;
    const newActiveInput = Math.min(indexOfFirstEmptyInput, length - 1);

    // Don't focus if disabled
    if (!disabled) {
      inputRefs.current[newActiveInput]?.focus();
    }
  }, [value, length, disabled]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const target = e.target;
    const newValue = target.value;

    // Validate input is a number
    // if (newValue && !/^[0-9]$/.test(newValue)) {
    //   return;
    // }

    // Update the value
    const newOtp = value.split("");
    newOtp[index] = newValue;
    onChange(newOtp.join(""));

    // Move to next input if current one is filled
    if (newValue && index < length - 1) {
      setActiveInput(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Handle backspace
    if (e.key === "Backspace") {
      if (index > 0 && !value[index]) {
        setActiveInput(index - 1);
      }

      const newOtp = value.split("");
      newOtp[index] = "";
      onChange(newOtp.join(""));
    }

    // Handle left arrow
    if (e.key === "ArrowLeft" && index > 0) {
      setActiveInput(index - 1);
    }

    // Handle right arrow
    if (e.key === "ArrowRight" && index < length - 1) {
      setActiveInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Validate that pasted content is all numbers
    if (!/^[0-9]+$/.test(pastedData)) {
      return;
    }

    // Only use the first 'length' characters
    const pastedOtp = pastedData.slice(0, length);

    // Fill the OTP inputs
    onChange(pastedOtp.padEnd(length, "").slice(0, length));
  };

  return (
    <div className="flex justify-between items-center gap-2 mb-1">
      {Array(length)
        .fill(null)
        .map((_, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d{1}"
            maxLength={1}
            className="w-full h-14 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:border-black focus:outline-none disabled:bg-gray-100 disabled:text-gray-500"
            value={value[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            onFocus={() => setActiveInput(index)}
            disabled={disabled}
          />
        ))}
    </div>
  );
}
