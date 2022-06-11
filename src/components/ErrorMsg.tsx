import React from 'react';
import './ErrorMsg.css';

interface ErrorMsgProps {
  msg: string;
}

const ErrorMsg = ({ msg }: ErrorMsgProps) => {
  return <p className="ErrorMsg">{msg}</p>;
};

export default ErrorMsg;
