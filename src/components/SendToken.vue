<template>
  <div class="mb-6 mx-4 py-2 px-4 bg-white rounded">
    <p v-text="`Send ${token.tokenInfo.name}:`" class="font-bold" />
    <div class="flex my-1">
      <label for="address" class="mr-2">Address</label>
      <input id="address" class="flex-1 border rounded px-2" v-model="address" placeholder="0x...">
    </div>
    <div class="flex my-1">
      <label for="amount" class="mr-2">Amount</label>
      <input id="amount" class="flex-1 border rounded px-2" v-model="amount" placeholder="0">
    </div>
    <div class="text-right mt-2">
      <button class="px-2 py-1 rounded bg-blue-400" v-text="'Confirm'" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SendToken',

  props: {
    token: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    address: '',
    amount: 0,
  }),
};
</script>
