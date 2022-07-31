<template>
  <div
    class="flex relative rounded-full justify-center items-center"
    :style="{
      background: `conic-gradient(#ee5a52 0 ${100 - value}%, #1f8ecd ${100 - value}%)`,
    }"
  >
    <div class="bg-white rounded-full w-[68px] h-[68px] flex justify-center items-center font-helveticaBold text-[14px]">{{ value }}%</div>
  </div>
</template>
<script>
export default {
  props: {
    value: null,
  },
}
</script>
