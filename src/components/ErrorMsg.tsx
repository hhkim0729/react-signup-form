import React, { memo } from 'react';
import './ErrorMsg.css';

interface ErrorMsgProps {
  msg: string;
}

const ErrorMsg = memo(({ msg }: ErrorMsgProps) => {
  return <p className="ErrorMsg">{msg}</p>;
});

export default ErrorMsg;
