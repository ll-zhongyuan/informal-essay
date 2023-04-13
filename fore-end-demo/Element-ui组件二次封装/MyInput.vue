<template>
  <div class="my-input">
    <el-input ref="inp" v-bind="$attrs">
      <template v-for="(value, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"></slot>
      </template>
    </el-input>
  </div>
</template>

<script>
export default {
  //   props: ["a", "b"],
  mounted() {
    const entries = Object.entries(this.$refs.inp);
    for (const [key, value] of entries) {
      this[key] = value;
    }
  },
  created() {
    console.log(this.$attrs);
    console.log(this.$slots);
    console.log(this.$refs.inp);
  },
};
</script>

<style scoped>
.my-input {
  transition: 0.3s;
}
.my-input:hover,
.my-input:focus-within {
  fill: drop-shadow(0 0 3px rgb(0, 0, 0));
}
</style>
