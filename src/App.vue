<template>
  <HelloWorld msg="Vite + Vue" />
</template>
<script>
import axios from 'axios'

function fetch(summonerName) {
  return
}

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
}
</script>
