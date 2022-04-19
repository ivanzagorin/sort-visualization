<template>
  <v-container class="sorting-display d-flex justify-space-between align-end pb-0">
    <div
      v-for="item in sortingArray"
      :key="item.id"
      :style="`height: ${100 / maxNumber * item.value}%;width: calc(100% / ${sortingArray.length} - 5px);`"
      :class="['sorting-item', item.active ? 'active' : '']"
    >{{ item.value }}</div>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  beforeMount() {
    this.$store.commit('generateSortingArray');
  },

  computed : {
    ...mapGetters(['sortingArray']),
    maxNumber() {
      return Math.max(...this.sortingArray.map(el => el.value));
    }
  }
}
</script>

<style lang="scss" scoped>
.sorting-display{
  height: calc(100% - 140px);
  padding-top: 40px;
}
.sorting-item{
  background: #42A5F5;
  border-radius: 5px 5px 0 0;
  box-shadow: 0 0 10px 5px rgb(0 0 0 / 15%);
  padding: 2px 0 0 0;
  text-align: center;
  color: #fff;
  word-break: break-all;
  overflow: hidden;
  transition: 0.1s;
  &.active{
    background: #FFAB40;
  }
}
</style>