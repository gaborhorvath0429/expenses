<template>
<StackLayout>
    <GridLayout rows='auto' columns='auto *'>
        <listPicker row='0' col='0' ref='year' :items='years' @selectedIndexChange="filterItems"/>
        <listPicker row='0' col='1' :items='months' ref='month' @selectedIndexChange="filterItems"/>
    </GridLayout>
    <SegmentedBar  v-model='chartMode'>
        <SegmentedBarItem title="Kördiagram"/>
        <SegmentedBarItem title="Oszlopdiagram"/>
    </SegmentedBar>
      <RadPieChart v-show='displayChart && chartMode === 0'>
      <PieSeries v-tkPieSeries
            allowAnimation="true"
            selectionMode="DataPoint"
            expandRadius="0.4"
            outerRadiusFactor="0.7"
            valueProperty="sum"
            legendLabel="_id"
            :items="items" />
        <RadLegendView v-tkPieLegend position="Right" title="Kategóriák"
                       offsetOrigin="TopRight" width="110"
                       enableSelection="true"></RadLegendView>
                       
    </RadPieChart>

    <RadCartesianChart v-show='displayChart && chartMode === 1'>
      <BarSeries v-tkCartesianSeries
                 categoryProperty="_id"
                 valueProperty="sum"
                 :items="items" />
      <CategoricalAxis v-tkCartesianHorizontalAxis />
      <LinearAxis v-tkCartesianVerticalAxis />
    </RadCartesianChart>
</StackLayout>
</template>

<script>
import axios from 'axios'
const ObservableArray = require("data/observable-array").ObservableArray;

export default {
    data () {
        return {
            year: (new Date()).getFullYear(),
            month: ((new Date()).getMonth() + 1).toString(),
            years: [(new Date()).getFullYear() -1, (new Date()).getFullYear()],
            months: ['1','2','3','4','5','6','7','8','9','10','11','12'],
            filteredItems: [],
            displayChart: true,
            chartMode: 0
        };
    },

    computed: {
        items() {
            return new ObservableArray([this.filteredItems]);
        }
    },

    methods: {
        async filterItems() {
            this.year = this.years[this.$refs.year.nativeView.selectedIndex];
            this.month = this.months[this.$refs.month.nativeView.selectedIndex];
            if (typeof this.month !== 'undefined') {
                let month = this.month;
                let year = this.year;
                if (month.length === 1) month = '0' + month;
                let res = await axios.get(process.env.API_URL + '/expense/statistics', {
                    params: {year, month}
                });
                this.filteredItems = res.data;
                this.displayChart = res.data.length;
            }
        }
    },

    watch: {
        filteredItems(val) {
            this.items.set('_array', val);
        }
    },

    mounted() {
        this.$refs.year.nativeView.selectedIndex = this.years.indexOf((new Date()).getFullYear());
        this.$refs.month.nativeView.selectedIndex = this.months.indexOf(((new Date()).getMonth() + 1).toString());
        this.filterItems();
    }
}
</script>

<style scoped>
</style>