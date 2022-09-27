const checkAccess = (permission) => {
  return async (req, res, next) => {
    if (permission.roles.includes(req.user?.role)) return next();

    if (!permission) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied!" });
    }

    console.log(permission);
    res.status(500).json({
      success: false,
      message: "Something went wrong! try again",
    });
  };
};
export default checkAccess;
