import bcrypt from "bcryptjs";
import User from "../../models/UserModel";
import { generateToken } from "../../utils/generateToken";
import { LoginData, LoginResponse, RegisterData } from "../../interfaces/userInterface";
 
 
 
export const registerUser = async (data: RegisterData) => {
  try {
    const { email, password } = data;
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...data, password: hashedPassword });
    await newUser.save();
    let userId
    if(newUser._id)
      userId = newUser._id.toString();
    else userId = ''
    const token = generateToken(userId.toString());
    return { user: newUser, token };
  } catch (error) {
    throw error
  }
};
 
export const loginUser = async (data : LoginData) : Promise<LoginResponse>  => {
 
    try {
    const { email, password } = data
    console.log("email, password",email, password)
    const user = await User.findOne({ email });

    
    
   
    if (!user) throw new Error("User not found");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");
    let userId
    if (user._id) {
      userId = user._id.toString();
    } else {
      throw new Error("User ID not found");
    }
    const token = generateToken(userId.toString());

    console.log('The user got',  {
  user: {
    ...user.toObject(),
    _id: user._id.toString(), // convert ObjectId to string
  },
  token,
});
 
 return {
  user: {
    ...user.toObject(),
    _id: user._id.toString(), // convert ObjectId to string
  },
  token,
};
    } catch (error) {
        throw error
    }
};
 
 
export const getUserById = async (id: string) => {
  try {
  const user = await User.findById(id).select('-password');
  if (!user) throw new Error('User not found');
  return user
  } catch (error) {
    console.log('got error when user is fetched by id', error);
    throw error
  }
};
 
 
 
export const getUsersService = async (query: any) => {
  const { page = 1, limit = 10, role, search } = query;
  const skip = (Number(page) - 1) * Number(limit);
  const pageLimit = Number(limit);
 
  const searchQuery: any = { isDeleted: false };
 
  if (role) searchQuery.role = role;
  if (search) {
    searchQuery.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
    ];
  }
 
  const users = await User.find(searchQuery).skip(skip).limit(pageLimit);
  const totalUsers = await User.countDocuments(searchQuery);
 
  return {
    users,
    currentPage: Number(page),
    totalPages: Math.ceil(totalUsers / pageLimit),
    totalUsers,
  };
};
 
 
 
 
 export const addUserService = async (data: RegisterData) => {
  const { email, password } = data;
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');
 
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ ...data, password: hashedPassword });
  await newUser.save();
  return newUser;
};
 
export const updateUserService = async (id: string, data: any) => {
  const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
  if (!updatedUser) throw new Error('User not found');
  return updatedUser;
};
 
export const deleteUserService = async (id: string) => {
  const deletedUser = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  if (!deletedUser) throw new Error('User not found');
  return deletedUser;
};