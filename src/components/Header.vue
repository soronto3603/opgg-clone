<template>
  <div class="h-24 bg-blue-500 w-screen">
    <div class="w-screen flex justify-center">
      <div class="max-w-5xl w-full h-24 flex justify-end items-end">
        <div class="bg-white flex px-2 mb-3 rounded-[2px] max-w-[260px] w-full justify-between items-center">
          <input class="placeholder:text-gray-300 h-8 ml-2 outline-none" placeholder="소환사명,챔피언..." />
          <IconGG class="w-10 cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconGG from '../icons/IconGG.vue'
export default { components: { IconGG } }
</script>
