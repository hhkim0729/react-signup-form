import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../components/InputBox';
import InputCheckBox from '../components/InputCheckBox';
import ErrorMsg from '../components/ErrorMsg';
import Button from '../components/Button';
import { testRegex, focusInput } from '../utils';
import { UserProps, InfosProps } from '../interface';
import './Signup.css';

interface SignupProps {
  users: UserProps[];
  addUser: ({ email, phone, username }: InfosProps) => void;
  setLoginUser: ({ email, phone, username }: InfosProps) => void;
}

interface CheckListProps {
  email: boolean;
  phone: boolean;
  password: boolean;
  username: boolean;
  referral: boolean;
  [customKey: string]: boolean;
}

const Signup = ({ users, addUser, setLoginUser }: SignupProps) => {
  const [infos, setInfos] = useState({
    email: '',
    phone: '',
    password: '',
    confirm: '',
    username: '',
    referral: '',
    all: false,
    terms: false,
    privacy: false,
    marketing: false,
  });

  const [checkList, setCheckList] = useState({
    email: false,
    phone: false,
    password: false,
    username: false,
    referral: true,
  });

  const [checkDupList, setCheckDupList] = useState({
    email: false,
    phone: false,
    username: false,
  });

  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    focusInput('email');
  }, []);

  const isExist = (id: string, value: string) => {
    let result = false;
    users.forEach((user) => {
      if (user[id] === value) {
        result = true;
      }
    });
    return result;
  };

  const checkDup = (id: string, value: string) => {
    setCheckDupList((prev) => ({
      ...prev,
      [id]: !isExist(id, value),
    }));
  };

  const checkValue = (id: string, value: string) => {
    const newCheckList: CheckListProps = { ...checkList };
    if (['email', 'phone', 'password', 'username'].includes(id)) {
      newCheckList[id] = testRegex(id, value);
    } else if (id === 'referral') {
      newCheckList.referral =
        testRegex('username', value) && isExist('username', value);
    }
    if (['email', 'phone', 'username'].includes(id)) {
      newCheckList[id] && checkDup(id, value);
    }
    setCheckList(newCheckList);
  };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = target;
    let newValue = value;
    if (id === 'phone') {
      newValue = value.slice(0, 11);
    }
    setInfos((prev) => ({
      ...prev,
      [id]: newValue,
    }));
    checkValue(id, newValue);
  };

  const handleChangeCheckbox = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = target;
    const newInfos: InfosProps = { ...infos };
    if (id === 'all') {
      newInfos.terms = checked;
      newInfos.privacy = checked;
      newInfos.marketing = checked;
    } else {
      newInfos[id] = checked;
    }
    if (newInfos.terms && newInfos.privacy && newInfos.marketing) {
      newInfos.all = checked;
    } else if (!checked) {
      newInfos.all = checked;
    }
    setInfos(newInfos);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!infos.email || !checkList.email || !checkDupList.email) {
      setMsg('Please check email');
      focusInput('email');
    } else if (!infos.phone || !checkList.phone || !checkDupList.phone) {
      setMsg('Please check phone number');
      focusInput('phone');
    } else if (!infos.password || !checkList.password) {
      setMsg('Please check password');
      focusInput('password');
    } else if (!infos.confirm || infos.password !== infos.confirm) {
      setMsg('Please check confirm password');
      focusInput('confirm');
    } else if (
      !infos.username ||
      !checkList.username ||
      !checkDupList.username
    ) {
      setMsg('Please check username');
      focusInput('username');
    } else if (infos.referral && !checkList.referral) {
      setMsg('Please check referral username');
      focusInput('referral');
    } else if (!infos.all && (!infos.terms || !infos.privacy)) {
      setMsg('Please agree to the required terms');
    } else {
      addUser(infos);
      setLoginUser(infos);
      navigate('../welcome', { replace: true });
    }
  };

  return (
    <section className="Signup">
      <p className="Signup__msg">
        <span className="Signup__star">*</span> means required field
      </p>
      <form className="Signup__form" onSubmit={handleSubmit}>
        <InputBox
          value={infos.email}
          type="email"
          id="email"
          legend="Email"
          onChange={handleChange}
        />
        <ErrorMsg
          msg={
            infos.email.length > 0 && !checkList.email
              ? 'Invalid email'
              : checkList.email && !checkDupList.email
              ? 'Duplicated email'
              : ''
          }
        />
        <InputBox
          value={infos.phone}
          type="tel"
          id="phone"
          legend="Phone"
          onChange={handleChange}
        />
        <ErrorMsg
          msg={
            infos.phone.length > 0 && !checkList.phone
              ? 'Invalid phone number (only numbers)'
              : checkList.phone && !checkDupList.phone
              ? 'Duplicated phone number'
              : ''
          }
        />
        <InputBox
          value={infos.password}
          type="password"
          id="password"
          legend="Password"
          onChange={handleChange}
        />
        <ErrorMsg
          msg={
            infos.password.length > 0 && !checkList.password
              ? 'at least 1 lower case, 1 upper case, 1 number'
              : ''
          }
        />
        <InputBox
          value={infos.confirm}
          type="password"
          id="confirm"
          legend="Confirm Password"
          onChange={handleChange}
        />
        <ErrorMsg
          msg={
            infos.confirm.length > 0 && infos.password !== infos.confirm
              ? `Password doesn't match`
              : ''
          }
        />
        <InputBox
          value={infos.username}
          type="text"
          id="username"
          legend="Username"
          onChange={handleChange}
        />
        <ErrorMsg
          msg={
            infos.username.length > 0 && !checkList.username
              ? 'Invalid username'
              : checkList.username && !checkDupList.username
              ? 'Duplicated username'
              : ''
          }
        />
        <InputBox
          value={infos.referral}
          type="text"
          id="referral"
          legend="Referral Username"
          isRequired={false}
          onChange={handleChange}
        />
        <ErrorMsg
          msg={
            infos.referral.length > 0 && !checkList.referral
              ? 'Invalid username'
              : ''
          }
        />
        <InputCheckBox
          value={infos.all}
          id="all"
          label="I agree to all"
          isRequired={false}
          onChange={handleChangeCheckbox}
        />
        <InputCheckBox
          value={infos.terms}
          id="terms"
          label="I agree to the Terms and Conditions"
          onChange={handleChangeCheckbox}
        />
        <InputCheckBox
          value={infos.privacy}
          id="privacy"
          label="I agree to the Privacy Policy"
          onChange={handleChangeCheckbox}
        />
        <InputCheckBox
          value={infos.marketing}
          id="marketing"
          label="I agree to receive marketing emails"
          isRequired={false}
          onChange={handleChangeCheckbox}
        />
        <Button type="submit" text="Sign up" />
        <ErrorMsg msg={msg} />
      </form>
    </section>
  );
};

export default Signup;
