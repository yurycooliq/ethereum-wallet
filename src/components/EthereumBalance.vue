<template>
    <div class="bg-white rounded shadow-xl text-center my-12 px-8 py-4">
      <p class="mb-2 text-2xl">Your ETH balance is:</p>
      <p class="mb-0 font-mono text-3xl">
        <span v-text="balance[0]" />
        <small class="opacity-50" v-text="'.' + balance[1]" />
      </p>
      <p class="mb-0 text-xs opacity-50" v-text="'Address: ' + address" />
    </div>
</template>

<script>
import Web3 from 'web3';

export default {
  name: 'EthereumBalance',

  props: {
    address: {
      type: String,
      default: '0x',
    },
  },

  data: () => ({
    ether: 0,
    balance: [0, 0],
  }),

  created() {
    const web3 = new Web3(process.env.VUE_APP_WEB3_PROVIDER);

    web3.eth.getBalance(this.address)
      .then((wei) => {
        this.ether = web3.utils.fromWei(wei, 'ether');
        this.balance = this.ether.split('.');
      });
  },
};
</script>
