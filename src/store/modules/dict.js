import equApi from '@/api/equ';
import otherApi from '@/api/other';
import { setLocalStorageItem, getLocalStorageItem } from '../../tools/storage';
const dict = {
    state: {
        stationInfo: getLocalStorageItem('STATION'),
        equTypeList: [],
        voltageList: [],
        bayUnitList: [],
        platformList: [
            {
                name: 'JSC平台'
            },
            {
                name: '南瑞平台'
            },
            {
                name: '华为平台'
            }
        ],
        majors: [
            {
                majorId: 1,
                majorName: '输电'
            },
            {
                majorId: 2,
                majorName: '变电'
            },
            {
                majorId: 3,
                majorName: '配电'
            }
        ],
        unitList: [],
        powerType: ['取电', '电池']
    },
    mutations: {
        SET_EquTypeList(state, val) {
            state.equTypeList = val;
        },
        SET_BayUnitList(state, val) {
            state.bayUnitList = val;
        },
        SET_VoltageList(state, val) {
            state.voltageList = val;
        },
        SET_UnitList(state, val) {
            state.unitList = val;
        },
        SET_StationInfo(state, val) {
            setLocalStorageItem('STATION', val);
            state.stationInfo = val;
        }
    },
    actions: {
        async queryEquTypeList({ commit }) {
            const data = await equApi.equTypeList();
            commit('SET_EquTypeList', data);
        },
        async queryBayUnitList({ commit }) {
            const data = await equApi.bayUnitList();
            commit('SET_BayUnitList', data);
        },
        async queryVoltageList({ commit }) {
            const data = await equApi.voltageList();
            commit('SET_VoltageList', data);
        },
        async queryUnitList({ commit }) {
            const data = await otherApi.unitGet();
            commit('SET_UnitList', data);
        }
    }
};
export default dict;
