<script lang="ts" setup>
import { ref } from 'vue'

let download_config: Ref = ref({});
let plugin: Ref = ref({});

const getDownloadConfig = async () => {
    storage.getMeta('local:config').then((config) => {
        plugin.value = config as {};
        download_config.value = config.download as {};
        console.log(download_config.value);
    })
}

const setDownloadConfig = async () => {
    plugin.value.download = download_config.value;
    storage.setMeta('local:config', plugin.value);
}

onMounted(() => {
    getDownloadConfig();
})
</script>

<template>
    <el-form label-position="left" label-width="auto">
        <el-form-item v-for="cfg in download_config" :key="cfg.name" :label="cfg.name">
            <el-switch v-model="cfg.enable" @change="setDownloadConfig"/>
        </el-form-item>
    </el-form>
</template>

<style scoped></style>