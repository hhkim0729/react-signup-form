import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../components/InputBox';
import ErrorMsg from '../components/ErrorMsg';
import Button from '../components/Button';
import { testRegex, focusInput } from '../utils';
import { UserProps, InfosProps } from '../interface';

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
      [id]: isExist(id, value) ? false : true,
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
      newValue = value.substring(0, 11);
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
    <section>
      <h1>Be my guest!</h1>
      <form onSubmit={handleSubmit}>
        <InputBox
          value={infos.email}
          type="email"
          id="email"
          label="Email"
          onChange={handleChange}
        />
        {infos.email.length > 0 && !checkList.email && (
          <ErrorMsg msg="Invalid email" />
        )}
        {checkList.email && !checkDupList.email && (
          <ErrorMsg msg="Duplicated email" />
        )}
        <InputBox
          value={infos.phone}
          type="tel"
          id="phone"
          label="Phone"
          onChange={handleChange}
        />
        {infos.phone.length > 0 && !checkList.phone && (
          <ErrorMsg msg="Invalid phone number" />
        )}
        {checkList.phone && !checkDupList.phone && (
          <ErrorMsg msg="Duplicated phone number" />
        )}
        <InputBox
          value={infos.password}
          type="password"
          id="password"
          label="Password"
          onChange={handleChange}
        />
        {infos.password.length > 0 && !checkList.password && (
          <ErrorMsg msg="Invalid password (at least 1 lower case, 1 upper case, 1 number)" />
        )}
        <InputBox
          value={infos.confirm}
          type="password"
          id="confirm"
          label="Confirm Password"
          onChange={handleChange}
        />
        {infos.confirm.length > 0 && infos.password !== infos.confirm && (
          <ErrorMsg msg="Password doesn't match" />
        )}
        <InputBox
          value={infos.username}
          type="text"
          id="username"
          label="Username"
          onChange={handleChange}
        />
        {infos.username.length > 0 && !checkList.username && (
          <ErrorMsg msg="Invalid username" />
        )}
        {checkList.username && !checkDupList.username && (
          <ErrorMsg msg="Duplicated username" />
        )}
        <InputBox
          value={infos.referral}
          type="text"
          id="referral"
          label="Referral Username"
          onChange={handleChange}
        />
        {infos.referral.length > 0 && !checkList.referral && (
          <ErrorMsg msg="Invalid username" />
        )}
        <InputBox
          value={infos.all}
          type="checkbox"
          id="all"
          label="I agree to all"
          isLabelFirst={false}
          onChange={handleChangeCheckbox}
        />
        <InputBox
          value={infos.terms}
          type="checkbox"
          id="terms"
          label="I agree to the Terms and Conditions (required)"
          isLabelFirst={false}
          onChange={handleChangeCheckbox}
        />
        <InputBox
          value={infos.privacy}
          type="checkbox"
          id="privacy"
          label="I agree to the Privacy Policy (required)"
          isLabelFirst={false}
          onChange={handleChangeCheckbox}
        />
        <InputBox
          value={infos.marketing}
          type="checkbox"
          id="marketing"
          label="I agree to receive marketing emails (optional)"
          isLabelFirst={false}
          onChange={handleChangeCheckbox}
        />
        <ErrorMsg msg={msg} />
        <Button type="submit" text="Submit" />
      </form>
    </section>
  );
};

export default Signup;
