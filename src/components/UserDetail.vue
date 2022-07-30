<template>
  <div class="flex gap-2">
    <div class="w-full flex-[0_0_300px] gap-2 flex flex-col mt-2">
      <RankCard :key="i" v-for="(v, i) in leagues" :league="v" :summary="summary" :most-position="mostPosition" />

      <div>
        <TwoTabList :items="menu" @change="selectedMenu1 = $event">
          <div class="border-l border-b border-r border-gray-350">
            <div
              :key="champion.id"
              v-for="(champion, i) in selectedMenu1 === menu[0] ? winRatioChampions : gamesOfWeek"
              class="flex py-1 px-4"
              :class="i !== 0 ? 'border-t border-gray-350' : ''"
            >
              <div class="w-11 overflow-hidden rounded-full">
                <img :src="champion.imageUrl" class="w-full" />
              </div>
              <div class="flex flex-col justify-center items-start gap-1 ml-2 flex-[0_0_90px]">
                <p class="text-style-12 whitespace-nowrap">{{ champion.name }}</p>
                <p class="text-style-6">CS {{ champion.cs }} (2.4)</p>
              </div>

              <div class="flex flex-col justify-center items-center gap-1 ml-4">
                <p :class="getKDAColor(round((champion.kills + champion.assists) / champion.deaths, 2))" class="text-style-12">
                  {{ round((champion.kills + champion.assists) / champion.deaths, 2) }}:1 평점
                </p>
                <p class="text-style-6">{{ champion.kills }} / {{ champion.deaths }} / {{ champion.assists }}</p>
              </div>

              <div class="flex-1 flex justify-end items-center">
                <div class="flex flex-col justify-center items-center gap-1">
                  <p :class="getWinRatioColor(champion.wins / champion.games)" class="text-style-12">
                    {{ round((champion.wins / champion.games) * 100, 0) }}%
                  </p>
                  <p class="text-style-6">{{ champion.games }}게임</p>
                </div>
              </div>
            </div>
          </div>
        </TwoTabList>
      </div>

      <div class="mt-12">
        <TwoTabList :items="menu" @change="selectedMenu2 = $event">
          <div class="border-l border-b border-r border-gray-350">
            <div
              :key="champion.id"
              v-for="(champion, i) in selectedMenu2 === menu[0] ? winRatioChampions : gamesOfWeek"
              class="flex py-1 px-4 items-center"
              :class="i !== 0 ? 'border-t border-gray-350' : ''"
            >
              <div class="w-8 overflow-hidden rounded-full">
                <img :src="champion.imageUrl" class="w-full" />
              </div>
              <div class="flex justify-start items-center ml-2 flex-[0_0_90px]">
                <p class="text-style-12 whitespace-nowrap">{{ champion.name }}</p>
              </div>
              <div class="flex justify-end items-center flex-[0_0_30px]">
                <p class="text-style-12 whitespace-nowrap text-style-11">{{ round((champion.wins / champion.games) * 100, 0) }}%</p>
              </div>
              <div class="flex flex-1 h-6 items-center ml-4">
                <div
                  class="h-full whitespace-nowrap bg-blue-600 text-white flex items-center text-style-5 font-helveticaBold rounded-tl-[4px] rounded-bl-[4px]"
                  :style="{
                    width: `${round((champion.wins / champion.games) * 100, 0)}%`,
                  }"
                >
                  <span class="mx-1">{{ champion.wins }}승</span>
                </div>
                <div
                  class="h-full whitespace-nowrap flex justify-end text-white bg-red-600 items-center text-style-5 font-helveticaBold rounded-tr-[4px] rounded-br-[4px]"
                  :style="{
                    width: `${round((champion.losses / champion.games) * 100, 0)}%`,
                  }"
                >
                  <span class="mx-1">{{ champion.losses }}패</span>
                </div>
              </div>
            </div>
          </div>
        </TwoTabList>
      </div>
    </div>
    <div class="w-full mt-2">
      <div class="h-[94px] w-full bg-white"></div>
    </div>
  </div>
</template>
<script>
import RankCard from './RankCard.vue'
import TwoTabList from './TwoTabList.vue'

export default {
  components: { RankCard, TwoTabList },
  props: {
    leagues: [],
    mostPosition: null,
    summary: null,
    winRatioChampions: [],
    gamesOfWeek: [],
  },
  data() {
    const menu = ['챔피언 승률', '7일간 랭크 승률']

    return {
      menu,
      selectedMenu1: menu[0],
      selectedMenu2: menu[0],
    }
  },
  methods: {
    round(n, floatingPoint) {
      return Math.round(n * Math.pow(10, floatingPoint)) / Math.pow(10, floatingPoint)
    },
    getKDAColor(n) {
      if (n >= 3) {
        return 'text-good'
      } else if (n >= 4) {
        return 'text-best'
      } else if (n >= 5) {
        return 'text-perfect'
      }
      return ''
    },
    getWinRatioColor(n) {
      if (n >= 0.6) {
        return 'text-goodRatio'
      }
      return ''
    },
  },
}
</script>
