<template>
    <div>
      <p>You DAI balance is: {{ balance }}</p>
    </div>
</template>

<script>
import Web3 from 'web3';
import dai from '../web3/dai-abi';

export default {
  name: 'DaiBalance',

  props: {
    address: {
      type: String,
      default: '0x',
    },
  },

  data: () => ({
    balance: 0,
  }),

  created() {
    const web3 = new Web3(process.env.VUE_APP_WEB3_PROVIDER);
    const address = '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359';
    const contract = new web3.eth.Contract(dai, address);

    contract.methods.balanceOf(this.address)
      .call()
      .then((balance) => {
        this.balance = balance;
      });
  },
};
</script>
