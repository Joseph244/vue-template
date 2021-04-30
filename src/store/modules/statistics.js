import otherApi from '@/api/other';
const dict = {
    state: {
        totals: {
            sensorTypeTotal: 0,
            sensorTotal: 0,
            sensorOnlineTotal: 0,
            equTotal: 0
        }
    },
    mutations: {
        SET_Totals(state, val) {
            state.totals = val;
        },
        SET_equTotal(state, val) {
            state.totals.equTotal = val;
        },
        SET_sensorTypeTotal(state, val) {
            state.totals.sensorTypeTotal = val;
        },
        SET_sensorTotal(state, val) {
            state.totals.sensorTotal = val;
        },
        SET_sensorOnlineTotal(state, val) {
            state.totals.sensorOnlineTotal = val;
        }
    },
    actions: {
        async queryTotals({ commit }) {
            let totals = await otherApi.systemTotals();
            commit('SET_Totals', totals);
        }
    }
};
export default dict;
