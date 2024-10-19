import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exist: username, name
  // check for images, check for avatar
  // upload on cloudinary, check for avatar
  // create user object - create entry in db
  // remove refresh token and password form response
  // check for user creation
  // return res

  // get user details from frontend
  const { fullname, username, email, password } = req.body;

  // validation  -fields not empty
  if (
    [fullname, username, email, password].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiErrors(400, "All Fields are Required");
  }

  // check if user already exist: username, email
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiErrors(409, "User with Emaiil or Username already exist");
  }

  // check for images, check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiErrors(400, "Avatar file is required");
  }

  // upload on cloudinary, check for avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiErrors(400, "Avatar file is required");
  }

  // create user object - create entry in db
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // remove refresh token and password form response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // check for user creation
  if (!createdUser) {
    throw new ApiErrors(500, "some thing went wrong white registering User");
  }

  // return res
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));

  //testing code
  // res.status(200).json({
  //   message: "ok",
  // });
});

export { registerUser };
