function validateEmail(email) {
  return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
}

export default function(values) {
  const errors = {};
  const requiredFields = ["name", "email", "confirmEmail"];
  requiredFields.forEach(field => {
    errors[field] = '';
    if (values[field] === '') {
      errors[field] = "Required";
    }
  });

  if(values.name && values.name.length <= 3){
      errors.name = "Name length minimum is 3 chars"
  }

  if (values.email && validateEmail(values.email)) {
    errors.email = "Invalid email address";
  }

  if (values.email && values.confirmEmail && values.email !== values.confirmEmail) {
    errors.confirmEmail = "The emails don't match";
  }

  if (values.confirmEmail && validateEmail(values.confirmEmail)) {
    errors.confirmEmail = "Invalid email address";
  }

  return errors;
}
