import React, { memo } from 'react';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset' | undefined;
  text: string;
}

const Button = memo(({ type, text }: ButtonProps) => {
  return (
    <button className="button" type={type}>
      {text}
    </button>
  );
});

export default Button;
