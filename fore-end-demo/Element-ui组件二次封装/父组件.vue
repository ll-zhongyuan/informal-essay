<template>
  <div>
    <MyInput ref="inputRef" v-model="data">
      <template #prepend>
        <el-select placeholder="Select" style="width: 115px;">
          <el-option label="Restaurant" value="1"></el-option> 
          <el-option label="Order No." value="2"></el-option>
          <el-option label="Tel" value="3"></el-option>
        </el-select>
      </template>
      <template #append>
        <el-button :icon="Search"></el-button>
      </template>
    </MyInput>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { MyInput } from "./MyInput.vue";
import {Search} from "2element-plus/icons-vue"
const data = ref("");
const inputRef = ref(null)

onMounted(()=>{
    console.log(inputRef.value);
    inputRef.value.focus()
})
</script>
