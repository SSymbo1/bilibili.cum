<script lang="ts" setup>
import plugin from '@/package.json'
import config from '@/assets/configs/plugin.json'

const initPluginConfig = async () => {
    await ElMessageBox.confirm('您确定要初始化插件配置项吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    });
    storage.setMeta('local:config', config.config);
    browser.runtime.sendMessage({ type: 'init', matches: ["*://*.bilibili.com/*"] });
    ElMessage.success('插件配置初始化成功');
};

const checkPluginUpdate = () => {
    window.open(plugin.homepage, '_blank');
};

</script>

<template>
    <div align="center">
        <img src="../../public/icon/128.png" width="80" align="center" />
        <h1>{{ plugin.name }}</h1>
        <br />
        <strong>{{ plugin.description }}</strong>
        <br />
        <strong>版本:{{ plugin.version }}</strong>
        <br />
        <strong>作者:{{ plugin.author.name }}</strong>
        <div style="margin-top: 15px;">
            <el-button round type="danger" @click="initPluginConfig">初始化配置项</el-button>
            <el-button round type="primary" @click="checkPluginUpdate">检查更新</el-button>
        </div>

    </div>
</template>

<style scoped></style>