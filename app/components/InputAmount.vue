<template>
<Page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
    <StackLayout>
        <TextField keyboardType="number" ref="amountInput" v-model="amount" @returnPress="onSubmit"></TextField>
        <img class="image" :src="'res://'+category" stretch="aspectFill"/>
    </StackLayout>
</Page>
</template>

<script>
import { mapState } from 'vuex'
import NewSpending from './Tabs/NewSpending';
import App from './App';
import * as Toast from 'nativescript-toast';

    export default {
        data() {
            return {
                amount: '',
            }
        },

        computed: {
            ...mapState('expenses', [
                'expenses'
            ])
        },

        props: ['category'],

        mounted() {
            setTimeout(() => this.$refs.amountInput.nativeView.focus(), 300);
        },

        methods: {
            onSubmit() {
                this.$store.dispatch('expenses/add', { category:this.category, amount:this.amount }).then(() => {
                    Toast.makeText('Sikeres mentés').show();
                    this.$navigateTo(App);
                }).catch(e => Toast.makeText('Mentés sikertelen!').show());
            }
        }
    }
</script>

<style scoped>
Page {
    background-color: #e1a3ff;
}
</style>