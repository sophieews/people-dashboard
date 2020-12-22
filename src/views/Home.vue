<template>
    <div class="home">
        <div class="text-center">
            <h1>People Dashboard</h1>
        </div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6">
                    <PeopleTable></PeopleTable>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import PeopleTable from '@/components/PeopleTable.vue';

export default {
    name: 'Home',
    components: {
        PeopleTable
    }
};
</script>
