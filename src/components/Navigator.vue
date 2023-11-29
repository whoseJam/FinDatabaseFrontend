<template>
  <div class="ui segment">
    <div class="ui pointing menu">
      <div class="item">
        <i class="dollar sign icon"></i>
      </div>
      <router-link
        v-for="item in navigatorList"
        :class="itemClasses(item.title)"
        :to="item.link">
        {{ item.title }}
      </router-link>
      <div v-if="user === null" class="right menu">
        <router-link :class="itemClasses('登录')" to="/login">登录</router-link>
        <router-link :class="itemClasses('注册')" to="/register">注册</router-link>
      </div>
      <div v-else class="right menu">
        <div class="ui simple dropdown link item">
          <span class="text">我的</span>
          <i class="dropdown icon"></i>
          <div class="ui menu">
            <router-link class="item" to="/myStock">自选</router-link>
            <router-link class="item" to="/simulate">模拟盘</router-link>
            <router-link class="item" to="/logout">注销</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

$(".ui.dropdown").dropdown({
  on:'hover' ,//鼠标悬浮显示，默认值是click
  transition:'swing right', //设置动画效果
  allowAdditions:true //允许添加新的菜单项
});

export default {
  data: function() {
    return {
      navigatorList: [
        { title: "主页", link: "/home" },
        { title: "新闻", link: "/news" },
        { title: "帮助", link: "/help" },
        { title: "关于", link: "/about" }
      ],
      user: null
    }
  },
  props: {
    activeItem: {
      default: ""
    }
  },
  mounted: function() {
    this.user = window.sessionStorage.getItem("user");
    console.log("user=", this.user);
    if (!this.user) this.user = null;
  },
  methods: {
    itemClasses: function(myItem) {
      return myItem === this.activeItem ?
        "ui active item" : "ui item";
    }
  }
}
</script>