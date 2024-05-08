/**
 * test scenario for leaderboardSlice
 *
 * 1. asyncThunks
 * - should return leaderboard when given by asyncLeaderboard thunk
 * - should return error when given by asyncLeaderboard thunk
 */
 
import leaderboardService from "../../src/services/leaderboardService";
import { asyncLeaderboard } from "../../src/redux/reducers/leaderboardSlice";
 
 
const fakeLeaderboard = [
  {
    id: 1,
    name: 'john doe',
  },
];
 
const fakeError = new Error('Something went wrong');
 
describe('leaderboardSlice', () => {
  describe('asyncThunks', () => {
    beforeEach(() => {
      leaderboardService._leaderboard = leaderboardService.leaderboard;
    });
 
    it('should return leaderboard when given by asyncLeaderboard thunk', async () => {
      leaderboardService.leaderboard = jest.fn().mockResolvedValue(fakeLeaderboard);
 
      const dispatch = jest.fn();
      const getState = jest.fn();
 
      await asyncLeaderboard()(dispatch, getState, {});
 
      expect(leaderboardService.leaderboard).toHaveBeenCalled();
 
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: asyncLeaderboard.pending.type,
        }),
      );
 
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: asyncLeaderboard.fulfilled.type,
          payload: fakeLeaderboard,
        }),
      );
    });
 
    it('should return error when given by asyncLeaderboard thunk', async () => {
      leaderboardService.leaderboard = jest.fn().mockRejectedValue(fakeError);
 
      const dispatch = jest.fn();
 
      await asyncLeaderboard()(dispatch);
 
      expect(leaderboardService.leaderboard).toHaveBeenCalled();
 
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: asyncLeaderboard.pending.type,
        }),
      );
 
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: asyncLeaderboard.rejected.type,
        }),
      );
    });
  });
});