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

  props: {
    address: {
      type: String,
      required: true,
    },
  },

  components: {
    TokenRow,
  },

  data: () => ({
    tokens: [],
  }),

  created() {
    axios.get(
      `https://api.ethplorer.io/getAddressInfo/${this.address}?apiKey=${process.env.VUE_APP_ETHPLORER_API}`,
    )
      .then(({ data }) => {
        this.tokens = data.tokens;
      });
  },
};
</script>
