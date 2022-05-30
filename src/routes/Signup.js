import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBox from '../components/InputBox';

const Signup = ({ users, addUser }) => {
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

  const isExist = (id, value) => {
    let result = false;
    users.forEach((user) => {
      if (user[id] === value) {
        result = true;
      }
    });
    return result;
  };

  const checkDup = (id, value) => {
    const newCheckDupList = { ...checkDupList };
    newCheckDupList[id] = true;
    users.forEach((user) => {
      if (user[id] === value) {
        newCheckDupList[id] = false;
      }
    });
    setCheckDupList(newCheckDupList);
  };

  const checkValue = (id, value) => {
    const newCheckList = { ...checkList };
    const regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const regPhone = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/;
    const regPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/;
    const regUsername = /^([a-zA-Z0-9_.]){2,10}$/;
    if (id === 'email') {
      newCheckList.email = regEmail.test(value);
    } else if (id === 'phone') {
      newCheckList.phone = regPhone.test(value);
    } else if (id === 'password') {
      newCheckList.password = regPassword.test(value);
    } else if (id === 'username') {
      newCheckList.username = regUsername.test(value);
    } else if (id === 'referral') {
      newCheckList.referral =
        regUsername.test(value) && isExist('username', value);
    }
    if (['email', 'phone', 'username'].includes(id)) {
      newCheckList[id] && checkDup(id, value);
    }
    setCheckList(newCheckList);
  };

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setInfos((prev) => ({
      ...prev,
      [id]: value,
    }));
    checkValue(id, value);
  };

  const handleChangeCheckbox = ({ target }) => {
    const { id, checked } = target;
    console.log(target);
    const newInfos = { ...infos };
    if (id === 'all') {
      newInfos.all = checked;
      newInfos.terms = checked;
      newInfos.privacy = checked;
      newInfos.marketing = checked;
    } else {
      newInfos[id] = checked;
    }
    setInfos(newInfos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!infos.email || !checkList.email || !checkDupList.email) {
      setMsg('Please check email');
      document.getElementById('email').focus();
    } else if (!infos.phone || !checkList.phone || !checkDupList.phone) {
      setMsg('Please check phone number');
      document.getElementById('phone').focus();
    } else if (!infos.password || !checkList.password) {
      setMsg('Please check password');
      document.getElementById('password').focus();
    } else if (!infos.confirm || infos.password !== infos.confirm) {
      setMsg('Please check confirm password');
      document.getElementById('confirm').focus();
    } else if (
      !infos.username ||
      !checkList.username ||
      !checkDupList.username
    ) {
      setMsg('Please check username');
      document.getElementById('username').focus();
    } else if (infos.referral && !checkList.referral) {
      setMsg('Please check referral username');
      document.getElementById('referral').focus();
    } else if (!infos.all && (!infos.terms || !infos.privacy)) {
      setMsg('Please agree to the required terms');
    } else {
      addUser(infos);
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
          <span>Invalid email</span>
        )}
        {checkList.email && !checkDupList.email && (
          <span>Duplicated email</span>
        )}
        <InputBox
          value={infos.phone}
          type="tel"
          id="phone"
          label="Phone"
          onChange={handleChange}
        />
        {infos.phone.length > 0 && !checkList.phone && (
          <span>Invalid phone number</span>
        )}
        {checkList.phone && !checkDupList.phone && (
          <span>Duplicated phone number</span>
        )}
        <InputBox
          value={infos.password}
          type="password"
          id="password"
          label="Password"
          onChange={handleChange}
        />
        {infos.password.length > 0 && !checkList.password && (
          <span>
            Invalid password (at least 1 lower case, 1 upper case, 1 number)
          </span>
        )}
        <InputBox
          value={infos.confirm}
          type="password"
          id="confirm"
          label="Confirm Password"
          onChange={handleChange}
        />
        {infos.confirm.length > 0 && infos.password !== infos.confirm && (
          <span>Password mismatch</span>
        )}
        <InputBox
          value={infos.username}
          type="text"
          id="username"
          label="Username"
          onChange={handleChange}
        />
        {infos.username.length > 0 && !checkList.username && (
          <span>Invalid username</span>
        )}
        {checkList.username && !checkDupList.username && (
          <span>Duplicated username</span>
        )}
        <InputBox
          value={infos.referral}
          type="text"
          id="referral"
          label="Referral Username"
          onChange={handleChange}
        />
        {infos.referral.length > 0 && !checkList.referral && (
          <span>Invalid username</span>
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
        <span>{msg}</span>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Signup;
