<template>
  <main class="bg-bg">
    <Header></Header>

    <div class="w-screen flex justify-center border-b border-gray-100 pb-6">
      <div class="max-w-5xl w-full">
        <UserProfile
          v-if="summoner"
          :previouse-tiers="summoner.previousTiers"
          :profile-border-image-url="summoner.profileBorderImageUrl"
          :profile-image-url="summoner.profileImageUrl"
          :level="summoner.level"
          :name="summoner.name"
          :ladder-rank="summoner.ladderRank"
        />
      </div>
    </div>

    <div class="w-screen flex justify-center">
      <div class="max-w-5xl w-full">
        <UserDetail
          v-if="summoner"
          :leagues="summoner.leagues"
          :most-position="mostPosition"
          :summary="summary"
          :games="games"
          :win-ratio-champions="winRatioChampions"
          :games-of-week="[...(winRatioChampions || [])].reverse()"
        ></UserDetail>
      </div>
    </div>
  </main>
</template>
<script>
import axios from 'axios'
import Header from './components/Header.vue'
import UserProfile from './components/UserProfile.vue'
import UserDetail from './components/UserDetail.vue'

export default {
  data() {
    return {
      summoner: null,
      games: [],
      champions: [],
      positions: [],
      summary: null,
      winRatioChampions: [],
    }
  },
  computed: {
    mostPosition() {
      return this.positions.length > 0 ? this.positions.reduce((prev, curr) => (prev.games > curr.games ? prev : curr)) : null
    },
  },
  mounted() {
    this.fetch('soronto3603')
  },
  methods: {
    async fetch(summonerName) {
      const { summoner } = await axios
        .get(`https://codingtest.op.gg/api/summoner/${summonerName}`, {
          params: {
            hl: 'ko',
          },
        })
        .then(({ data }) => data)

      const { games, champions, positions, summary } = await axios
        .get(`https://codingtest.op.gg/api/summoner/${summonerName}/matches`, {
          params: {
            hl: 'ko',
            lastMatch: 0,
          },
        })
        .then(({ data }) => data)

      const { champions: winRatioChampions } = await axios
        .get(`https://codingtest.op.gg/api/summoner/${summonerName}/mostInfo`, {
          params: {
            hl: 'ko',
          },
        })
        .then(({ data }) => data)

      console.log(games, champions, positions, summoner, winRatioChampions, 'hi')

      Object.assign(this, {
        summoner,
        games,
        champions,
        positions,
        summary,
        winRatioChampions,
      })
    },
  },
  components: { Header, UserProfile, UserDetail },
}
</script>
