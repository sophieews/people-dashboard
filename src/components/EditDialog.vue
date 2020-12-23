<template>
    <v-dialog v-model="show" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Edit Person</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form v-model="valid" ref="form">
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    v-model="editedItem.name"
                                    label="Name"
                                    :rules="required"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    v-model="editedItem.age"
                                    label="Age"
                                    :rules="required"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    v-model="editedItem.eyeColor"
                                    label="Eye Color"
                                    :rules="required"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    v-model="editedItem.gender"
                                    label="Gender"
                                    :rules="required"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                v-for="(item, index) in editedItem.preferences"
                                :key="index"
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-text-field
                                    v-model="editedItem.preferences[index]"
                                    :label="index"
                                    :rules="required"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="show = false"
                    data-test="close"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                    data-test="save"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'EditDialog',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            editedItem: {},
            valid: true,
            required: [v => !!v || 'Field cannot be left blank']
        };
    },
    computed: {
        show: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            }
        }
    },
    watch: {
        show(val) {
            if (val && this.item) {
                this.editedItem = Object.assign({}, this.item);
            }
        }
    },
    methods: {
        save() {
            if (this.$refs.form.validate()) {
                this.$store.commit('UPDATE_PERSON', this.editedItem);
                this.show = false;
            }
        }
    }
};
</script>
