<template>
  <div>
    <BattleNav />
    <h3 class="text-center">Secret Startup Battles</h3>
    <hr/>
    <div class="col-sm-4" 
      v-for="(battle, i) in privateBattles"
      :key="i"
    >
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"> {{ battle.name }} </h3>
        </div>
        <div class="panel-body">
          <p><span class="badge alert-info"> Sponsor: </span> {{ battle.sponsor }} </p>
          <p><span class="badge alert-danger"> SeedFund: </span><strong> ${{ battle.seedFund }} </strong></p>
        </div>
      </div>
    </div>
    
    <div class="col-sm-12">
      <div class="jumbotron text-center">
        <h2>View Public Startup Battles</h2>
        <router-link class="btn btn-lg btn-success" to="/"> Public Startup Battles </router-link>
      </div>
    </div>
  </div>
</template>

<script>

import BattleNav from '@/components/Battles/BattleNav'
import { isLoggedIn } from '@/utils/auth'
import { getPrivateStartupBattles } from '@/utils/battles-api'

export default {
  name: 'PrivateBattles',
  components: {
    BattleNav,
  },
  data() {
    return {
      privateBattles: '',
    }
  },
  methods: {
    isLoggedIn() {
      return isLoggedIn()
    },
    getPrivateStartupBattles() {
      getPrivateStartupBattles().then((battles) => {
        this.privateBattles = battles
      })
    },
  },
  mounted() {
    this.getPrivateStartupBattles()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
