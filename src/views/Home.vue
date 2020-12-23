<template>
    <div class="home">
        <div class="text-center">
            <h1>People Dashboard</h1>
        </div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="7">
                    <Table></Table>
                </v-col>
                <v-col cols="12" sm="5">
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
