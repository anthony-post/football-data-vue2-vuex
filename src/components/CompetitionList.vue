<template>
  <div class="container">
    <!-- <h1>{{ msg }}</h1> -->
    <h1>List of all available football competitions</h1>
    <div>
      <p>Choose a year
        <select v-model="search" name="#" id="#">
          <option value="">All years</option>
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
          <option value="2018">2018</option>
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
        </select>
      </p>
    </div>
    <div class="list__title">
      <p class="list__item item__title">Competition name</p>
      <p class="list__item item__title">Country</p>
      <p class="list__item item__title">Start date</p>
    </div>
    <!-- <div class="list" v-for="(item, index) in COMPETITIONLIST" :key="index">
            <div class="list__item">
                <p>{{ competition.name }}</p>
            </div>
    </div> -->
    <div class="list"
        v-for="competition in filteredList" 
        :key="competition.id">
        <div class="list__item">
          <p>{{ competition.name }}</p>
        </div>
        <div class="list__item">
          <!-- <p>{{ competition.area.countryCode }}</p> -->
          <p>{{ competition.area.name }}</p>
        </div>
        <div class="list__item">
          <p v-if="competition.currentSeason && competition.currentSeason.startDate">{{ competition.currentSeason.startDate }}</p>
          <!-- <p v-if="competition.currentSeason && competition.currentSeason.endDate">{{ competition.currentSeason.endDate }}</p> -->
        </div>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'CompetitionList',
//   props: {
//     msg: String
//   },
  data() {
    return {
      search: null,
    }
  },
  computed: {
    ...mapGetters([
      'COMPETITIONLIST'
    ]),
    filteredList() {
      var result = [];
      var length = this.COMPETITIONLIST.length;

      if(!this.search) {
        return this.COMPETITIONLIST ;
      } else {
        for(var i = 0; i < length; i++) {
          if(this.COMPETITIONLIST[i].currentSeason && 
            this.COMPETITIONLIST[i].currentSeason.startDate && 
            this.COMPETITIONLIST[i].currentSeason.startDate.indexOf(this.search) != -1) {
            result.push(this.COMPETITIONLIST[i]);
          }
        }
        return result;
      }
    },
  },
  methods: {
    ...mapActions([
      'GET_COMPETITIONLIST_FROM_API'
    ]),
  },
  mounted() {
    this.GET_COMPETITIONLIST_FROM_API()
    .then((response) => {
      if (response.data) {
        console.log(response.data);
      } 
    })
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.list__title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  border-bottom: 1px solid black;
}

.item__title {
  font-size: 20px;
}

.list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1 1 auto;

  /* border-bottom: 1px solid black; */
}

.list__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  flex: 1 1 30%;
}

</style>
