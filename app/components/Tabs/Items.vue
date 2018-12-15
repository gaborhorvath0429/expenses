<template>
<StackLayout>
  <DatePicker ref='datepicker' @loaded='loaded()' @dateChange='getExpenses()' class='datepicker'/>
  <ListView for="item in expenses">
    <v-template>
      <GridLayout class="item" columns="*, 6*, *" rows="60">
          <Image col='0' style="margin-top:5; vertical-align:center;" stretch="aspectFit" :src="'res://'+item.category"/>
          <Label col='1' style="margin-top:10; horizontal-align: center; font-weight: bold" :text="item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft'"/>
          <Image col='2' style="margin-top:10; vertical-align:center;" stretch="aspectFit" src="res://delete" width='25' @tap="remove(item)"/>
      </GridLayout>
    </v-template>
  </ListView>
</StackLayout>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            expenses: []
        }
    },

    methods: {
        async getExpenses() {
            let {year, month, day} = this.$refs.datepicker.nativeView;
            let expenses = await axios.get(process.env.API_URL + '/expense', {
                params: {year, month, day}
            });
            this.expenses = expenses.data;
        },

        loaded() {
            this.getExpenses();
        },

        remove(expense) {
            confirm({
                title: "Megerősítés",
                message: "Biztosan törölni akarod?",
                okButtonText: "Igen",
                cancelButtonText: "Nem"
            }).then(result => {
                if (result) {
                    axios.delete(process.env.API_URL + '/expense/' + expense._id).then(() => this.getExpenses());
                }
            });
        }
    }
}
</script>

<style scoped>
.datepicker {
    height: 150;
    border-bottom-color: #d981ef;
    border-bottom-width: 7;
}
</style>