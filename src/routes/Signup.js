import React, { useState } from 'react';
import InputBox from '../components/InputBox';

const Signup = ({ users, addUser }) => {
  const [infos, setInfos] = useState({
    email: '',
    phone: '',
    password: '',
    confirm: '',
    username: '',
    referral: '',
    terms: false,
    privacy: false,
    marketing: false,
  });

  const [checkList, setCheckList] = useState({
    email: false,
    phone: false,
    password: false,
    confirm: false,
    username: false,
    referral: true,
    checkboxes: false,
  });

  const [checkDupList, setCheckDupList] = useState({
    email: false,
    phone: false,
    username: false,
  });

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
    const regUsername = /^([a-zA-Z0-9_.]){2,10}$/;
    if (id === 'email') {
      newCheckList.email = regEmail.test(value);
    } else if (id === 'phone') {
      newCheckList.phone = regPhone.test(value);
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
    setInfos((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <section>
      <h1>Be my guest!</h1>
      <form>
        <InputBox
          infos={infos.email}
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
          infos={infos.phone}
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
          infos={infos.password}
          type="password"
          id="password"
          label="Password"
          onChange={handleChange}
        />
        <InputBox
          infos={infos.confirm}
          type="password"
          id="confirm"
          label="Confirm Password"
          onChange={handleChange}
        />
        <InputBox
          infos={infos.username}
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
          infos={infos.referral}
          type="text"
          id="referral"
          label="Referral Username"
          onChange={handleChange}
        />
        {infos.referral.length > 0 && !checkList.referral && (
          <span>Invalid username</span>
        )}
        <InputBox
          infos={infos.terms}
          type="checkbox"
          id="terms"
          label="I agree to the Terms and Conditions"
          isLabelFirst={false}
          onChange={handleChangeCheckbox}
        />
        <InputBox
          infos={infos.privacy}
          type="checkbox"
          id="privacy"
          label="I agree to the Privacy Policy"
          isLabelFirst={false}
          onChange={handleChangeCheckbox}
        />
        <InputBox
          infos={infos.marketing}
          type="checkbox"
          id="marketing"
          label="I agree to receive marketing emails"
          isLabelFirst={false}
          onChange={handleChangeCheckbox}
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Signup;
