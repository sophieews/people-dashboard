import Vuetify from 'vuetify';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import EditDialog from '@/components/EditDialog';
import { nextTick } from 'vue';

Vue.use(Vuetify);
const localVue = createLocalVue();

describe('EditDialog', () => {
    let vuetify;
    let wrapper;
    let $store;

    beforeEach(() => {
        vuetify = new Vuetify();
        $store = {
            commit: jest.fn()
        };
    });

    const createWrapper = options => {
        return shallowMount(EditDialog, {
            localVue,
            vuetify,
            mocks: {
                $store
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

    it('When the value of show is set to true (the dialog is opened), if the prop "item" exists it is set in the data', async () => {
        let item = { name: 'Person A', age: 40 };
        wrapper = createWrapper({ propsData: { item } });
        wrapper.vm.$options.watch.show.call(wrapper.vm, true);
        await nextTick();
        expect(wrapper.vm.editedItem).toEqual(item);
    });
    it('When the value of show is set to false (the dialog is closed), nothing is set', async () => {
        let item = { name: 'Person A', age: 40 };
        wrapper = createWrapper({ propsData: { item } });
        wrapper.vm.$options.watch.show.call(wrapper.vm, false);
        await nextTick();
        expect(wrapper.vm.editedItem).toEqual({});
    });

    it('Clicking cancel closes the dialog', async () => {
        wrapper = createWrapper();
        wrapper.find('[data-test="close"]').vm.$emit('click');
        await nextTick();
        expect(wrapper.emitted('input')[0]).toEqual([false]);
    });

    describe('Saving data', () => {
        it('If fields are valid, person is updated in the store and dialog is closed', async () => {
            let mockValidate = jest.fn(() => {
                return true;
            });
            let item = { name: 'Person A', age: 40 };
            wrapper = createWrapper();
            wrapper.setData({ editedItem: item });
            wrapper.vm.$refs.form.validate = mockValidate;
            wrapper.find('[data-test="save"]').vm.$emit('click');
            await nextTick();
            expect($store.commit).toHaveBeenCalledWith('UPDATE_PERSON', item);
            expect(wrapper.emitted('input')[0]).toEqual([false]);
        });
        it('If fields are not valid, person is not updated and dialog remains open (vuetify components will display errors)', async () => {
            let mockValidate = jest.fn(() => {
                return false;
            });
            let item = { name: 'Person A', age: 40 };
            wrapper = createWrapper();
            wrapper.setData({ editedItem: item });
            wrapper.vm.$refs.form.validate = mockValidate;
            wrapper.find('[data-test="save"]').vm.$emit('click');
            await nextTick();
            expect($store.commit).toHaveBeenCalledTimes(0);
            expect(wrapper.emitted('input')).toBeFalsy();
        });
    });
});
