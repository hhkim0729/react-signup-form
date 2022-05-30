import React from 'react';
import InputBox from '../components/InputBox';

const Signup = ({ users, addUser }) => {
  return (
    <section>
      <h1>Be my guest!</h1>
      <form>
        <InputBox type="email" id="email" label="Email" />
        <InputBox type="tel" id="phone" label="Phone" />
        <InputBox type="password" id="password" label="Password" />
        <InputBox type="password" id="confirm" label="Confirm Password" />
        <InputBox type="text" id="username" label="Username" />
        <InputBox type="text" id="referral" label="Referral Username" />
        <InputBox
          type="checkbox"
          id="terms"
          label="I agree to the Terms and Conditions"
          isLabelFirst={false}
        />
        <InputBox
          type="checkbox"
          id="privacy"
          label="I agree to the Privacy Policy"
          isLabelFirst={false}
        />
        <InputBox
          type="checkbox"
          id="marketing"
          label="I agree to receive marketing emails"
          isLabelFirst={false}
        />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Signup;
