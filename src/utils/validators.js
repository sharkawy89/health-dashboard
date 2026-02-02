/**
 * Validate email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Egyptian and international formats)
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate required field
 */
export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

/**
 * Validate form data
 */
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = data[field];
    
    if (rule.required && !validateRequired(value)) {
      errors[field] = `${field} is required`;
    }
    
    if (rule.email && value && !validateEmail(value)) {
      errors[field] = 'Invalid email format';
    }
    
    if (rule.phone && value && !validatePhone(value)) {
      errors[field] = 'Invalid phone number';
    }
    
    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `Minimum length is ${rule.minLength}`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
