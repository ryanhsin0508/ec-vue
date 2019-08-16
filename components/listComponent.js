Vue.component('listComponent', {
  props: ['type', 'call', 'extended'],
  data() {
    return {
      callArr: this.call,
      extendedArr: this.extended
    }
  },
  template: `
    <section class="list">
      <ul class="list-st1">
        <li 
          v-for="(items, index) in filteredList" 
          :class="[type, {active:selected == index && (extended || type == 'customers')}]"
          @click="$store.commit('setNumber',{i:index,t:'selectedList'})">
          <div class="info flex between">
          <p v-for="v in callArr" :class="v">
            <template v-if="v == 'amount'">{{items[v] | dollarConvert}}</template>
            <template v-else>{{items[v]}}</template>
          </p>
          </div>
          <list-extended-component
            :type="type"
            :selected="selected"
            :extended="extendedArr"
            :data="items"
            v-if="selected == index && (extended || type == 'customers')"
          ></list-extended-component>
        </li>
      </ul>
    </section>
  `,
  filters:{
    dollarConvert(v){
      return v = '$' + parseInt(v).toLocaleString('en-US');
    }
  },
  computed: {
    selected() {
      return this.$store.state.selectedList
    },
    sortBy() {
      return this.$store.state.sortBy;
    },
    filteredList() {
      
      let sorted = [...this.$store.getters.filteredList];
      let sortList = this.$store.state.sortList;
      let reverse = this.$store.state.sortReverse;
      let sortBy = Object.keys(sortList)[this.$store.state.sortBy];
      sorted = sorted.sort((a, b) => {
        return a[sortBy] > b[sortBy] ? 1 : -1
      });
      this.updatePrimary(sortBy);
      if (reverse) {
        return sorted.reverse()
      }
      return sorted;
    }
  },
  methods: {
    updatePrimary(swapped) {
      let currentPrimary = this.call[0];
      let idx;
      if (swapped == 'date' || swapped == 'time') {
        return;
      }
      if (this.callArr.indexOf(swapped) >= 0) {
        idx = this.callArr.indexOf(swapped);
        this.callArr.splice(idx, 1, currentPrimary);
      } else {
        idx = this.extendedArr.indexOf(swapped);
        this.extendedArr.splice(idx, 1, currentPrimary);
      }
      this.callArr.splice(0, 1, swapped)
    }
  },
  created() {
    this.$store.commit('init', this.type);

  }
})

Vue.component('listExtendedComponent', {
  props: ['type', 'selected', 'data', 'extended'],
  data() {
    return {
      extendedArr: this.extended,
      startDate:"",
      endDate:""
    }
  },

  template: `
    <div class="list-extended" :class="{'no-style': type == 'customers'}" @click.stop>
      <template v-if="type == 'customers'">
        <ul class="btns square grid2 spacing10 between">
          <li>
            <button class="btn-order" @click.stop="$store.commit('showOverlay',{type:'order',data:data})">
              <span class="icon"><i class="fas fa-cart-plus"></i></span>下單
            </button>
          </li>
          <li>
            <button class="btn-detail"
              @click.stop="$store.commit('showOverlay',{type:'detail',data:data})">
              <span class="icon"><i class="fas fa-info-circle"></i></span>明細
            </button>
          </li>
        </ul>
      </template>
      <template v-else>
          <ul class="custom-input grid2 spacing10 between" v-if="type == 'statement'">
            <li>
              <date-component @updateDate="updateDate()"></date-component>
              <input type="date" v-model="startDate" />
            </li>
            <li>
              <input type="date" v-model="endDate" />
            </li>
          </ul>
        <ul class="items">
          <li v-for="(item, index) in filteredItems">
            <ul>
              <li v-for="(key, index) in extended" 
                :class="key" :style="[key=='count' ? {float:'left', marginRight:'10px'} : {}]"
              >
                <template v-if="key == 'MB002'">
                  {{item[key]}} {{item['MB003']}}
                </template>
                
                <template v-else>
                  <template v-if="key != 'date'">
                    {{$store.state.titleName[key]}}: 
                  </template>
                  <template v-if="key == 'amount'">
                    {{item[key] | dollarConvert}}
                  </template>
                  <template v-else>{{item[key]}}</template>
                </template>
              </li>
            </ul>
          </li>
        </ul>
        <template v-if="type == 'statement'">
          <ul class="total">
            <li>上期結欠：</li>
            <li>本期未收：</li>
            <li class="amount">總應收帳款：{{totalAmount}}</li>
          </ul>
        </template>
      </template>

    </div>
  `,
  filters:{
    dollarConvert(v){
      return v = '$' + parseInt(v).toLocaleString('en-US');
    }
  },
  computed:{
    totalAmount(){
      let amount = 0;
      this.filteredItems.forEach((v)=>{
        amount += parseInt(v.amount)
      });
      return amount;
    },
    dateRange(){
      return [this.startDate,this.endDate]
    },
    filteredItems(){
      let items = this.data.items;
      let startDate = this.dateRange[0] ? this.dateRange[0] : 0;
      let endDate = this.dateRange[1] ? this.dateRange[1] : 99999999;
      if(items){
        items = items.filter(m=>(m.date >= startDate && m.date <= endDate))
      }
      return items;
    }
  },
  methods:{
    
  },
  beforeMount() {
    
  }
})