<template>
  <div class="dice-number">
    <div class="input-group">
      <font-awesome-icon icon="minus-square" size="3x" v-on:click="currentValue -= 1"/>
      <input type="number"
             v-model="currentValue"
             class="form-control number-control" step="1" min="0" max="10"
      />
      <font-awesome-icon icon="plus-square" size="3x" v-on:click="currentValue += 1"/>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'DiceNumber',
    props: {
      initial: Number,
      maxValue: Number,
    },
    data: function() {
      return {
        currentValue: this.initial,
      }
    },
    methods: {},
    watch: {
      currentValue: function(newValue) {
        if (newValue > this.maxValue) {
          this.currentValue = this.maxValue;
        } else if (newValue < 0) {
          this.currentValue = 0;
        }
        this.$emit('update:value', this.currentValue);
      }
    }
  }
</script>

<style scoped>
  .dice-number {
    display: inline;
  }

  .number-control {
    max-width: 70px;
    margin-top: 4px;
    margin-left: 5px;
    margin-right: 5px;
  }

</style>
