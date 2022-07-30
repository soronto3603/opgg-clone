<template>
  <main>
    <Header></Header>

    <div class="w-screen flex justify-center">
      <div class="max-w-5xl w-full h-24">
        <UserProfile></UserProfile>
      </div>
    </div>

    <div class="w-screen flex justify-center">
      <div class="max-w-5xl w-full h-24">
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
      user: null,
    }
  },
  mounted() {
    this.fetch('Hide on bush')
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
          this.user = data
        })
    },
  },
  components: { Header, UserProfile, UserDetail },
}
</script>
