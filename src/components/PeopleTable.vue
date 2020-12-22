<template>
    <div>
        <v-data-table :headers="headers" :items="people"></v-data-table>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'PeopleTable',
    data() {
        return {
            headers: [
                { text: 'Name', value: 'name' },
                { text: 'Age', value: 'age' },
                { text: 'Gender', value: 'gender' }
            ]
        };
    },
    computed: {
        ...mapState(['people'])
    }
};
</script>
