export const validateLogin = (
  formData
) => {

  const {
    name,
    email,
    password,
  } = formData;

  if (
    !name ||
    !email ||
    !password
  ) {

    return "Please fill all fields";
  }

  const nameRegex =
    /^[A-Za-z ]+$/;

  if (
    !nameRegex.test(name)
  ) {

    return "Name should contain only letters";
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    !emailRegex.test(email)
  ) {

    return "Enter valid email address";
  }

  if (
    password.length < 6
  ) {

    return "Password must be at least 6 characters";
  }

  return null;
};