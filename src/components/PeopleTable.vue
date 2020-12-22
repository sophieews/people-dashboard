<template>
    <div>
        <v-chip
            v-if="$route.query.prop"
            close
            @click:close="$router.replace({ query: {} })"
            >{{ $route.query.prop }}: {{ $route.query.val }}</v-chip
        >
        <v-data-table :headers="headers" :items="filteredPeople"></v-data-table>
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
        ...mapState(['people']),
        filteredPeople() {
            switch (this.$route.query.prop) {
                case 'Age':
                    return this.people.filter(person => {
                        return person['age'] == this.$route.query.val;
                    });
                case 'Gender':
                    return this.people.filter(person => {
                        return person['gender'] == this.$route.query.val;
                    });
                case 'Eye Color':
                    return this.people.filter(person => {
                        return person['eyeColor'] == this.$route.query.val;
                    });
                default:
                    return this.people;
            }
        }
    }
};
</script>
