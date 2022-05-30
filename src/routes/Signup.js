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
    referral: false,
    checkboxes: false,
  });

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setInfos((prev) => ({
      ...prev,
      [id]: value,
    }));
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
        <InputBox
          infos={infos.phone}
          type="tel"
          id="phone"
          label="Phone"
          onChange={handleChange}
        />
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
        <InputBox
          infos={infos.referral}
          type="text"
          id="referral"
          label="Referral Username"
          onChange={handleChange}
        />
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
