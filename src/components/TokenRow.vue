<template>
  <div>
    <div
      class="flex
          flex-column
          items-center
          justify-between
          rounded
          shadow-md
          bg-white
          mx-4
          py-2
          px-4"
      :class="{
        'hidden': name === 'Unnamed Token',
        'mb-6': !isSendButtonActive,
        'mb-3': isSendButtonActive,
      }"
    >
      <figure v-if="info.image" class="flex items-center w-12 h-12 mr-4">
        <img :src="'https://ethplorer.io' + info.image" :alt="name">
      </figure>
      <div class="flex-1">
        <p class="text-lg">
          {{ name }}
          <span
            v-if="symbol"
            class="font-bold"
            v-text="'(' + symbol + ')'"
          />
        </p>
        <p class="text-sm opacity-75">
          Balance: <span class="font-mono" v-text="balance"/>
          <span v-if="info.price" class="ml-2" v-text="price"/>
        </p>
      </div>
      <div class="font-bold">
        <button class="px-2 py-1 rounded"
                :class="{'bg-gray-200': isSendButtonActive}"
                @click="isSendButtonActive = !isSendButtonActive"
        >
          📮 Send
        </button>
      </div>
    </div>
    <transition name="fade">
      <SendToken v-if="isSendButtonActive" :token="token" />
    </transition>
  </div>
</template>

<script>
import { toFixed } from '@/helpers/num';
import SendToken from '@/components/SendToken.vue';

export default {
  name: 'TokenRow',

  props: {
    token: {
      type: Object,
      required: true,
    },
  },

  components: {
    SendToken,
  },

  data: () => ({
    isSendButtonActive: false,
  }),

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

    balance() {
      return this.token.balance / (10 ** this.info.decimals || 1);
    },

    price() {
      if (!this.info.price) {
        return false;
      }
      return `($${toFixed(this.balance * this.info.price.rate)})`;
    },
  },
};
</script>

<style lang="sass">
  button
    outline: none !important

  .fade-enter-active, .fade-leave-active
    transition: opacity .2s
  .fade-enter, .fade-leave-to
    opacity: 0
</style>
