Vue.component('filterComponent', {
  props:['type', 'keyword'],
  data(){
    return {
      search:"",
      sort: 0,
      sortList:sortLists[this.type],
      sortReverse:false,
      menuActive: false,
      startDate:"",
      endDate:""
    }
  },
  template:`
    <section class="search-box custom-input">
      <div class="flex search-input">
        <input 
          class="fg1" 
          style="margin-right: 10px;" 
          type="text" 
          v-model="search"
          @input="searchList($event)"
        />
        <button class="btn-search"><i class="fas fa-search"></i></button>
      </div>
      <div class="sort dropdown-menu">
        <h3 
          :class="sortReverse ? 'desc' : 'asc'"
          @click="menuActive = menuActive ? menuActive = false : menuActive = true"
        >
          {{sortList[Object.keys(sortList)[sort]]}}
        </h3>
        <ul :class="{active: menuActive}">
          <li
            v-for="(v, k, i) in sortList"
            @click="sortBy(i)"
          >
            {{v}}
          </li>
        </ul>
      </div>
    </section>
  `,
  computed:{
    searchBy(){
      let sortName = Object.keys(this.sortList)[this.sort];
      console.log(sortName)
      return sortName 
    },
    dateRange() {
        return [this.startDate.replace(/-/gi, ''),this.endDate.replace(/-/gi, '')]
    }
  },
  filters:{
    dateFormat(v){
      if(v){
        return v.replace('-','')
      }
    }
  },
  updated(){
    this.$store.commit('dateRange', this.dateRange)
  },
  watch:{
    startDate(){
      
    },
    endDate(){

    }
  },
  methods:{
    searchList(e){
      console.log(e.target.value)
      this.$parent.searchList(e.target.value)
      // this.$emit('searchList', e.target.value)
    },
    sortBy(i){
      console.log(i)
      // this.sortReverse = false;
      if(this.sort == i){
        this.sortReverse = !this.sortReverse ? true : false;
      } else {
        this.sortReverse = false;
      }
      this.$parent.sortBy = i;
      this.$parent.sortReverse = this.sortReverse;
      
      this.sort = i;
      this.menuActive = false;
      // this.$store.commit('sortBy', {val:this.sort,reverse:this.sortReverse})
    }
  }
})