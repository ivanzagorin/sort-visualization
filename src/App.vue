<template>
  <div id="app">
    <v-app>
      <v-main>
        <SortingHeader />
        <SortingDisplay />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import SortingHeader from '@/components/SortingHeader';
import SortingDisplay from '@/components/SortingDisplay';

export default {
  name: 'App',
  components: {
    SortingHeader, SortingDisplay
  }
}
</script>

<style lang="scss">
@import '@/assets/styles';
</style>
