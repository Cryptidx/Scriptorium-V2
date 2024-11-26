// Taken from past exercise

/* validation helpers for user account data */
export function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to validate password
export function isValidPassword(password: string) {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasMinLength = password.length >= 8;
    return hasLowercase && hasUppercase && hasDigit && hasMinLength;
}

// Helper function to validate phone number
export function isValidPhoneNumber(phoneNumber: string) {
    const phoneNumberRegex = /^[0-9]{10,15}$/;
    return phoneNumberRegex.test(phoneNumber);
  }