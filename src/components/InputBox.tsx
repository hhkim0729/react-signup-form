import React from 'react';
import './InputBox.css';

interface InputBoxProps {
  value: string;
  type?: string;
  id: string;
  legend: string;
  isRequired?: boolean;
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({
  value,
  type = 'text',
  id,
  legend,
  isRequired = true,
  onChange,
}: InputBoxProps) => {
  return (
    <fieldset className="InputBox">
      <legend className="InputBox__legend">
        {legend}
        <span className="InputBox__star">{isRequired && `*`}</span>
      </legend>
      <input
        className="InputBox__input"
        type={type}
        id={id}
        onChange={onChange}
        value={value}
      />
    </fieldset>
  );
};

export default InputBox;
