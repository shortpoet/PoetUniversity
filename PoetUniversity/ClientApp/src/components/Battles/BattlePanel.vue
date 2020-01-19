<template>
    <div class="col-sm-4">
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
</template>

<script>

export default {
  name: 'BattlePanel',
  components: {
  },
  props: {
    battle: Object
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
