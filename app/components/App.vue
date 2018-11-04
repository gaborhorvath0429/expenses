<template>
    <Page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
        <TabView android:tabBackgroundColor="#821278"
                 android:tabTextColor="#e1a3ff"
                 android:selectedTabTextColor="#ffffff"
                 androidSelectedTabHighlightColor="#ffffff">
            <TabViewItem title="Kiadás">
                <NewSpending/>
            </TabViewItem>
            <TabViewItem title="Bevétel">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 2 Content" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
            <TabViewItem title="Statisztika">
                <GridLayout columns="*" rows="*">
                    <Label class="message" text="Tab 3 Content" col="0" row="0"/>
                </GridLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
import NewSpending from '@/components/Tabs/NewSpending'

  export default {
    components: {
        NewSpending
    }
}
</script>

<style scoped>
TabView {
    background-color: #e1a3ff;
}
</style>
