Vue.component('overlayComponent', {
  props: ['overlayData'],
  template: `
    <transition name="fade">
      <div class="overlay-mask">
        <div class="overlay-wrapper">
          <order-component v-if="$store.state.overlayType == 'order'" :overlay-data="overlayData"></order-component>
          <detail-component v-if="$store.state.overlayType == 'detail'" :overlay-data="overlayData"></detail-component>
        </div>
      </div>
    </transition>
    `,
  mounted() {
    console.log(this.$store.state.overlayType)
  }
})
Vue.component('orderComponent', {
  props: ['overlayData'],
  data() {
    return {
      orderData: {
        type: "",
        note1: "",
        note2: "",
        note3: "",
        products: [{
          selected: 0,
          count: 0,
          gift: 0,
          note: ""
        }]
      },
      typeList: [],
      productList: [],
      productTemplate: {
        selected: 0,
        count: 0,
        gift: 0,
        note: ""
      }
    }
  },
  template: `
    <div class="overlay-container">
    
      <header class="flex">
        <h3>「{{overlayData.MA002}}」訂購單</h3>
        <button class="btn-close" @click="$store.commit('closeOverlay')"></button>
      </header>
      <main class="content">
        <div class="dropdown-menu">
          <h3>最近下單日期</h3>
          <ul>
            <li></li>
          </ul>
        </div>
        <form action="">
          <div class="custom-input hor">
            <input type="date" style="width:100%;"/>
            <ul>
              <li class="custom-select">
                <h3>單據別</h3>
                <select v-model="orderData.type">
                  <option value="0" selected disabled hidden>選擇商品：</option>
                  <option v-for="(item, index) in typeList" :value="item">{{item}}</option>
                </select>
              </li>
              <li><h3>內部備註</h3><input type="text" v-model="orderData.note1"/></li>
              <li><h3>外部備註</h3><input type="text" v-model="orderData.note2"/></li>
              <li><h3>單據備註</h3><input type="text" v-model="orderData.note3"/></li>
            </ul>
          </div>
          <div class="custom-input hor sp" v-for="(item, index) in orderData.products">
            <ul>
              <li class="custom-select">
                <h3>商品名稱</h3>
                <select v-model="orderData.products[index].selected">
                  <option value="0" selected disabled hidden>選擇商品：</option>
                  <option v-for="(item, index) in productList" :value="item.MB002 + ' ' + item.MB003"><span class="name">{{item['MB002']}}</span> <span class="spec">{{item['MB003']}}</span></option>
                </select>
              </li>
              <li class="counter">
                <h3>數量</h3>
                <span class="btn-minus" @click="orderData.products[index].count > 0 ? orderData.products[index].count-- : orderData.products[index].count = 0">-</span>
                <input type="number" v-model="orderData.products[index].count"/>
                <span @click="orderData.products[index].count++">+</span>
              </li>
              <li class="counter">
                <h3>贈品量</h3>
                <span class="btn-minus" @click="orderData.products[index].gift > 0 ? orderData.products[index].gift-- : orderData.products[index].gift = 0">-</span>
                <input type="number" v-model="orderData.products[index].gift" />
                <span @click="orderData.products[index].gift++">+</span>
              </li>
              <li>
                <h3>商品備註</h3>
                <input type="text" v-model="orderData.products[index].note" />
              </li>
            </ul>
          </div>
          <button @click.prevent="addProduct" class="btn-box rounded"><span>+</span> 加入產品</button>
        </form>
      </main>
      <footer>
        <ul class="grid2 btns">
          <li>
            <button class="btn-box close" @click="$store.commit('closeOverlay')">關閉</button>
          </li>
          <li>
            <button class="btn-box confirm">確認下單</button>
          </li>
        </ul>
      </footer>
    
    
    </div>
  `,
  methods: {
    addProduct() {
      this.orderData.products.push(this.productTemplate);
    }
  },
  beforeMount() {
    $.ajax({
      url: '/ec-vue/json/newOrder.json',
      async: false,
      success: (data) => {
        this.productList = data.data;
        this.typeList = data.type;
      }
    })
  }
})
Vue.component('detailComponent', {
  props: ['overlayData'],
  data(){
    return{
      orders:[]
    }
  },
  template: `
  <div class="overlay-container">
    <header class="flex">
      <h3>「{{overlayData.MA002}}」明細</h3>
      <button class="btn-close" @click="$store.commit('closeOverlay')"></button>
    </header>
    <main class="content">
      <filter-component type="customers"></filter-component>
      <ul class="list-st1">
        <li class="active" v-for="item in orders">
          <div class="info">{{item.product}}</div>
          <div class="list-extended" style="padding-bottom:calc(1em + 10px)">
            <p style="float:left">數量：{{item.count}}</p>
            <p>贈品：{{item.gift}}</p>
            <p>備註：{{item.note}}</p>
            <p class="date">{{item.date}}</p>
          </div>
        </li>
      </ul>
    </main>
  </div>
  `,
  computed: {
    filteredList() {

    }
  },
  beforeMount() {
    this.orders = getData().data;
  }
})