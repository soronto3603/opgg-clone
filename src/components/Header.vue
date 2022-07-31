<template>
  <div class="h-24 bg-blue-500 w-screen">
    <div class="w-screen flex justify-center">
      <div class="max-w-5xl w-full h-24 flex justify-end items-end">
        <div class="bg-white flex px-2 mb-3 rounded-[2px] max-w-[260px] w-full justify-between items-center relative">
          <input
            ref="input"
            v-model="search"
            @focusin="onFocusedIn"
            @keydown.enter="onSearch"
            class="placeholder:text-gray-400 h-8 ml-2 outline-none text-xs"
            placeholder="소환사명,챔피언..."
          />
          <IconGG class="w-10 cursor-pointer h-3" @click="onSearch" />

          <div
            ref="popup"
            v-if="isFocused || isTyping"
            class="absolute w-[240px] min-h-[140px] bg-white top-9 right-0 rounded-[2px] shadow-lg"
          >
            <template v-if="isTyping && filteredSearchHisory.length > 0">
              <div
                :key="i"
                v-for="(v, i) in filteredSearchHisory"
                class="hover:bg-blue-100 p-3 flex"
                @click="onClickSearch(v.summoner.name)"
              >
                <div class="w-8 overflow-hidden rounded-full">
                  <!-- {{ v.summoner.profileImageUrl }} -->
                  <img :src="v.summoner.profileImageUrl" class="w-full h-full" />
                </div>
                <div class="flex flex-col ml-2">
                  <div class="text-[12px] text-goodRatio">{{ v.summoner.name }}</div>
                  <div class="text-[12px] text-gray-450">{{ getLeagueString(v.summoner.leagues) }}</div>
                </div>
              </div>
            </template>
            <template v-else-if="searchFilters.length > 0">
              <div class="flex">
                <div
                  :key="filter"
                  v-for="filter in searchFilters"
                  class="flex-1 flex justify-center items-center text-[13px] py-2 cursor-pointer"
                  @click="isSelectedSearch = filter"
                  :class="isSelectedSearch === filter ? 'bg-white' : 'bg-bg'"
                >
                  {{ filter }}
                </div>
              </div>
              <div :key="i" v-for="(v, i) in filteredHistory" class="mx-2 flex items-center">
                <div class="flex-1 cursor-pointer" @click="onClickSearch(v.summoner.name)">
                  <div class="text-xs text-gray-400 m-2">{{ v.summoner.name }}</div>
                </div>
                <div class="w-4 cursor-pointer" @click="onClickFavorite(v)">
                  <IconStar class="fill-current" :class="v.isFavorite ? 'text-blue-500' : 'text-gray-200'" />
                </div>
                <div class="w-4 mx-2 cursor-pointer" @click="onClickRemove(v)">
                  <IconClose class="fill-current text-gray-200" />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconGG from '../icons/IconGG.vue'
import IconStar from '../icons/IconStar.vue'
import IconClose from '../icons/IconClose.vue'
export default {
  components: { IconGG, IconStar, IconClose },
  data() {
    return {
      search: null,
      isFocused: false,
      history: [],
      searchFilters: ['최근검색', '즐겨찾기'],
      isSelectedSearch: '최근검색',
    }
  },
  watch: {
    search() {
      this.isFocused = false

      const history = window.localStorage.getItem('history')
      if (history) {
        const parsed = JSON.parse(history)
        this.history = Array.isArray(parsed) ? parsed : []
      }
    },
  },
  computed: {
    filteredSearchHisory() {
      return this.history.filter(v => {
        console.log(v)
        return new RegExp(this.search).test(v.summoner.name)
      })
    },
    filteredHistory() {
      if (this.isSelectedSearch === '최근검색') {
        return this.history
      } else if (this.isSelectedSearch === '즐겨찾기') {
        return this.history.filter(v => v.isFavorite)
      }

      return []
    },
    isTyping() {
      return !!this.search
    },
  },
  mounted() {
    window.addEventListener('click', this.onExternalClick)
  },
  beforeUnmount() {
    window.removeEventListener('click', this.onExternalClick)
  },
  methods: {
    getLeagueString(leagues) {
      const league = leagues[0]
      if (!league) {
        return null
      }

      return `${league.tierRank.tier} - ${league.tierRank.lp}`
    },
    onFocusedIn() {
      this.history = JSON.parse(window.localStorage.getItem('history'))
      console.log(this.history)
      this.isFocused = true
    },
    onExternalClick(e) {
      if (!this.$refs.popup) {
        return
      }

      const { x, y, width, height } = this.$refs.popup.getBoundingClientRect()
      if ((e.clientX >= x && e.clientX <= x + width && e.clientY >= y && e.clientY <= y + height) || this.$refs.input === e.target) {
      } else {
        this.isFocused = false
      }
    },
    onClickSearch(v) {
      this.isFocused = false
      this.search = null
      this.$emit('summoner', v)
    },
    onClickFavorite(v) {
      v.isFavorite = true
      window.localStorage.setItem('history', JSON.stringify(this.history))
    },
    onClickRemove(v) {
      this.history = this.history.filter(_v => _v !== v)
      window.localStorage.setItem('history', JSON.stringify(this.history))
    },
    onSearch() {
      this.$emit('summoner', this.search)
      this.search = null
    },
  },
}
</script>
