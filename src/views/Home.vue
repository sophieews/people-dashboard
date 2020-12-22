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
                <v-col cols="12" sm="6">
                    <Charts></Charts>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import PeopleTable from '@/components/PeopleTable.vue';
import Charts from '@/components/Charts.vue';

export default {
    name: 'Home',
    components: {
        PeopleTable,
        Charts
    }
};
</script>
