import React from "react";

interface TextAreaProps {
  placeholder: string;
  value: string | number;
  name?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ placeholder, value, name, className, onChange }) => {
  return (
      <textarea
        rows={4}
        className={`bg-[#1b1b1b] rounded-[10px_10px_0px_0px] px-4 py-2 text-gray-200 border-b border-gray-600 placeholder:text-gray-400  focus:outline-1 focus:outline-gray-600 hover:outline-b-2 hover:outline-gray-600 w-full transition ${className}`}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        
      />
  );
};

export default TextArea;