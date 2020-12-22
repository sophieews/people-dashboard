import Vuetify from 'vuetify';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Home from '@/views/Home';
import Charts from '@/components/Charts';
import Table from '@/components/Table';
Vue.use(Vuetify);
const localVue = createLocalVue();

describe('Home', () => {
    let vuetify;
    let wrapper;

    beforeEach(() => {
        vuetify = new Vuetify();
    });

    const createWrapper = options => {
        return shallowMount(Home, {
            localVue,
            vuetify,
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

    it('Table and Charts components render', () => {
        wrapper = createWrapper();
        expect(wrapper.findComponent(Charts).exists()).toBe(true);
        expect(wrapper.findComponent(Table).exists()).toBe(true);
    });
});
