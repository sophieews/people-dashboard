<template>
    <v-app>
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import people from '@/utils/people.json';

export default {
    name: 'App',

    mounted() {
        this.$store.commit('SET_PEOPLE', people);
    }
};
</script>
