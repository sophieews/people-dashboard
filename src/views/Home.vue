<template>
    <div class="home">
        <div class="text-center pt-4">
            <h1>People Dashboard</h1>
        </div>
        <v-container fluid class="px-8">
            <v-row>
                <v-col sm="12" md="7">
                    <Table></Table>
                </v-col>
                <v-col sm="12" md="5">
                    <Charts></Charts>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
import Charts from '@/components/Charts.vue';

export default {
    name: 'Home',
    components: {
        Table,
        Charts
    }
};
</script>
