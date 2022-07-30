<template>
  <!-- { "hasResults": true, "wins": 922, "losses": 112, "tierRank": { "name": "자유 5:5 랭크", "tier": "Grandmaster", "tierDivision": "Grandmaster", "string": "Grandmaster (520LP)", "shortString": "GM1", "division": "i", "imageUrl": "https://opgg-static.akamaized.net/images/medals/grandmaster_1.png", "lp": 520, "tierRankPoint": 262 } } -->
  <div class="bg-gray-50 flex border border-gray-350 rounded-[2px]">
    <div class="w-24 my-4 mx-4 flex items-center">
      <img v-if="league.hasResults" :src="league.tierRank.imageUrl" />
      <img v-else :src="ImageUnranked" />
    </div>
    <div class="flex flex-col justify-center my-4">
      <p class="text-style-9">{{ league.tierRank.name }}</p>
      <p v-if="mostPosition">
        <span class="text-style-position-bold">{{ POSITION_DICT[mostPosition.position] }}</span>
        <span class="text-style-position ml-1">(총 {{ summary.wins + summary.losses }}게임)</span>
      </p>
      <p class="mt-1" :class="[league.hasResults ? 'text-style-10' : 'text-style-11']">
        {{ league.hasResults ? league.tierRank.tier : 'Unranked' }}
      </p>
      <p>
        <span class="text-style-position-bold">{{ league.tierRank.lp }}LP</span>
        <span class="text-style-position">/ {{ summary.wins }}승 {{ summary.losses }}패</span>
      </p>
      <p class="text-style-position">승률 {{ winPercent }}%</p>
    </div>
  </div>
</template>
<script>
import ImageUnranked from '../assets/unranked.png'

const POSITION_DICT = {
  MID: '미드',
  TOP: '탑',
  ADC: '원딜',
  SUP: '서포터',
  JNG: '정글',
}

export default {
  props: {
    league: null,
    mostPosition: null,
    summary: 0,
  },
  computed: {
    winPercent() {
      return Math.round((this.summary.wins / (this.summary.wins + this.summary.losses)) * 100)
    },
  },
  data() {
    return {
      ImageUnranked,
      POSITION_DICT,
    }
  },
  mounted() {
    console.log(this.summary)
  },
  methods: {
    transformPositionName() {},
  },
}
</script>
