function validateRegistrationData(email, name, password) {
  if (!email || !password || !name) {
    return {
      isValid: false,
      error: "Email, Name, and Password are required",
    };
  }

  return {
    isValid: true,
  };
}

module.exports = { validateRegistrationData };
