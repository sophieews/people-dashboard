import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        people: []
    },
    mutations: {
        SET_PEOPLE(state, people) {
            state.people = people;
        },
        UPDATE_PERSON(state, updatedPerson) {
            let index = state.people.findIndex(
                person => person._id == updatedPerson._id
            );
            Vue.set(state.people, index, updatedPerson);
        }
    },
    getters: {
        getPeopleDataByProperty: state => property => {
            let data = {};
            for (const person of state.people) {
                const val = person[property];
                // Check person has age
                if (val) {
                    // If age already exists, increase existing val by 1
                    if (data[val]) {
                        data[val]++;
                    } else {
                        data[val] = 1;
                    }
                }
            }
            let dataArray = [];
            for (const personKey in data) {
                dataArray.push({ property: personKey, value: data[personKey] });
            }
            return dataArray;
        }
    }
});
