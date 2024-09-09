export const getSignatureExpired = (): string => {
    const newDate = new Date();
    newDate.setHours(newDate.getHours() + 3);
    return newDate.toISOString();
  };
  