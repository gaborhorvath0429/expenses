<template>
<ScrollView>
    <GridLayout columns="*, *, *" rows="*, *, *, *">
        <img class="image" @tap="onImageTap('house')" src="res://house" stretch="aspectFill" col="0" row="0"/>
        <img class="image" @tap="onImageTap('food')" src="res://food" stretch="aspectFill" col="1" row="0"/>
        <img class="image" @tap="onImageTap('alcohol')" src="res://alcohol" stretch="aspectFill" col="2" row="0"/>
        <img class="image" @tap="onImageTap('party')" src="res://party" stretch="aspectFill" col="0" row="1"/>
        <img class="image" @tap="onImageTap('cigarette')" src="res://cigarette" stretch="aspectFill" col="1" row="1"/>
        <img class="image" @tap="onImageTap('clothes')" src="res://clothes" stretch="aspectFill" col="2" row="1"/>
        <img class="image" @tap="onImageTap('entertainment')" src="res://entertainment" stretch="aspectFill" col="0" row="2"/>
        <img class="image" @tap="onImageTap('travel')" src="res://travel" stretch="aspectFill" col="1" row="2"/>
        <img class="image" @tap="onImageTap('etc')" src="res://etc" stretch="aspectFill" col="2" row="2"/>
    </GridLayout>
</ScrollView>
</template>

<script>
import { Animation } from 'ui/animation'
import InputAmount from '../InputAmount';

    export default {
        methods: {
            onImageTap(category) {
                this.$navigateTo(InputAmount, {
                    props: {
                        category
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>