<template>
  <div class="flex gap-2 mt-4 ml-8">
    <Badge :key="v" v-for="v in previouseTiers">
      <span class="text-style-5">{{ v.shortString }}</span>
      <span class="text-style-6">{{ v.tier }}</span>
    </Badge>
  </div>

  <div class="flex">
    <div class="relative w-32 h-32 flex justify-center items-center ml-5 mt-[6px]">
      <div class="w-28 h-28">
        <img :src="profileImageUrl" class="w-full h-full" />
      </div>
      <div class="absolute w-full h-full">
        <img :src="profileBorderImageUrl" class="w-full h-full" />
      </div>
      <div class="absolute w-full flex justify-center items-center -bottom-2">
        <Hexagon class="w-24 h-12" />
        <div class="absolute bottom-1 text-style-8">
          <span class="relative right-[2px]">{{ level }}</span>
        </div>
      </div>
    </div>

    <div class="mx-4 mt-2">
      <p class="gg">{{ name }}</p>
      <p>
        <span class="text-style-4">레더 랭킹</span>
        <span class="ml-1 text-style-5">{{ numberWithCommas(ladderRank.rank) }}</span>
        <span class="text-style-4">위 (상위</span>
        <span class="ml-1 text-style-6">{{ ladderRank.rankPercentOfTop }}%</span>
        <span class="text-style-4">)</span>
      </p>
    </div>
  </div>
</template>
<script>
import Badge from './Badge.vue'
import Hexagon from './Hexagon.vue'

export default {
  props: {
    previouseTiers: [],
    level: null,
    name: null,
    profileBorderImageUrl: null,
    profileImageUrl: null,
    ladderRank: null,
  },
  components: {
    Badge,
    Hexagon,
  },
  methods: {
    numberWithCommas(n) {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
}
</script>
