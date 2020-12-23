import { getters } from '@/store/getters';

describe('getters.js', () => {
    let state;
    let testPeople;

    beforeEach(() => {
        state = {
            people: []
        };
        testPeople = [
            { _id: 1, name: 'Person A', age: 40 },
            { _id: 2, name: 'Person B', age: 35 },
            { _id: 3, name: 'Person C', age: 35 },
            { _id: 4, name: 'Person D' }
        ];
    });

    it('Use getChartData to return the chart data for the "age" property of each item in the people data', () => {
        state.people = testPeople;
        const data = getters.getChartData(state)('age');
        expect(data).toEqual([
            { property: '35', value: 2 },
            { property: '40', value: 1 }
        ]);
    });
});
