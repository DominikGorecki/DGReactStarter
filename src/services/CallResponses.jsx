export const SuccessResponse = (obj) => {
  return {
    success: true,
    value: obj
  };
};

export const FailResponse = (errorStringArray) => {
  return {
    success: false,
    errors: errorStringArray 
  };
};