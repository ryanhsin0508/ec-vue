var titleName = {
	MA001: "客戶代號",
	MA002: "客戶名",
	MB002: "品名",
  p_number: "品號",
	MONTH: "月份",
	date: "日期",
	number: "單據編號",
	amount: "金額",
	invoice: "發票號碼",
	count: "數量",
	gift: "贈品量"
};

//required
var sortLists = {
  customers: {
  	MA002: "客戶名",
  	time: "最後交易時間"
  },
  orders:{
    product: "產品"
  },
  receivable:{
  	MA002: "客戶名",
  	amount: "金額",
  	time: "日期"
  },
  statement:{
  	MA002: "客戶名",
  	MA001: "客戶代號"

  },
  posting:{
  	MA002: "客戶名稱",
  	MA001: "客戶代號"
  },
  loaning:{
    MA002: "客戶名稱",
    MA001: "客戶代號"
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
    dateRange:[],
    list: [],
    titleName: titleName,
    overlayMask: false,
    overlayVisible: false,
    overlayData: {},
    overlayType: ""
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
    dateRange(state, arr){
    	state.dateRange = arr
    },
    memorizeSort() {

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
    closeOverlay(state) {
      state.overlayVisible = false;
    }
  }
})