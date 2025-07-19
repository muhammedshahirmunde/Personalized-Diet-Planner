import { login } from '../modules/auth/userController';
import { loginUser } from '../modules/auth/userService';

jest.mock('../modules/auth/userService');

describe('login controller', () => {
  const mockReq = {
    body: { email: 'test@example.com', password: 'test123' },
  } as any;

  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;

  it('returns 200 and user/token on success', async () => {
    (loginUser as jest.Mock).mockResolvedValue({
      user: { id: '1', name: 'Test User' },
      token: 'abc123',
    });

    await login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      user: { id: '1', name: 'Test User' },
      token: 'abc123',
    });
  });

  it('returns 401 on failure', async () => {
    (loginUser as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

    await login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Invalid credentials',
    });
  });
});
