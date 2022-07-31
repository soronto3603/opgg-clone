<template>
  <div @mouseenter="onMouseEnter" @mouseout="onMouseOut" class="relative">
    <div v-if="isHovered" class="absolute p-3 -top-[86px] -left-[134px] bg-gray-600 text-white text-[11px] w-[268px] h-[74px]">
      평점은 0~10점을 기준으로 경기에 기여한 정도에 따라 차등 부여되며 탈주 등 패배에 결정적인 영향을 끼친 경우 0점에 가까운 점수가
      부여됩니다.

      <svg
        class="absolute rotate-180 left-[134px] fill-current text-gray-600 scale-x-150"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M24 22h-24l12-20z" />
      </svg>
    </div>
    <img :src="imageUrl" />
  </div>
</template>
<script>
export default {
  props: {
    imageUrl: null,
  },

  data() {
    return {
      isHovered: false,
    }
  },

  methods: {
    onMouseEnter(e) {
      this.isHovered = true
    },
    onMouseOut(e) {
      this.isHovered = false
    },
  },
}
</script>
