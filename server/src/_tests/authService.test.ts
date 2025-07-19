import { loginUser } from '../modules/auth/userService';
import User from '../models/UserModel';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';

jest.mock('../models/UserModel');
jest.mock('bcryptjs');
jest.mock('../utils/generateToken');

describe('loginUser (mocked)', () => {
  const mockUser = {
    _id: 'user123',
    password: 'hashedPassword',
    toObject: () => ({ email: 'test@example.com', name: 'Test User' }),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should login successfully', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (generateToken as jest.Mock).mockReturnValue('mockToken');

    const result = await loginUser({ email: 'test@example.com', password: 'password123' });

    expect(result.user.email).toBe('test@example.com');
    expect(result.token).toBe('mockToken');
  });

  it('should throw error if user not found', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    await expect(
      loginUser({ email: 'notfound@example.com', password: 'password123' })
    ).rejects.toThrow('User not found');
  });

  it('should throw error if password is incorrect', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      loginUser({ email: 'test@example.com', password: 'wrongpass' })
    ).rejects.toThrow('Invalid credentials');
  });
});
