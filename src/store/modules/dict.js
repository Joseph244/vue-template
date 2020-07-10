import { equDict } from '@/api/standingBook.js';
const dict = {
    state: {
        searchEquDict: {
            departmentList: [],
            stationList: [],
            bayUnitList: [],
            voltageGradeList: [],
            equTypeList: [],
            companyList: [],
            equList: []
        },
        jfTypes: [
            {
                label: '高频',
                value: 1
            },
            {
                label: '特高频',
                value: 2
            },
            {
                label: '超声波',
                value: 3
            },
            {
                label: '空气超声波',
                value: 4
            },
            {
                label: '暂态地电压',
                value: 5
            }
        ]
    },
    mutations: {
        SET_SEARCHEQUDIST(state, data) {
            state.searchEquDict = data;
        }
    },
    actions: {
        async equDict({ commit }) {
            const data = await equDict();
            commit('SET_SEARCHEQUDIST', data);
        }
    }
};
export default dict;
