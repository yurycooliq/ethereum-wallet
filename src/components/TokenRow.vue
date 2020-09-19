<template>
  <div class="flex flex-column items-center rounded shadow-md bg-white mb-6 mx-2 py-2 px-4">
    <figure v-if="info.image" class="flex items-center w-12 h-12 mr-4">
      <img :src="'https://ethplorer.io' + info.image" :alt="name">
    </figure>
    <div>
      <p class="text-lg">
        {{ name }}
        <span
          v-if="symbol"
          class="font-bold"
          v-text="'(' + symbol + ')'"
        />
      </p>
      <p class="text-sm opacity-75">
        Balance: <span class="font-mono" v-text="token.balance"/>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TokenRow',

  props: {
    token: {
      type: Object,
      required: true,
    },
  },

  computed: {
    info() {
      return this.token.tokenInfo;
    },

    name() {
      return this.info.name || 'Unnamed Token';
    },

    symbol() {
      return this.info.symbol || false;
    },
  },
};
</script>
