import { useState, useRef, useEffect } from "react";

interface PinInputProps {
  value: string;
  onChange: (value: string) => void;
  length: number;
  secret?: boolean;
  disabled?: boolean;
}

export default function PinInput({
  value,
  onChange,
  length = 6,
  secret = false,
  disabled = false,
}: PinInputProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the hidden input when container is clicked
  const handleContainerClick = () => {
    if (!disabled) {
      inputRef.current?.focus();
      setFocused(true);
    }
  };

  // Handle focus change
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  // Handle numeric input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // Only allow numbers and limit to the specified length
    if (/^\d*$/.test(newValue) && newValue.length <= length) {
      onChange(newValue);
    }
  };

  // Keep input focused if the user is actively entering a PIN
  useEffect(() => {
    if (focused && value.length < length && !disabled) {
      inputRef.current?.focus();
    }
  }, [value, length, focused, disabled]);

  return (
    <div className="relative">
      {/* Hidden input to handle actual value */}
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        className="opacity-0 absolute w-full h-0"
        maxLength={length}
      />

      {/* Visual PIN display */}
      <div
        className={`flex justify-around cursor-text ${
          disabled ? "cursor-not-allowed" : ""
        }`}
        onClick={handleContainerClick}
      >
        {Array(length)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={`min-w-[41px] h-[41px] flex items-center justify-center border rounded-lg ${
                value.length === index && focused
                  ? "border-black"
                  : "border-gray-300"
              } ${disabled ? "bg-gray-100" : ""}`}
            >
              {index < value.length && (
                <div
                  className={
                    secret
                      ? "w-3 h-3 rounded-full bg-gray-800"
                      : "text-xl font-bold"
                  }
                >
                  {!secret ? value[index] : ""}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
