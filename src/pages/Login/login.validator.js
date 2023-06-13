const validateWallet = (value) => {
  if (!value) {
    return "Wallet cannot be empty.";
  }

  return value.length > 150
    ? "Wallet cannot contain more than 150 characters."
    : "";
};

const validatePassword = (value) => {
  if (!value) {
    return "Password cannot be empty.";
  }

  return value.length > 150
    ? "Password cannot contain more than 150 characters."
    : "";
};

export { validateWallet, validatePassword };
