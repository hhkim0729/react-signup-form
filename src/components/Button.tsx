import React from 'react';
import './Button.css';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset' | undefined;
  text: string;
}

const Button = ({ type, text }: ButtonProps) => {
  return (
    <button className="Button" type={type}>
      {text}
    </button>
  );
};

export default Button;
