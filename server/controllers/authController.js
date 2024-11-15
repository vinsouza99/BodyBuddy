export const getSession = (req, res) => {
  const user = req.user;
  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(401).json({ message: "No active session" });
  }
};