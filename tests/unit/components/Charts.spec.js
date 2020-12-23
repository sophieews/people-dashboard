import Vuetify from 'vuetify';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import { nextTick } from 'vue';
import Charts from '@/components/Charts';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuex);

describe('Charts', () => {
    let vuetify;
    let wrapper;
    let store;

    beforeEach(() => {
        vuetify = new Vuetify();
        store = new Vuex.Store({
            state: {
                people: []
            }
        });
    });

    const createWrapper = options => {
        return shallowMount(Charts, {
            localVue,
            vuetify,
            store,
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

    it('After component is mounted, pie chart is drawn', async () => {
        const generatePieMock = jest.fn();
        wrapper = createWrapper();
        wrapper.vm.generatePie = generatePieMock;
        await nextTick();
        expect(generatePieMock).toHaveBeenCalledTimes(1);
    });

    it('When selectedChartType changes to "Bar", a bar chart is drawn', async () => {
        const generatePieMock = jest.fn();
        const generateBarMock = jest.fn();
        wrapper = createWrapper();
        wrapper.vm.generatePie = generatePieMock;
        wrapper.vm.generateBar = generateBarMock;
        await nextTick();
        expect(generatePieMock).toHaveBeenCalledTimes(1); // Initial rendering of pie chart
        wrapper.setData({ selectedChartType: 'Bar' });
        await nextTick();
        expect(generatePieMock).toHaveBeenCalledTimes(1);
        expect(generateBarMock).toHaveBeenCalledTimes(1);
    });

    it('When selectedPropertyType changes to "Gender", chart is redrawn', async () => {
        const generatePieMock = jest.fn();
        const generateBarMock = jest.fn();
        wrapper = createWrapper();
        wrapper.vm.generatePie = generatePieMock;
        wrapper.vm.generateBar = generateBarMock;
        await nextTick();
        expect(generatePieMock).toHaveBeenCalledTimes(1); // Initial rendering of pie chart

        wrapper.setData({ selectedPropertyType: 'Gender' });
        await nextTick();
        expect(generatePieMock).toHaveBeenCalledTimes(2);
        expect(generateBarMock).toHaveBeenCalledTimes(0);
    });
});
