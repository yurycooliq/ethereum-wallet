<template>
  <div id="app" class="pa-4 min-h-full bg-blue-800 flex justify-center font-body">
    <div v-show="isEnabled" class="w-full max-w-500px">
      <EthereumBalance />
      <TokensTable />
    </div>
    <div v-show="!isEnabled" class="w-full max-w-500px flex flex-col items-center justify-center">
      <ConnectMetamask />
    </div>
  </div>
</template>

<script>
import EthereumBalance from '@/components/EthereumBalance.vue';
import TokensTable from '@/components/TokensTable.vue';
import ConnectMetamask from '@/components/ConnectMetamask.vue';

export default {
  components: {
    EthereumBalance,
    TokensTable,
    ConnectMetamask,
  },

  computed: {
    address() {
      return this.$store.getters.address;
    },
    isEnabled() {
      return this.address !== '';
    },
  },
};
</script>
