import {
  validateAPIKey,
  validatePassword,
  validateWallet,
} from './loginValidator';

describe('validateWallet function', () => {
  it('returns an error message if the value is empty', () => {
    const value = '';
    const errorMessage = 'Wallet cannot be empty.';
    expect(validateWallet(value)).toBe(errorMessage);
  });

  it('returns an error message if the value has more than 150 characters', () => {
    const value = 'a'.repeat(151);
    const errorMessage = 'Wallet cannot contain more than 150 characters.';
    expect(validateWallet(value)).toBe(errorMessage);
  });

  it('returns an empty string if the value is valid', () => {
    const value = 'valid_wallet';
    expect(validateWallet(value)).toBe('');
  });
});

describe('validatePassword function', () => {
  it('returns an error message if the value is empty', () => {
    const value = '';
    const errorMessage = 'Password cannot be empty.';
    expect(validatePassword(value)).toBe(errorMessage);
  });

  it('returns an error message if the value has more than 50 characters', () => {
    const value = 'a'.repeat(51);
    const errorMessage = 'Password cannot contain more than 50 characters.';
    expect(validatePassword(value)).toBe(errorMessage);
  });

  it('returns an empty string if the value is valid', () => {
    const value = 'valid_password';
    expect(validatePassword(value)).toBe('');
  });
});

describe('validateAPIKey function', () => {
  it('returns an error message if the value is empty', () => {
    const value = '';
    const errorMessage = 'API Key cannot be empty.';
    expect(validateAPIKey(value)).toBe(errorMessage);
  });

  it('returns an error message if the value has more than 50 characters', () => {
    const value = 'a'.repeat(51);
    const errorMessage = 'API Key cannot contain more than 50 characters.';
    expect(validateAPIKey(value)).toBe(errorMessage);
  });

  it('returns an empty string if the value is valid', () => {
    const value = 'valid_api-key';
    expect(validateAPIKey(value)).toBe('');
  });
});
