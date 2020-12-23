import { mutations } from '@/store/mutations';

describe('mutations.js', () => {
    let state;
    let testPeople;

    beforeEach(() => {
        state = {
            people: []
        };
        testPeople = [
            { _id: 1, name: 'Person A' },
            { _id: 2, name: 'Person B' }
        ];
    });

    it('SET_PEOPLE sets an array of people in the store', () => {
        mutations.SET_PEOPLE(state, testPeople);
        expect(state.people).toEqual(testPeople);
    });

    describe('UPDATE_PERSON', () => {
        it('If person does not exist in the store, store is not updated', () => {
            let stateCopy = Object.assign({}, state);
            let testPerson = { _id: 3, name: 'Person C' };
            mutations.UPDATE_PERSON(state, testPerson);
            expect(state).toEqual(stateCopy);
        });
        it('If person does exist in the store, store is updated with new person data', () => {
            state.people = testPeople;
            let stateCopy = Object.assign({}, state);
            let testPerson = { _id: 1, eyeColor: 'blue' };
            mutations.UPDATE_PERSON(state, testPerson);
            stateCopy.people[0] = testPerson;
            expect(state).toEqual(stateCopy);
        });
    });
});
