<script lang="ts" setup>
import menue from '@/assets/configs/menue.json'
import router from '@/router';

</script>

<template>
  <el-container class="container">
    <!-- 侧边菜单栏 -->
    <el-aside class="side_menue">
      <el-menu :collapse="true" :default-active="menue.default_tab" style="width: 100%;">
        <el-menu-item 
          v-for="child in menue.menue_tab" 
          :key="child.name" 
          :index="child.name" 
          @click="router.push(child.path)">
          <el-icon>
            <component :is="child.icon"></component>
          </el-icon>
          <template #title>{{child.name}}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 主体显示 -->
    <el-main class="main_window">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped>
@import "./style.css"
</style>
