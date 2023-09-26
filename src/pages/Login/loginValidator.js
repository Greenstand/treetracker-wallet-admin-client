const validateWallet = (value) => {
  if (!value) {
    return 'Wallet cannot be empty.';
  }

  return value.length > 150
    ? 'Wallet cannot contain more than 150 characters.'
    : '';
};

const validatePassword = (value) => {
  if (!value) {
    return 'Password cannot be empty.';
  }

  return value.length > 50
    ? 'Password cannot contain more than 50 characters.'
    : '';
};

const validateAPIKey = (value) => {
  if (!value) {
    return 'API Key cannot be empty.';
  }

  return value.length > 50
    ? 'Password cannot contain more than 50 characters.'
    : '';
};

export { validateWallet, validatePassword, validateAPIKey };
