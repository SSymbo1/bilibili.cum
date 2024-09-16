<script lang="ts" setup>
import { ref } from 'vue'

let ad_config: Ref = ref({});
let plugin: Ref = ref({});

const getAdvertisementConfig = async () => {
    storage.getMeta('local:config').then((config) => {
        plugin.value = config as {};
        ad_config.value = config.advertisement as {};
        console.log(ad_config.value);
    })
}

const setAdvertisementConfig = async () => {
    plugin.value.advertisement = ad_config.value;
    storage.setMeta('local:config', plugin.value);
}

onMounted(() => {
    getAdvertisementConfig();
})
</script>

<template>
    <el-form label-position="left" label-width="auto">
        <el-form-item v-for="cfg in ad_config" :key="cfg.name" :label="cfg.name">
            <el-switch v-model="cfg.enable" @change="setAdvertisementConfig" />
        </el-form-item>
    </el-form>
</template>

<style scoped></style>