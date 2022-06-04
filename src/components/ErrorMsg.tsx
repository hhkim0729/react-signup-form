import React from 'react';

interface ErrorMsgProps {
  msg: string;
}

const ErrorMsg = ({ msg }: ErrorMsgProps) => {
  return (
    <div>
      <span>{msg}</span>
    </div>
  );
};

export default ErrorMsg;
