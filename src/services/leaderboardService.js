import apiService from "./apiService";

const leaderboardService = {
    leaderboard: async () => {
        const response = await apiService.get('/leaderboards');
        const { data: { data: { leaderboards } } } = response;
        return leaderboards;
    }
}

export default leaderboardService;
