<script lang="ts" setup>
let optimize_config: Ref = ref({});
let plugin: Ref = ref({});

const getOptimizeConfig = async () => {
    storage.getMeta('local:config').then((config) => {
        plugin.value = config as {};
        optimize_config.value = config.optimize as {};
        console.log(optimize_config.value);
    });
};

const setOptimizeConfig = async (matches: Array<string>) => {
    plugin.value.optimize = optimize_config.value;
    storage.setMeta('local:config', plugin.value);
    browser.runtime.sendMessage({ type: 'optimize', matches: matches });
};

onMounted(() => {
    getOptimizeConfig();
});
</script>

<template>
    <el-form label-position="left" label-width="auto">
        <el-form-item v-for="cfg in optimize_config" :key="cfg.name" :label="cfg.name">
            <el-switch v-model="cfg.enable" @change="setOptimizeConfig(cfg.matches)" />
        </el-form-item>
    </el-form>
</template>

<style scoped></style>