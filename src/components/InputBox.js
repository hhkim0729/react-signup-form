import React from 'react';

const InputBox = ({
  value,
  type,
  id,
  label,
  isLabelFirst = true,
  onChange,
}) => {
  return (
    <div>
      {isLabelFirst && <label htmlFor={id}>{label}</label>}
      <input type={type} id={id} onChange={onChange} value={value} />
      {!isLabelFirst && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default InputBox;
