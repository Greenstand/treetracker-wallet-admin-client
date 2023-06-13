const session = () => {
  const token = localStorage.getItem("token") || "";
  const wallet = localStorage.getItem("wallet") || "";

  return {
    token,
    wallet,
  };
};

export { session };
