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
          <img :src="photoUrl" alt="" style="width: 30px; height: 30px;">
          <span class="text">
            &ensp;&ensp;{{ user }}
          </span>
          <i class="dropdown icon"></i>
          <div class="ui menu">
            <router-link class="item" to="/userMain">用户主页</router-link>
            <router-link class="item" to="/myStock">自选</router-link>
            <router-link class="item" to="/simulate">模拟盘</router-link>
            <router-link class="item" to="/admin/0" v-if="isAdmin">管理操作</router-link>
            <router-link class="item" to="/" @click="logoff">注销</router-link>
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
        { title: "总览", link: "/fullView" },
        { title: "新闻", link: "/news" },
        { title: "帮助", link: "/help" },
        { title: "关于", link: "/about" }
      ],
      user: null,
      photoUrl: "",
      isAdmin: false
    }
  },
  props: {
    activeItem: {
      default: ""
    }
  },
  mounted: function() {
    this.user = window.sessionStorage.getItem("user");
    let id = window.sessionStorage.getItem("userId");
    this.photoUrl = window.sessionStorage.getItem("photo");
    this.isAdmin = (window.sessionStorage.getItem("isAdmin") == "true");
    console.log("user=", this.user);
    if (!this.user) this.user = null;
  },
  methods: {
    itemClasses: function(myItem) {
      return myItem === this.activeItem ?
        "ui active item" : "ui item";
    },
    logoff: function() {
      window.sessionStorage.removeItem("userId");
      window.sessionStorage.removeItem("user");
      alert("已成功退出登录！")
      this.$router.push({path: '/'});
      //location.reload();
    }
  }
}
</script>