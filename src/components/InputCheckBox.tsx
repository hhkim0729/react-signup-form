import React, { memo } from 'react';
import './InputCheckBox.css';

interface InputCheckBoxProps {
  value: boolean;
  id: string;
  label: string;
  isRequired?: boolean;
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = memo(
  ({ value, id, label, isRequired = true, onChange }: InputCheckBoxProps) => {
    return (
      <div className="InputCheckBox">
        <input
          className="InputCheckBox__input"
          type="checkbox"
          id={id}
          onChange={onChange}
          checked={value}
        />
        <label htmlFor={id} className="InputCheckBox__label">
          {label}
          <span className="InputCheckBox__star">{isRequired && `*`}</span>
        </label>
      </div>
    );
  }
);

export default InputBox;
