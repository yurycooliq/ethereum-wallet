<template>
  <button
    class="rounded shadow-md bg-white px-4 py-2 mx-2 leading-8"
    @click="connectMetamask"
  >
    <img src="./../assets/images/metamask.svg"
         class="inline-block mr-2"
         width="24"
         height="24"
         alt="Metamask"
    >
    Connect Metamask
  </button>
</template>

<script>
import Web3 from 'web3';

export default {
  name: 'ConnectMetamask',

  methods: {
    async connectMetamask() {
      if (typeof window.ethereum !== 'undefined') {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.$store.commit('address', address);
      } else {
        console.error('MetaMask is not detected!');
      }
    },
  },
};
</script>
