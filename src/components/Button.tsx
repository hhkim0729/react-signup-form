import React, { memo } from 'react';
import './Button.css';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset' | undefined;
  text: string;
}

const Button = memo(({ type, text }: ButtonProps) => {
  return (
    <button className="Button" type={type}>
      {text}
    </button>
  );
});

export default Button;
