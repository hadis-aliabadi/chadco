import React from 'react';

interface SelectBoxProps {
  label: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  uniqueValues: (string | number)[];
  disabled?: boolean;
}

export const SelectBox: React.FC<SelectBoxProps> = ({
  label,
  name,
  value,
  handleChange,
  uniqueValues = [],
  disabled = false,
}) => {
  return (
   
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="border p-2 w-full"
        disabled={disabled}
      >
        <option value=""> {label}</option>
        {uniqueValues.map((val, index) => (
          <option key={index} value={val}>
            {val}
          </option>
        ))}
      </select>
  
  );
};