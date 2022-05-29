import React from 'react';

const Signup = () => {
  return (
    <>
      <header>
        <h1>Be my guest!</h1>
      </header>
      <main>
        <section>
          <form>
            <div>
              <label for="email">Email</label>
              <input type="email" id="email" />
            </div>
            <div>
              <label for="phone">Phone</label>
              <input type="tel" id="phone" />
            </div>
            <div>
              <label for="password">Password</label>
              <input type="password" id="password" />
            </div>
            <div>
              <label for="confirm">Confirm Password</label>
              <input type="password" id="confirm" />
            </div>
            <div>
              <label for="username">Username</label>
              <input type="text" id="username" />
            </div>
            <div>
              <label for="referral">Referral Username</label>
              <input type="text" id="referral" />
            </div>
            <div>
              <input type="checkbox" id="terms" />
              <label for="terms">I agree to the Terms and Conditions</label>
            </div>
            <div>
              <input type="checkbox" id="privacy" />
              <label for="privacy">I agree to the Privacy Policy</label>
            </div>
            <div>
              <input type="checkbox" id="terms" />
              <label for="terms">I agree to receive marketing emails</label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default Signup;
