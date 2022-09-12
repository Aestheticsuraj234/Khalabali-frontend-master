import { login, logout } from '../../actions/auth';
import { user} from '../fixtures/auth';

it('should create login action', () => {
  const action = login(user);
  expect(action).toEqual({
    type: 'LOGIN',
    user
  });
});

it('should create logout action', () => {
  expect(logout()).toEqual({
    type: 'LOGOUT',
  });
});
