<template>
    <Page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
        <TabView android:tabBackgroundColor="#821278"
                 android:tabTextColor="#e1a3ff"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
            <TabViewItem title="Rögzítés">
                <NewSpending/>
            </TabViewItem>
            <TabViewItem title="Tételek">
                <Statistics/>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
import NewSpending from '@/components/Tabs/NewSpending'
import Statistics from '@/components/Tabs/Statistics'

  export default {
    components: {
        NewSpending,
        Statistics
    }
}
</script>

<style scoped>
TabView {
    background-color: #e1a3ff;
}
</style>
