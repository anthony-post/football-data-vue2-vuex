import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        competitionList: []
    },
    mutations: {
        SET_COMPETITIONLIST_TO_STATE: (state, competitionList) => {
            state.competitionList = competitionList;
        }
    },
    actions: {
        GET_COMPETITIONLIST_FROM_API({commit}) {
            return axios('http://api.football-data.org/v2/competitions', {
                method: "GET"
            })
            .then((competitionList) => {
                commit('SET_COMPETITIONLIST_TO_STATE', competitionList.data.competitions);
                return competitionList;
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
        },
    },
    getters: {
        COMPETITIONLIST(state) {
            return state.competitionList;
        },
    }
});

export default store;