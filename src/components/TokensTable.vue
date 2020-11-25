<template>
  <div>
    <TokenRow
      v-for="(token, index) in tokens"
      :key="index"
      :token="token"
    />
  </div>
</template>

<script>
import axios from 'axios';
import TokenRow from './TokenRow.vue';

export default {
  name: 'TokensTable',

  components: {
    TokenRow,
  },

  data: () => ({
    tokens: [],
  }),

  watch: {
    address(address) {
      if (address !== '') {
        axios.get(
          `https://api.ethplorer.io/getAddressInfo/${this.address}?apiKey=${process.env.VUE_APP_ETHPLORER_API}`,
        )
          .then(({ data }) => {
            this.tokens = data.tokens;
          });
      }
    },
  },

  computed: {
    address() {
      return this.$store.getters.address;
    },
  },
};
</script>
