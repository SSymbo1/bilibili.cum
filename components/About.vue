<script lang="ts" setup>
import plugin from '../package.json'

const initPluginConfig = async () => {

}

</script>

<template>
    <div align="center">
        <img src="../public/icon/title.png" width="80" align="center" />
        <h1>{{ plugin.name }}</h1>
        <br />
        <strong>{{ plugin.description }}</strong>
        <br />
        <strong>版本:{{ plugin.version }}</strong>
        <br />
        <strong>作者:{{ plugin.author.name }}</strong>
        <div style="margin-top: 15px;">
            <el-button round type="danger" @click="initPluginConfig">初始化配置项</el-button>
            <el-button round type="primary">检查更新</el-button>
        </div>

    </div>
</template>

<style scoped></style>