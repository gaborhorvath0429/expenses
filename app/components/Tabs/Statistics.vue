<template>
  <ListView for="item in expenses">
    <v-template>
      <GridLayout class="item" columns="*, 6*, *" rows="50">
          <Image col='0' style="margin-top:5; vertical-align:center;" stretch="aspectFit" :src="'res://'+item.category"/>
          <Label col='1' style="margin-top:10; horizontal-align: center; font-weight: bold" :text="item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Ft'"/>
          <Image col='2' style="margin-top:10; vertical-align:center;" stretch="aspectFit" src="res://delete" @tap="remove(item)"/>
      </GridLayout>
    </v-template>
  </ListView>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data () {
        return {

        }
    },
    computed: {
        ...mapState('expenses', [
            'expenses'
        ])
    },
    methods: {
        remove(expense) {
            confirm({
                title: "Megerősítés",
                message: "Biztosan törölni akarod?",
                okButtonText: "Igen",
                cancelButtonText: "Nem"
            }).then(result => {
                if (result) this.$store.dispatch('expenses/remove', expense)
            });
        }
    }
}
</script>

<style scoped>
.item {
    height:40
}
</style>