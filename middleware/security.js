import jwt from "jsonwebtoken";
import Employee from "../models/employee.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (request, response, next) => {
  // console.log(request.header.authorization);

  let token;
  if (
    request.headers.authorization &&
    request.headers.authorization.startsWith("Bearer")
  )
    try {
      token = request.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.SECRET);
      // console.log(decode);
      request.user = await Employee.findById(decode.id).select("-passeord");
      next();
    } catch (error) {
      console.error(error);
      response.status(401);
      throw new Error("Not Authrozied,Token Faild");
    }

  if (!token) {
    response.status(401);
    throw new Error("Not Authorized , not token");
  }
});
