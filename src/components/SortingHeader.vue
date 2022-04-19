<template>
  <header class="header">
    <v-container>
      <h1>Sort visualization</h1>
      <div class="buttons-list d-flex justify-space-between">
        <v-btn
          v-for="control of sortingControls"
          :key="control.id"
          @click="startSorting(control.id)"
          :loading="control.loading"
          :disabled="sortingStarted"
          :color="control.color"
        >{{ control.label }}</v-btn>
      </div>
    </v-container>
  </header>
</template>

<script>
import { bubbleSort, quickSort, mergeSort } from '@/features/sortings/index';

export default {
  data: () => {
    return {
      sortingStarted: false,
      sortingControls: [
        {
          id: 1,
          label: 'Bubble sort',
          color: 'primary',
          loading: false,
          method: bubbleSort
        },
        {
          id: 2,
          label: 'Quick sort',
          color: 'warning',
          loading: false,
          method: quickSort
        },
        {
          id: 3,
          label: 'Merge sort',
          color: 'success',
          loading: false,
          method: mergeSort
        }
      ]
    };
  },

  methods: {
    async startSorting (id) {
      const el = this.sortingControls.find(el => el.id === id);
      
      el.loading = true;
      this.sortingStarted = true;
      
      await el.method();

      el.loading = false;
      this.sortingStarted = false;
    }
  }
  
}
</script>

<style lang="scss" scoped>
.header{
  height: 140px;
}
h1{
  text-align: center;
}
.buttons-list{
  margin-top: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>