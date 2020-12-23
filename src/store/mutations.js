import Vue from 'vue';

export const mutations = {
    /**
     * Set people
     * @param {Array} people array of people objects
     */
    SET_PEOPLE(state, people) {
        state.people = people;
    },
    /**
     * Update a person object in the array of people
     * @param {Object} updatedPerson updated person object to replace existing object
     */
    UPDATE_PERSON(state, updatedPerson) {
        let index = state.people.findIndex(
            person => person._id == updatedPerson._id
        );
        if (index > -1) Vue.set(state.people, index, updatedPerson);
    }
};
