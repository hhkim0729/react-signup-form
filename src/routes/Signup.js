import React, { useState } from 'react';
import InputBox from '../components/InputBox';

const Signup = () => {
  const [infos, setInfos] = useState({});

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
          type="email"
          id="email"
          label="Email"
          onChange={handleChange}
        />
        <InputBox type="tel" id="phone" label="Phone" onChange={handleChange} />
        <InputBox
          type="password"
          id="password"
          label="Password"
          onChange={handleChange}
        />
        <InputBox
          type="password"
          id="confirm"
          label="Confirm Password"
          onChange={handleChange}
        />
        <InputBox
          type="text"
          id="username"
          label="Username"
          onChange={handleChange}
        />
        <InputBox
          type="text"
          id="referral"
          label="Referral Username"
          onChange={handleChange}
        />
        <InputBox
          type="checkbox"
          id="terms"
          label="I agree to the Terms and Conditions"
          isLabelFirst={false}
          onChange={handleChangeCheckbox}
        />
        <InputBox
          type="checkbox"
          id="privacy"
          label="I agree to the Privacy Policy"
          isLabelFirst={false}
          onChange={handleChangeCheckbox}
        />
        <InputBox
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
