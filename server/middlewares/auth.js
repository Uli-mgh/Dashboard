import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id, name, role } = decodedToken;

    req.user = { id, name, role };
    next();
    console.log(req.user);
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Algo salio mal con tu autorizacion",
    });
  }
};

export default auth;
