import {getList} from  "@/api/dept/notice";
const notice = {
    namespaced:true,
    state: {
        noticeList: [],
    },
    actions: {
        REFRESH_NOTICELIST:({state,commit})=>{
            getList().then(res=>{
                const noticeList = res.data.data.records
                commit('REFRESH',noticeList)
            })
        }
    },
    mutations: {
        REFRESH: (state, noticeList) => {
            state.noticeList = noticeList;
        },
    }
}
export default notice