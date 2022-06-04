import React from 'react';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset' | undefined;
  text: string;
}

const Button = ({ type, text }: ButtonProps) => {
  return <button type={type}>{text}</button>;
};

export default Button;
