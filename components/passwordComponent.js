Vue.component('passwordComponent', {
  template:`
    <div>
      <h2 style="margin-top:10px;font-weight:bold;">修改密碼 以確保帳戶安全</h2>
      <div class="custom-input hor">
        <ul>
          <li>
            <h3>新密碼</h3>
            <input type="text" />
          </li>
          <li>
            <h3>確認密碼</h3>
            <input type="text" />
            
          </li>
        </ul>
        <ul class="btns grid2">
          <li>
            <button class="btn-box blue">儲存</button>
          </li>
          <li>
            <button class="btn-box red">清除</button>
          </li>
        </ul>
      </div>
    </div>
  `
})