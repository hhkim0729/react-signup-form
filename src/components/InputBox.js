import React from 'react';

const InputBox = ({ type, id, label, isLabelFirst = true }) => {
  return (
    <div>
      {isLabelFirst && <label htmlFor={id}>{label}</label>}
      <input type={type} id={id} />
      {!isLabelFirst && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default InputBox;
