<template>
  <div>
    <BattlePanel
      v-for="(battle, i) in battles"
      :key="i"
      :battle="battle"
    />
  </div>
</template>

<script>
import BattlePanel from '@/components/Battles/BattlePanel'

export default {
  name: 'PublicBattles',
  components: {
    BattlePanel
  },
  props: {
    battles: Array
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
