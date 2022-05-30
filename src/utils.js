export const testRegex = (type, value) => {
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const regPhone = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/;
  const regPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/;
  const regUsername = /^([a-zA-Z0-9_.]){2,10}$/;
  if (type === 'email') {
    return regEmail.test(value);
  } else if (type === 'phone') {
    return regPhone.test(value);
  } else if (type === 'password') {
    return regPassword.test(value);
  } else if (type === 'username') {
    return regUsername.test(value);
  }
  return false;
};
