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
      <div class="w-full bg-gray-50 border border-gray-350 flex px-4 gap-6">
        <span
          class="h-9 flex cursor-pointer items-center border-b-2 text-style-position text-gray-450"
          :class="v === selectedGameFilter ? 'border-blue-600 text-blue-600' : 'border-transparent'"
          :key="index"
          @click="onClickGameFilter(v)"
          v-for="(v, index) in gameFilters"
        >
          {{ v }}</span
        >
      </div>

      <div class="flex bg-gray-150 border-l border-r border-b border-gray-350">
        <div class="flex">
          <div class="flex flex-col items-center mt-4 mb-6">
            <div>
              <p class="font-helvetica text-[12px] text-gray-430 mx-8">
                {{ this.filteredGames.length }}전 {{ this.countOfWin }}승 {{ this.countOfLoss }}패
              </p>
            </div>
            <div class="w-24 h-24 mt-3">
              <CircleChart class="w-full h-full" :value="round(winPercent, 0)" />
            </div>
          </div>
          <div class="flex flex-col items-center justify-center ml-4 mr-8">
            <div class="font-helveticaBold text-[11px]">
              {{ round(killAvg, 2) }} / <span class="text-death font-helveticaBold text-[11px]">{{ round(deathAvg, 2) }}</span> /
              {{ round(assistAvg, 2) }}
            </div>
            <div class="mt-1">
              <span class="font-helveticaBold text-[16px]" :class="getKDAColor(kda)">{{ round(kda, 2) }}:1</span
              ><span class="ml-1" :class="getWinRatioColor(winPercent / 100, 0)">({{ winPercent }}%)</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-between border-l border-gray-350 py-4 px-4">
          <div class="flex items-center">
            <div class="w-[34px] h-[34px] rounded-full overflow-hidden">
              <img src="https://opgg-static.akamaized.net/images/lol/champion/Lulu.png" />
            </div>
            <div class="flex flex-col ml-2">
              <p class="text-[14px]">룰루</p>
              <p class="relative -mt-1">
                <span class="font-helveticaBold text-[11px] text-goodRatio">70%</span>
                <span class="font-helvetica text-[11px] text-gray-450"> (7승 3패) | </span>
                <span class="font-helveticaBold text-[11px] text-perfect">13.01 평점</span>
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <div class="w-[34px] h-[34px] rounded-full overflow-hidden">
              <img src="https://opgg-static.akamaized.net/images/lol/champion/Leblanc.png" />
            </div>
            <div class="flex flex-col ml-2">
              <p class="text-[14px]">르블랑</p>
              <p class="relative -mt-1">
                <span class="font-helveticaBold text-[11px] text-gray-450">48%</span>
                <span class="font-helvetica text-[11px] text-gray-450"> (7승 3패) | </span>
                <span class="font-helveticaBold text-[11px] text-gray-450">0.91 평점</span>
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <div class="w-[34px] h-[34px] rounded-full overflow-hidden">
              <img :src="ImageGroup" />
            </div>
            <div class="flex flex-col ml-2">
              <p class="text-[11px] text-gray-380">챔피언 정보가 없습니다.</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col border-l justify-between border-gray-350 py-4 px-4">
          <div class="text-gray-430 text-[12px]">선호 포지션 (랭크)</div>

          <div class="flex items-center">
            <div>
              <img :src="ImageMostPosition1" />
            </div>
            <div class="ml-2">
              <div class="text-gray-500 text-[14px]">탑</div>
              <div class="-mt-1">
                <span class="text-blue-600 font-helveticaBold text-[11px]">70%</span>
                <span class="font-helvetica text-[11px] text-gray-430"> | Win Rate </span>
                <span class="font-helveticaBold text-[11px] text-gray-500">53%</span>
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <div>
              <img :src="ImageMostPosition2" />
            </div>
            <div class="ml-2">
              <div class="text-gray-500 text-[14px]">탑</div>
              <div class="-mt-1">
                <span class="text-blue-600 font-helveticaBold text-[11px]">30%</span>
                <span class="font-helvetica text-[11px] text-gray-430"> | 승률 </span>
                <span class="font-helveticaBold text-[11px] text-gray-500">53%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RankCard from './RankCard.vue'
import TwoTabList from './TwoTabList.vue'
import CircleChart from './CircleChart.vue'
import ImageGroup from '../assets/group.png'
import ImageMostPosition1 from '../assets/icon-mostposition-top.png'
import ImageMostPosition2 from '../assets/icon-mostposition-jng.png'

export default {
  components: { RankCard, TwoTabList, CircleChart },
  props: {
    leagues: [],
    mostPosition: null,
    summary: null,
    games: [],
    winRatioChampions: [],
    gamesOfWeek: [],
  },
  computed: {
    filteredGames() {
      if (this.selectedGameFilter === '솔로게임') {
        return this.games.filter(game => game.gameType === '솔랭')
      } else if (this.selectedGameFilter === '자유랭크') {
        return this.games.filter(game => game.gameType === '자유 5:5 랭크')
      }

      return this.games
    },
    kda() {
      return (this.killAvg + this.assistAvg) / this.deathAvg + 2
    },
    killAvg() {
      const sum = this.filteredGames.reduce((prev, curr) => curr.stats.general.kill + prev, 0)
      return sum / this.filteredGames.length
    },
    deathAvg() {
      const sum = this.filteredGames.reduce((prev, curr) => curr.stats.general.death + prev, 0)
      return sum / this.filteredGames.length
    },
    assistAvg() {
      const sum = this.filteredGames.reduce((prev, curr) => curr.stats.general.assist + prev, 0)
      return sum / this.filteredGames.length
    },
    countOfWin() {
      return this.filteredGames.reduce((prev, curr) => (curr.isWin ? prev + 1 : prev), 0)
    },
    countOfLoss() {
      return this.filteredGames.length - this.countOfWin
    },
    winPercent() {
      return (this.countOfWin / this.filteredGames.length) * 100
    },
  },
  data() {
    const menu = ['챔피언 승률', '7일간 랭크 승률']

    return {
      menu,
      gameFilters: ['전체', '솔로게임', '자유랭크'],
      selectedMenu1: menu[0],
      selectedMenu2: menu[0],
      selectedGameFilter: '전체',
      ImageGroup,
      ImageMostPosition1,
      ImageMostPosition2,
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
    onClickGameFilter(filter) {
      console.log(filter)
      this.selectedGameFilter = filter
    },
  },
}
</script>
