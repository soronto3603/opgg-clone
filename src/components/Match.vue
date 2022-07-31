<!-- { "mmr": 2712, "champion": { "imageUrl": "https://opgg-static.akamaized.net/images/lol/champion/Jayce.png", "level": 12 }, "spells": [ { "imageUrl": "https://opgg-static.akamaized.net/images/lol/spell/SummonerTeleport.png" }, { "imageUrl": "https://opgg-static.akamaized.net/images/lol/spell/SummonerFlash.png" } ], "items": [ { "imageUrl": "https://opgg-static.akamaized.net/images/lol/item/1026.png" }, { "imageUrl": "https://opgg-static.akamaized.net/images/lol/item/3364.png" } ], "needRenew": false, "gameId": "359744643", "createDate": 1659224891, "gameLength": 686, "gameType": "자유 5:5 랭크", "summonerId": "77390534", "summonerName": "soronto3603", "tierRankShort": "C1", "stats": { "general": { "kill": 5, "death": 7, "assist": 4, "kdaString": "1.29:1", "cs": 171, "csPerMin": 7.5, "contributionForKillRate": "37%", "goldEarned": 3258, "totalDamageDealtToChampions": 2885, "largestMultiKillString": "", "opScoreBadge": "ACE" }, "ward": { "sightWardsBought": 0, "visionWardsBought": 2 } }, "mapInfo": null, "peak": [ "https://opgg-static.akamaized.net/images/lol/perk/8229.png", "https://opgg-static.akamaized.net/images/lol/perkStyle/8300.png" ], "isWin": false } -->

<template>
  <div class="flex" :class="match.isWin ? 'bg-blue-300 border-blue-350' : 'bg-red-300 border-red-350'">
    <div class="flex flex-col items-center justify-center flex-[0_0_76px] pl-4 py-3">
      <p class="text-[11px] text-gray-450 font-bold">{{ match.gameType }}</p>
      <p class="text-[11px] text-gray-450">하루전</p>
      <p v-if="match.isWin" class="text-[11px] text-blue-700 font-bold mt-1">승리</p>
      <p v-else class="text-[11px] text-red-700 font-bold mt-1">패배</p>
      <p class="text-[11px] text-gray-450">{{ gameLengthString }}</p>
    </div>

    <div class="ml-3 flex flex-col justify-center py-3">
      <div class="flex">
        <div class="w-11 rounded-full overflow-hidden">
          <img :src="match.champion.imageUrl" />
        </div>
        <div class="gap-[2px] flex flex-col ml-[6px]">
          <div :key="i" v-for="(spell, i) in match.spells" class="w-[22px]">
            <img :src="spell.imageUrl" />
          </div>
        </div>
        <div class="gap-[2px] flex flex-col ml-1">
          <div :key="i" v-for="(p, i) in match.peak" class="w-[22px]">
            <img :src="p" />
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center text-[11px] text-gray-450 my-2">레오나</div>
    </div>

    <div class="flex flex-col justify-center items-center mx-4 -mt-2 flex-[0_0_95px] py-3">
      <p class="relative top-1">
        <span class="text-gray-440 text-[15px] font-helveticaBold">2 / </span
        ><span class="text-red-700 text-[15px] font-helveticaBold">1</span
        ><span class="text-gray-440 text-[15px] font-helveticaBold"> / 1</span>
      </p>
      <p>
        <span class="text-gray-500 text-[11px] font-helveticaBold">1.50:1</span>
        <span class="text-gray-440 text-[11px] font-helveticaBold">평점</span>
      </p>
      <div
        class="flex gap-1 mt-1"
        v-if="match && (match.stats.general.largestMultiKillString !== '' || match.stats.general.opScoreBadge !== '')"
      >
        <span
          v-if="match.stats.general.largestMultiKillString !== ''"
          class="rounded-[9px] bg-red-400 border text-white text-[10px] border-red-450 px-[5px] pt-[3px] pb-[2px]"
          >{{ match.stats.general.largestMultiKillString }}</span
        >
        <span
          v-if="match.stats.general.opScoreBadge !== ''"
          class="rounded-[9px] bg-purple-400 border text-white text-[10px] border-purple-450 px-[5px] pt-[3px] pb-[2px]"
          >{{ match.stats.general.opScoreBadge }}</span
        >
      </div>
    </div>

    <div class="flex flex-col justify-start items-center mr-6 py-3">
      <p class="text-[11px] text-gray-440">레벨 8</p>
      <p class="text-[11px] text-gray-440">20 (1.3) CS</p>
      <p class="text-[11px] text-red-700">킬관여 38%</p>
    </div>

    <div class="flex flex-col items-center justify-center mr-4 py-3">
      <div class="grid grid-cols-4 gap-[2px]">
        <Item
          :key="i"
          :imageUrl="item.imageUrl"
          v-for="(item, i) in [
            ...match.items,
            ...new Array(8 - match.items.length - 1).fill({
              imageUrl: null,
            }),
            {
              imageUrl: 'https://s-lol-web.op.gg/static/images/icon/common/icon-buildred-p.png',
            },
          ]"
          class="w-[22px] rounded-[2px]"
          :class="item.imageUrl === null ? (match.isWin ? 'bg-blue-460' : 'bg-red-460') : ''"
        />
      </div>
      <div class="flex items-center justify-center gap-[6px]">
        <div class="w-4 h-4">
          <img src="https://s-lol-web.op.gg/static/images/icon/common/icon-ward-red.png" />
        </div>
        <div class="text-[11px] relative top-[1px] my-2">
          <span>제어와드 {{ this.match.stats.ward.visionWardsBought }}</span>
        </div>
      </div>
    </div>
    <div
      :key="i"
      v-for="(team, i) in teams"
      class="cursor-pointer flex flex-col gap-[2px] py-1 justify-between"
      :class="i !== 0 ? 'ml-4' : ''"
    >
      <div :key="`player_${i}`" v-for="(player, i) in team.players" class="flex" @click="$emit('summoner', player.summonerName)">
        <div class="w-4 h-4">
          <img :src="player.champion.imageUrl" />
        </div>
        <div class="text-[11px] text-gray-450 ml-1 w-16 text-ellipsis overflow-hidden whitespace-nowrap">
          {{ player.summonerName }}
        </div>
      </div>
    </div>
    <div class="flex justify-end flex-auto">
      <div
        class="flex-[0_0_30px] border ml-4 flex justify-center items-end py-3"
        :class="match.isWin ? 'bg-blue-440 border-blue-490' : 'bg-red-440 border-red-500'"
      >
        <div v-if="match.isWin">
          <img src="https://s-lol-web.op.gg/static/images/icon/common/icon-viewdetail-blue.png" />
        </div>
        <div v-else>
          <img src="https://s-lol-web.op.gg/static/images/icon/common/icon-viewdetail-red.png" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Item from './Item.vue'
export default {
  props: {
    match: null,
    teams: [],
  },
  computed: {
    gameLengthString() {
      return this.match ? `${Math.round(this.match.gameLength / 60)}분 ${this.match.gameLength % 60}초` : null
    },
  },
  methods: {},
  components: { Item },
}
</script>
