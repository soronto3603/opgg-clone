<template>
  <div class="flex gap-2">
    <div class="w-full flex-[0_0_300px] gap-2 flex flex-col mt-2">
      <RankCard class="h-[124px] bg-white" />
      <RankCard class="h-[94px] bg-white" />
      <RankCard class="h-[94px] bg-white" />
    </div>
    <div class="w-full mt-2">
      <div class="h-[94px] w-full bg-white"></div>
    </div>
  </div>
</template>
<script>
import RankCard from './RankCard.vue'
export default {
  components: { RankCard },
}
</script>
