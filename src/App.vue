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
        <UserDetail></UserDetail>
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
    }
  },
  mounted() {
    this.fetch('soronto3603')
  },
  methods: {
    fetch(summonerName) {
      return axios
        .get(`https://codingtest.op.gg/api/summoner/${summonerName}`, {
          params: {
            hl: 'ko',
          },
        })
        .then(({ data }) => {
          console.log(data)
          Object.assign(this, data)
        })
    },
  },
  components: { Header, UserProfile, UserDetail },
}
</script>
