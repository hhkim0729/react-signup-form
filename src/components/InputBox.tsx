import React, { memo } from 'react';
import './InputBox.css';

interface InputBoxProps {
  value: string;
  type?: string;
  id: string;
  legend: string;
  isRequired?: boolean;
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = memo(
  ({
    value,
    type = 'text',
    id,
    legend,
    isRequired = true,
    onChange,
    onBlur,
  }: InputBoxProps) => (
    <fieldset className="InputBox">
      <legend className="InputBox__legend">
        {legend}
        {isRequired && <span className="InputBox__star">*</span>}
      </legend>
      <input
        className="InputBox__input"
        type={type}
        id={id}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
    </fieldset>
  )
);

export default InputBox;
