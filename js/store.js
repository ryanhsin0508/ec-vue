/*var sortLists = {
  customers: [{
    title: "名稱",
    name: "MA002"
  }, {
    title: "最後更新時間",
    name: "time"
  }],
  accounting: [{
    title: "名稱",
    name: "MA002"
  }, {
    title: "金額",
    name: "amount"
  }, {
    title: "日期",
    name: "time"
  }],
  statement:[{
    title: "單據編號	",
    name: "number"
  },{
    title: "日期",
    name: "date"
  },  {
    title: "發票號碼	",
    name: "invoice"
  }, {
    title: "應收帳款	",
    name: "amount"
  }, {
    title: "品名",
    name: "MB002"
  }, {
    title: "客戶代號",
    name: "MA001"
  }]
};*/
var titleName = {
	MA001: "客戶代號",
	MA002: "客戶",
	MB002: "最後交易時間",
	MONTH: "月份",
	AMOUNT: "金額"
};
var sortLists = {
  customers: {
  	MA002: "名稱",
  	time: "最後交易時間"
  },
  receivable:{
  	MA002: "名稱",
  	amount: "金額",
  	time: "日期"
  },
  statement:{
  	number: "單據編號",
  	invoice: "發票號碼",
  	date: "日期",
  	number: "單據編號",
  	amount: "應收帳款	",
  	MB002: "品名",
  	MA001: "客戶代號"
  },
  posting:{
  	MA001: "客戶代號",
  	MA002: "客戶名稱",

  }
};



var localStore = {
  get: function(name) {
    return JSON.parse(window.localStorage.getItem(name))
  },
  set: function(name, val) {
    window.localStorage.setItem(name, JSON.stringify(val))

  }
}
var store = new Vuex.Store({
  strict: true,
  state: {
    search: "",
    searchBy: '',
    sortList: [{}],
    sortBy: 0,
    sortReverse:false,
    list: [],
    selectedList: undefined,
    overlayMask: false,
    overlayVisible: false,
    overlayData: {},
    overlayType: ""
  },
  getters: {
    filteredList(state, getters) {
      console.log(state.list)
      let filtered = state.list
      if (state.search) {
        filtered = state.list.filter(
          item => item[state.searchBy].toLowerCase().indexOf(state.search.toLowerCase()) > -1
        )
      }
      return filtered;
    },

  },
  mutations: {
    toggleOverlayMask(state) {
      state.overlayMask = state.overlayMask ? false : true;
    },
    searchBy(state, val) {
      state.searchBy = val;
    },
    searchList(state, val) {
      state.search = val;
    },
    memorizeSort() {

    },
    sortBy(state, payload) {
      state.sortBy = payload.val;
      state.sortReverse = payload.reverse
    },
    showOverlay(state, payload) {
      state.overlayData = payload.data
      state.overlayType = payload.type
      state.overlayVisible = true;
      switch (payload.type) {
        case 'order':
          console.log(state.overlayType)
          break;
        case 'customers':

      }
    },
    toggle(state, target){

    },
    setNumber(state, payload){
    	console.log(payload.t)
    	state[payload.t] = state[payload.t] == payload.i ? undefined : payload.i;
    },
    closeOverlay(state) {
      state.overlayVisible = false;
    },
    init(state, type) {
      let list;
      let sorted = []
      console.log(type)
      $.ajax({
        url: `/ec-vue/json/${type}.json`,
        async: false,
        success: (data) => {
          list = data
          console.log(data)
        }
      })
      state.list = list['data']
      state.sortList = sortLists[type];
    }
  }
})