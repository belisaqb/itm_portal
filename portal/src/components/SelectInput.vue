<template>
    <fieldset class="select">
        <label class="select--label" v-bind:for="id">{{ title }}</label>
        <select class="select--input" name="" v-bind:id="id">
            <option class="select--option" v-bind:key="option" v-for="option in options" v-bind:value="option">
                {{ option }}
            </option>
        </select>
    </fieldset>
</template>

<script setup>
    import {defineProps} from "vue" 

    defineProps({
        title: String,
        options: [String],
        id: String
    })
</script>

<style lang="scss">
    .select {
        display: flex;
        flex-direction: column;
        align-items: center;
        &--label {
            text-transform: uppercase;
        }
        &--input {
            width: 100%;
        }
        &--option {

        }
    }
</style>