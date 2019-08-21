Vue.component('dateComponent', {
  data() {
    return {
      now: {
        y:null,
        m:null,
        d:null
      },
      selected: {
        y:2019,
        m:5,
        d:10
      },
      temp: {
        y:'',
        m:'',
        d:''
      },
      dropdownActive: false,
      yearActive:false,
      monthActive:false,
      dateActive:false,
      dateArr:[],
      monthArr:[]

    }
  },
  props:['date'],
  template: `
    <div class="custom-date">
      <h3 @click="showDropdown()">{{date}}</h3>
      <div class="opt" v-if="dropdownActive">
        <ul :class="['c-year', {active:yearActive}]">
          <li class="flex v-center between">
            <button class="btn-minus" @click.prevent="yearHandler('-1')"></button>
              {{temp.y}}
            <button class="btn-add" @click.prevent="yearHandler('+1')"></button>
          </li>
        </ul>
        <ul :class="['c-month', {active:monthActive}]">
          <li 
            v-for="(item, index) in monthArr" 
            v-if="item + 1 == temp.m || monthActive"
            :class="{active: item + 1 == temp.m}"
            @click.stop="monthHandler(item+1)"
          >
            {{item+1}}月
          </li>
        </ul>
        <ul class="c-date">
          <li 
            v-for="(item, index) in dateArr"
            :class="
            [
              {now: temp.y == now.y && temp.m == now.m && item == now.d}
            ]"
            @click="dateHandler(item)"
          >{{item}}日
          </li>
        </ul>
      </div>
    </div>
  `,
  methods:{
    yearHandler(n){
      console.log('faswuodifh')
      this.temp.y = eval(this.temp.y + n);
      this.calcDate();
    },
    monthHandler(m){
      this.monthActive = this.monthActive ? false : true;
      if(this.monthActive){
        return;
      }
      this.temp.m = m;
      this.calcDate();
    },
    dateHandler(d){
      this.dropdownActive = false;
      this.temp.d = d;
      this.selected.y = this.temp.y;
      this.selected.m = this.temp.m;
      this.selected.d = d;
    },
    calcDate(){
      this.dateArr = [];
      var y = this.temp.y
      var m = this.temp.m;
      var d = this.temp.d;
      var start = new Date(`${m}/1/${y}`);
      var end = m < 12 ? new Date(`${m+1}/1/${y}`) : new Date(`1/1/${y+1}`);
      console.log(end)
      var loop = new Date(start);
      
      while (loop <= end) {
        var loopMonth = loop.getMonth() < 12 ? loop.getMonth() + 1 : 1;
        console.log(loopMonth)
        if (loopMonth == m) {
          let y = loop.getFullYear();
          let m = loop.getMonth() < 11 ? loop.getMonth() + 1 : 1;
          let d = loop.getDate();
          m = m.toString.length<2 ? '0' + m : m;
          // d = d.toString().length<2 ? '0' + d : d;
          this.dateArr.push(d);
        }
        var newDate = loop.setDate(loop.getDate() + 1);
      }
    },
    showDropdown(){
      this.dropdownActive = this.dropdownActive ? false : true;
      if(!this.dropdownActive){
        return;
      }
      this.calcDate();
    }
  },
  beforeMount(){
    //init today
    var now = new Date();
    this.now.y = now.getFullYear()
    this.now.m = now.getMonth() < 11 ? now.getMonth() + 1 : 1;
    this.now.d = now.getDate();
    this.selected.y = parseInt(this.date.substr(0,4));
    this.selected.m = parseInt(this.date.substr(4,2));
    this.selected.d = parseInt(this.date.substr(6,2));
    this.temp.y = parseInt(this.date.substr(0,4));
    this.temp.m = parseInt(this.date.substr(4,2));
    this.temp.d = parseInt(this.date.substr(6,2));
    for(let i = 0; i < 12; i++){
      this.monthArr.push(i);
    }
  },
  computed:{
    selectedFullDate(){
      let y = this.selected.y;
      let m = this.selected.m;
      let d = this.selected.d;
      m = m.toString.length<2 ? '0' + m : m;
      d = d.toString().length<2 ? '0' + d : d;
      return '' + y + m + d
    }
  },
  updated(){
    
    this.$emit('update', this.selectedFullDate)
  }
})