<template>
  <div class="dice-calc container">
    <div class="row">
      <div class="col-xs-12">
        <h1>Warcaster Dice Odds Calc</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <h2> {{ calcOdds }}% chance to hit</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <h2>Defender</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-2">
        Defense (white)
      </div>
      <div class="col-3">
        <DiceNumber :initial="3" :max-value="7" v-on:update:value="defenseWhite = $event"></DiceNumber>
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        Defense (red)
      </div>
      <div class="col-3">
        <DiceNumber :initial="0" :max-value="4" v-on:update:value="defenseRed = $event"></DiceNumber>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <h2>Attacker</h2>
      </div>
    </div>


    <div class="row">
      <div class="col-2">
        MAT/RAT (white)
      </div>
      <div class="col-3">
        <DiceNumber :initial="3" :max-value="7" v-on:update:value="attackWhite = $event"></DiceNumber>
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        Charge (red)
      </div>
      <div class="col-3">
        <DiceNumber :initial="0" :max-value="4" v-on:update:value="attackRed = $event"></DiceNumber>
      </div>
    </div>

  </div>
</template>

<script>
  import DiceNumber from './DiceNumber';
  import lookup from '../lookup';

  export default {
    name: 'DiceCalc',
    props: {},
    components: {
      DiceNumber
    },
    data: function() {
      return {
        defenseWhite: 3,
        defenseRed: 0,
        attackWhite: 3,
        attackRed: 0,
      }
    },
    methods: {},
    computed: {
      calcOdds() {
        // This is super dirty, need to think of better maths to do this
        const defenseDice = this.defenseWhite + this.defenseRed;
        const attackDice = this.attackWhite + this.attackRed;
        const maxStrikesPossible = 1 + (2 * Math.max(defenseDice, attackDice));

        const defenseProb = lookup[this.defenseWhite][this.defenseRed];
        console.log('defense prob', defenseProb);

        const attackProb = lookup[this.attackWhite][this.attackRed];
        console.log('attack prob', attackProb);

        let result = 0.0;
        for (let i = 0; i < maxStrikesPossible; i++) {
          let defenseOddsToTieOrBeat = 0;
          for (let d = i; d < Math.min(maxStrikesPossible, defenseProb.length); d++) {
            defenseOddsToTieOrBeat += defenseProb[d];
          }
          if (i < attackProb.length) {
            result += (attackProb[i] * (1 - defenseOddsToTieOrBeat));
          }

        }

        result = result * 100;
        result = result.toFixed(2);
        return result;
      }
    }
  }
</script>

<style scoped>
  .dice-calc {
    background-color: #159eff;
    padding: 30px;
  }

  .row {
    padding-top: 10px;
  }
</style>
