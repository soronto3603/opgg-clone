<template>
  <div>
    <div class="flex border-l border-t border-r border-gray-350">
      <div
        :key="i"
        v-for="(item, i) in items"
        class="w-full border-gray-350 flex justify-center items-center text-style-position py-4 cursor-pointer"
        @click="onClick(i)"
        :class="[i !== 0 ? 'border-l' : '', i === selectedIndex ? 'bg-gray-150' : 'bg-gray-50 border-b']"
      >
        {{ item }}
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    items: [],
  },
  data() {
    return {
      selectedIndex: 0,
    }
  },
  methods: {
    onClick(i) {
      this.selectedIndex = i
      this.$emit('change', this.items[i])
    },
  },
}
</script>
