/**
 * test scenario for authSlice
 *
 * 1. thread Reducer
 * - harus mengembalikan thraeds state jika action bertipe unknown
 * - should return categiry when given by setSelect action
 * 
 */

import threadReducer, { setThread, setSelect } from "../../src/redux/reducers/threadSlice";

describe('thread slice', () => {
    describe('reducers', () => {
        it('harus mengembalikan threads state jika action bertipe unknown', () => {
            const initialState = {};
            const action = { type: 'UNKNOWN' };

            const nextState = threadReducer(initialState, action);

            expect(nextState).toEqual(initialState);
        });

        it('should return selected category when given by setSelect action', () => {
            const initialState = {
                selected: null,
            };
            const selectedCategory = 'category';
            const action = setSelect(selectedCategory);

            const nextState = threadReducer(initialState, action);

            expect(nextState.selected).toEqual(selectedCategory);
        });
    });
});