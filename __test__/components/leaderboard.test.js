/**
 * test scenario for UserLeaderboard
 *
 * 
 * - shoud render "You" if user is the same as current user
 *
 */

import React from 'react';
import LeaderboardList from '../../src/components/leaderboard/LeaderboardList';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

const fakeLeaderboard = {
    user: {
        id: '123',
        avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        name: 'John Doe',
    },
    score: 100,
};

describe('LeaderboardList component', () => {
    describe('with other user', () => {
        let store;
        let component;

        beforeEach(() => {
            store = mockStore({
                auth: {
                    user: {
                        id: '321',
                    },
                },
            });

            component = render(
                <Provider store={store}>
                    <LeaderboardList leaderboards={[fakeLeaderboard]} />
                </Provider>
            );
        });

        it('should not render "You" if user is not the same as current user', () => {
            const { queryByText } = component;
            expect(queryByText('(You)')).toBeNull();
        });
    });
});