import React from 'react';
import SignUp from '../SignUp';
import Header from '../Header';
import { Bot } from './styles';

const Cadastro = () => {
  return (
    <>
      <Header />
      <SignUp />
      <Bot
        src="https://files.directtalk.com.br/1.0/api/file/public/afb4c843-092e-4b60-83b7-c35653142eb6/content-inline" />
    </>
  );
};

export default Cadastro;
