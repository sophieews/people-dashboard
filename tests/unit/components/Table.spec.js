import Vuetify from 'vuetify';
import { createLocalVue, mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import { nextTick } from 'vue';
import Table from '@/components/Table';
import EditDialog from '@/components/EditDialog';
Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);

describe('Table', () => {
    let vuetify;
    let wrapper;
    let store;
    let $route;
    let $router;
    let testPeople;

    beforeEach(() => {
        vuetify = new Vuetify();
        store = new Vuex.Store({
            state: {
                people: []
            }
        });
        $route = {
            query: {}
        };
        $router = {
            replace: jest.fn()
        };
        testPeople = [
            { id: 1, name: 'Person A', age: 20 },
            { id: 2, name: 'Person B', gender: 'other' },
            { id: 3, name: 'Person C', eyeColor: 'blue' }
        ];
    });

    const createWrapper = options => {
        return mount(Table, {
            localVue,
            vuetify,
            store,
            mocks: {
                $route,
                $router
            },
            ...options
        });
    };

    afterEach(() => {
        wrapper.destroy();
    });

    it('renders', () => {
        wrapper = createWrapper();
        expect(wrapper.exists()).toBe(true);
    });

    it('Table and EditDialog components render', () => {
        wrapper = createWrapper();
        expect(wrapper.findComponent({ name: 'v-data-table' }).exists()).toBe(
            true
        );
        expect(wrapper.findComponent(EditDialog).exists()).toBe(true);
    });

    describe('Filtering table data with query params', () => {
        it('If no route query exists, filteredPeople returns the array of people in the store', () => {
            store.state.people = testPeople;
            wrapper = createWrapper();
            expect(wrapper.vm.filteredPeople).toEqual(testPeople);
        });
        it('If query prop "Age" exists, and query val exists, return filtered people', () => {
            $route.query.prop = 'Age';
            $route.query.val = 20;
            store.state.people = testPeople;
            wrapper = createWrapper();
            expect(wrapper.vm.filteredPeople).toEqual([
                { id: 1, name: 'Person A', age: 20 }
            ]);
        });
        it('If query prop "Gender" exists, and query val exists, return filtered people', () => {
            $route.query.prop = 'Gender';
            $route.query.val = 'other';
            store.state.people = testPeople;
            wrapper = createWrapper();
            expect(wrapper.vm.filteredPeople).toEqual([
                { id: 2, name: 'Person B', gender: 'other' }
            ]);
        });
        it('If query prop "Eye Color" exists, and query val exists, return filtered people', () => {
            $route.query.prop = 'Eye Color';
            $route.query.val = 'blue';
            store.state.people = testPeople;
            wrapper = createWrapper();
            expect(wrapper.vm.filteredPeople).toEqual([
                { id: 3, name: 'Person C', eyeColor: 'blue' }
            ]);
        });
        it('If other unknown query prop exists and query val exists, return array of people in store', () => {
            $route.query.prop = 'Pet';
            $route.query.val = 'dog';
            store.state.people = testPeople;
            wrapper = createWrapper();
            expect(wrapper.vm.filteredPeople).toEqual(testPeople);
        });
    });

    it('Clicking on filter chip, clears $route query params', async () => {
        $route.query.prop = 'Eye Color';
        $route.query.val = 'blue';
        wrapper = createWrapper();
        let chip = wrapper.findComponent({ name: 'v-chip' });
        chip.vm.$emit('click:close');
        await nextTick();
        expect($router.replace).toHaveBeenCalledWith({ query: {} });
    });

    // it('Clicking on edit button of table item, sets the item to be edited to that of the row item and shows the dialog', async () => {
    //     store.state.people = [{ name: 'Test' }];
    //     wrapper = createWrapper();
    //     let button = wrapper.findComponent({ name: 'v-icon' });
    //     button.vm.$emit('click');
    //     await nextTick();
    //     expect(wrapper.vm.editDialog).toEqual(true);
    //     expect(wrapper.vm.editItem).toEqual(testPeople[0]);
    // });
});
