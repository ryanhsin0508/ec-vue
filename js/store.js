var filters = {

}

var store = new Vuex.Store({
	strict:true,
	state:{
		search: "",
		searchBy: 'name',
		list:[]
	},
	getters: {
		filteredList(state, getters){
			console.log(state.list)
			let filtered = state.list
			if(state.search){
				filtered = state.list.filter(
					item => item[state.searchBy].toLowerCase().indexOf(state.search.toLowerCase()) > -1
				)
			}
			return filtered;
		}
	},
	mutations:{
		searchList(state, val){
			state.search = val;
		},
		init(state, type){
			let list;
			console.log(type)
			$.ajax({
				url:'/ec-vue/json/data.json',
				async:false,
				success:(data)=>{
					list = data
					console.log(data)
				}
			})
			state.list = list[type]['list']
			
		}
	}
})