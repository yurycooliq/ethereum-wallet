<template>
  <div>
    <div class="bg-white rounded-t-md shadow-xl text-center mt-12 mx-2 px-8 py-4">
      <p class="mb-2 text-2xl">Your ETH balance is:</p>
      <p v-if="!isLoading" class="mb-0 font-mono text-3xl">
        <span v-text="balance[0]" />
        <small class="opacity-50" v-text="'.' + (balance[1] || 0)" />
      </p>
      <p v-else class="mb-0 font-mono text-3xl" v-text="'Loading...'" />
      <p class="mb-0 text-xs opacity-50" v-text="'Address: ' + address" />
    </div>
    <div class="bg-white rounded-b-md shadow-xl mb-12 mx-2 px-6 py-3 border-t">
      <p v-text="`Send Ethereum:`" class="font-bold" />
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
        <button class="px-4 py-1 rounded bg-yellow-500 hover:bg-yellow-300"
                :class="{'opacity-50': disabled}"
                v-text="'🚀 Send ETH'"
                :disabled="disabled"
                @click="send"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { fixComma } from '@/helpers/num';

export default {
  name: 'EthereumBalance',

  data: () => ({
    ether: 0,
    isLoading: true,
    isSending: false,
    addressTo: '',
    amount: '',
    tx: '',
    status: '',
  }),

  watch: {
    address() {
      this.checkBalance();
    },
  },

  computed: {
    balance() {
      return this.ether.split('.');
    },
    address() {
      return this.$store.getters.address;
    },
    disabled() {
      return this.addressTo === '' || this.amount === '' || this.isSending;
    },
  },

  methods: {
    setDefaults() {
      this.ether = 0;
      this.isLoading = true;
      this.isSending = false;
      this.addressTo = '';
      this.amount = '';
      this.tx = '';
      this.status = '';
    },

    async checkBalance() {
      this.setDefaults();
      window.web3.eth.getBalance(this.address)
        .then((wei) => {
          this.ether = window.web3.utils.fromWei(wei, 'ether');
          this.isLoading = false;
        });
    },

    async send() {
      const wei = window.web3.utils.toWei(this.amount.toString(), 'ether');
      // eslint-disable-next-line no-alert,no-restricted-globals
      if (confirm(`Are you sure want to send ${this.amount}ETH to ${this.addressTo} address?`)) {
        this.isSending = true;
        this.status = 'Pending';
        window.web3.eth.sendTransaction({
          from: this.address,
          to: this.addressTo,
          value: wei,
        })
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
