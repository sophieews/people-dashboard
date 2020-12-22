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
        }
    },
    actions: {},
    modules: {}
});
