<template>
    <div>
        <!-- Filter chip -->
        <v-chip
            v-if="$route.query.prop"
            close
            @click:close="$router.replace({ query: {} })"
            >{{ $route.query.prop }}: {{ $route.query.val }}</v-chip
        >
        <!-- People Table -->
        <v-data-table :headers="headers" :items="filteredPeople">
            <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="
                        editDialog = true;
                        editItem = item;
                    "
                >
                    mdi-pencil
                </v-icon>
            </template>
        </v-data-table>
        <EditDialog v-model="editDialog" :item="editItem"></EditDialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import EditDialog from '@/components/EditDialog';
export default {
    name: 'PeopleTable',
    components: { EditDialog },
    data() {
        return {
            headers: [
                { text: 'Name', value: 'name' },
                { text: 'Age', value: 'age' },
                { text: 'Gender', value: 'gender' },
                { text: 'Eye Color', value: 'eyeColor' },
                { text: 'Pet', value: 'preferences.pet' },
                { text: 'Fruit', value: 'preferences.fruit' },
                { text: 'Edit', value: 'actions' }
            ],
            editDialog: false,
            editItem: {}
        };
    },
    computed: {
        ...mapState(['people']),
        filteredPeople() {
            if (!this.$route.query.prop || !this.$route.query.val) {
                return this.people;
            } else {
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
    }
};
</script>
