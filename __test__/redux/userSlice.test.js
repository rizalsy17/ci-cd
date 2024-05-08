/**
 * test scenario for userSlice
 *
 * 1. asyncThunks
 * - should return users when given by asyncGetAllUser thunk
 * - should return error when given by asyncGetAllUser thunk
 *
 */

import { asyncGetAllUsers } from "../../src/redux/reducers/userSlice";
import userService from "../../src/services/userService";
 
const fakeUsers = [
  {
    id: 1,
    name: 'john doe',
    email: 'johndoe@gmail.com',
  }];
 
const fakeError = new Error('Something went wrong');
 
describe('userSlice', () => {
  describe('asyncThunks', () => {
    beforeEach(() => {
      userService._users = userService.users;
    });
 
    it('should return users when given by asyncGetAllUser thunk', async () => {
      userService.users = jest.fn().mockResolvedValue(fakeUsers);
 
      const dispatch = jest.fn();
      const getState = jest.fn();
 
      await asyncGetAllUsers()(dispatch, getState, {});
 
      expect(userService.users).toHaveBeenCalled();
 
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: asyncGetAllUsers.pending.type,
        }),
      );
 
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: asyncGetAllUsers.fulfilled.type,
          payload: fakeUsers,
        }),
      );
    });
 
    it('should return error when given by asyncGetAllUser thunk', async () => {
      userService.users = jest.fn().mockRejectedValue(fakeError);
 
      const dispatch = jest.fn();
 
      await asyncGetAllUsers()(dispatch);
 
      expect(userService.users).toHaveBeenCalled();
 
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: asyncGetAllUsers.pending.type,
        }),
      );
 
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: asyncGetAllUsers.rejected.type,
        }),
      );
    });
 
    afterEach(() => {
      userService.users = userService._users;
    });
  });
});