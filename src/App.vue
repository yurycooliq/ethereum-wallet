<template>
  <div id="app" class="pa-4 min-h-full bg-blue-800 flex justify-center font-body">
    <div class="w-full max-w-500px">
      <EthereumBalance :address="address" />
      <TokensTable :address="address" />
    </div>
  </div>
</template>

<script>
import EthereumBalance from './components/EthereumBalance.vue';
import TokensTable from './components/TokensTable.vue';

export default {
  components: {
    EthereumBalance,
    TokensTable,
  },

  data: () => ({
    address: '0xA145ac099E3d2e9781C9c848249E2e6b256b030D',
  }),
};
</script>

<style lang="scss">
  html,
  body {
    height: 100%;
  }
</style>
