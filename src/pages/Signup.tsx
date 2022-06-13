import React, { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../components/InputBox';
import InputCheckBox from '../components/InputCheckBox';
import ErrorMsg from '../components/ErrorMsg';
import Button from '../components/Button';
import { focusInput } from '../utils';
import { User, TextInfos, CheckInfos } from '../interface';
import useTextInputs from '../hooks/useTextInputs';
import useCheckInputs from '../hooks/useCheckInputs';
import { debounce } from 'lodash';
import { addUser } from '../api/users';
import './Signup.css';

interface SignupProps {
  setLoginUser: ({ email, phone, username }: User) => void;
}

const initialTextInfos: TextInfos = {
  email: { value: '', isValidated: false, isNotDuplicated: false },
  phone: { value: '', isValidated: false, isNotDuplicated: false },
  password: { value: '', isValidated: false },
  confirm: { value: '' },
  username: { value: '', isValidated: false, isNotDuplicated: false },
  referral: { value: '', isValidated: false },
};

const initialCheckInfos: CheckInfos = {
  all: false,
  terms: false,
  privacy: false,
  marketing: false,
};

const Signup = memo(({ setLoginUser }: SignupProps) => {
  const [textInfos, onChangeTextInfos, checkExist] =
    useTextInputs(initialTextInfos);
  const [checkInfos, onChangeCheckInfos] = useCheckInputs(initialCheckInfos);
  const { email, phone, password, confirm, username, referral } = textInfos;

  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    focusInput('email');
  }, []);

  const debounceCheckExist = useMemo(
    () =>
      debounce((e) => {
        checkExist(e);
      }, 400),
    [checkExist]
  );

  const handleChangeInfos = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeTextInfos(e);
      debounceCheckExist(e);
    },
    [onChangeTextInfos, debounceCheckExist]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const check = Object.entries(textInfos).find(([key, input]) => {
        return (
          !input.value ||
          ('isValidated' in input && !input.isValidated) ||
          ('isNotDuplicated' in input && !input.isNotDuplicated)
        );
      });
      if (check) {
        const [key] = check;
        setMsg(`Please check ${key}`);
        focusInput(key);
      } else if (
        !checkInfos.all &&
        (!checkInfos.terms || !checkInfos.privacy)
      ) {
        setMsg('Please agree to the required terms');
      } else {
        const newUser = {
          email: email.value,
          phone: phone.value,
          username: username.value,
        };
        addUser(newUser);
        setLoginUser(newUser);
        navigate('../welcome', { replace: true });
      }
    },
    [textInfos, checkInfos, email, phone, username, setLoginUser, navigate]
  );

  return (
    <section className="Signup">
      <p className="Signup__msg">
        <span className="accent-color">*</span> means required field
      </p>
      <form className="Signup__form" onSubmit={handleSubmit}>
        <InputBox
          value={email.value}
          type="email"
          id="email"
          legend="Email"
          onChange={handleChangeInfos}
        />
        <ErrorMsg
          msg={
            email.value.length > 0 && !email.isValidated
              ? 'Invalid email'
              : email.isValidated && !email.isNotDuplicated
              ? 'Duplicated email'
              : ''
          }
        />
        <InputBox
          value={phone.value}
          type="tel"
          id="phone"
          legend="Phone"
          onChange={handleChangeInfos}
        />
        <ErrorMsg
          msg={
            phone.value.length > 0 && !phone.isValidated
              ? 'Invalid phone number (only numbers)'
              : phone.isValidated && !phone.isNotDuplicated
              ? 'Duplicated phone number'
              : ''
          }
        />
        <InputBox
          value={password.value}
          type="password"
          id="password"
          legend="Password"
          onChange={onChangeTextInfos}
        />
        <ErrorMsg
          msg={
            password.value.length > 0 && !password.isValidated
              ? 'at least 1 lower case, 1 upper case, 1 number (8 ~ 20 char)'
              : ''
          }
        />
        <InputBox
          value={confirm.value}
          type="password"
          id="confirm"
          legend="Confirm Password"
          onChange={onChangeTextInfos}
        />
        <ErrorMsg
          msg={
            confirm.value.length > 0 && password.value !== confirm.value
              ? `Password doesn't match`
              : ''
          }
        />
        <InputBox
          value={username.value}
          type="text"
          id="username"
          legend="Username"
          onChange={handleChangeInfos}
        />
        <ErrorMsg
          msg={
            username.value.length > 0 && !username.isValidated
              ? 'Invalid username'
              : username.isValidated && !username.isNotDuplicated
              ? 'Duplicated username'
              : ''
          }
        />
        <InputBox
          value={referral.value}
          type="text"
          id="referral"
          legend="Referral Username"
          isRequired={false}
          onChange={handleChangeInfos}
        />
        <ErrorMsg
          msg={
            referral.value.length > 0 && !referral.isValidated
              ? 'Invalid username'
              : ''
          }
        />
        <InputCheckBox
          value={checkInfos.all}
          id="all"
          label="I agree to all"
          isRequired={false}
          onChange={onChangeCheckInfos}
        />
        <InputCheckBox
          value={checkInfos.terms}
          id="terms"
          label="I agree to the Terms and Conditions"
          onChange={onChangeCheckInfos}
        />
        <InputCheckBox
          value={checkInfos.privacy}
          id="privacy"
          label="I agree to the Privacy Policy"
          onChange={onChangeCheckInfos}
        />
        <InputCheckBox
          value={checkInfos.marketing}
          id="marketing"
          label="I agree to receive marketing emails"
          isRequired={false}
          onChange={onChangeCheckInfos}
        />
        <div className="Signup__button-wrapper">
          <Button type="submit" text="Sign up" />
        </div>
        <div className="accent-color">
          <ErrorMsg msg={msg} />
        </div>
      </form>
    </section>
  );
});

export default Signup;
