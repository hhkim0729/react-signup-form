import React from 'react';

interface InputBoxProps {
  value: string | boolean;
  type?: string;
  id: string;
  label: string;
  isLabelFirst?: boolean;
  onChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox = ({
  value,
  type = 'text',
  id,
  label,
  isLabelFirst = true,
  onChange,
}: InputBoxProps) => {
  return (
    <div>
      {isLabelFirst && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        id={id}
        onChange={onChange}
        value={type !== 'checkbox' ? String(value) : ''}
        checked={type === 'checkbox' ? Boolean(value) : false}
      />
      {!isLabelFirst && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default InputBox;
