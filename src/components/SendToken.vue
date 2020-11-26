<template>
  <div class="mb-6 mx-4 py-2 px-4 bg-white rounded">
    <p v-text="`Send ${info.name}:`" class="font-bold" />
    <div class="flex my-1">
      <label for="address" class="mr-2">Address</label>
      <input id="address"
             class="flex-1 border rounded px-2"
             v-model="addressTo"
             placeholder="0x..."
      >
    </div>
    <div class="flex my-1">
      <label for="amount" class="mr-2">Amount</label>
      <input id="amount"
             class="flex-1 border rounded px-2"
             v-model="amount"
             placeholder="0"
             @input="checkComma"
      >
    </div>
    <div class="mt-2 flex">
      <p class="flex-1 py-1" v-text="status !== '' ? 'Status: ' + status : ''"/>
      <a v-if="tx !== ''"
         :href="'https://etherscan.io/tx/' + tx"
         target="_blank"
         class="px-2 py-1 rounded mx-2"
         v-text="'View on Etherscan'"
      />
      <button :class="{'opacity-50': disabled}"
              class="px-4 py-1 rounded bg-yellow-500 hover:bg-yellow-300 disabled:opacity-50"
              v-text="'🚀 Confirm'"
              :disabled="disabled"
              @click="send"
      />
    </div>
  </div>
</template>

<script>
import { fixComma } from '@/helpers/num';
import abi from '../web3/erc20.json';

export default {
  name: 'SendToken',

  props: {
    token: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    addressTo: '',
    amount: '',
    tx: '',
    isSending: false,
    status: '',
  }),

  computed: {
    info() {
      return this.token.tokenInfo;
    },
    address() {
      return this.$store.getters.address;
    },
    disabled() {
      return this.addressTo === '' || this.amount === '' || this.isSending;
    },
  },

  methods: {
    async send() {
      // eslint-disable-next-line no-alert,no-restricted-globals
      if (confirm(`Are you sure want to send ${this.amount}${this.info.symbol} to ${this.addressTo} address?`)) {
        this.isSending = true;
        this.status = 'Pending';

        const token = this.info.address;
        const tokenContract = new window.web3.eth.Contract(abi, token);
        const value = Math.round(this.amount * (10 ** this.info.decimals));

        tokenContract.methods.transfer(this.addressTo, value)
          .send({ from: this.address })
          .on('transactionHash', (hash) => {
            this.tx = hash;
          })
          .on('confirmation', () => {
            this.status = 'Success';
            this.isSending = false;
          })
          .on('error', () => {
            this.status = 'Fail';
            this.isSending = false;
          });
      }
    },

    checkComma() {
      this.amount = fixComma(this.amount);
    },
  },
};
</script>
