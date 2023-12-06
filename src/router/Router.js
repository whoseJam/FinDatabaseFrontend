import { createWebHashHistory } from "vue-router"
import { createRouter } from "vue-router"

import MainPage from "../views/MainPage.vue"
import News from "../views/News.vue"
import Help from "../views/Help.vue"
import About from "../views/About.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Stock from "../views/Stock.vue"
import MyStock from "../views/MyStock.vue"
import Simulate from "../views/Simulate.vue"
import SimulateBuy from "../views/SimulateBuy.vue"
import SimulateSell from "../views/SimulateSell.vue"
import SimulateRegret from "../views/SimulateRegret.vue"
import SimulateHold from "../views/SimulateHold.vue"
import SimulateQuery from "../views/SimulateQuery.vue"
import UserMain from "../views/UserMain.vue"
import Test from "../views/TestView.vue"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: MainPage
    },
    {
      path: "/home",
      component: MainPage
    },
    {
      path: "/news",
      component: News
    },
    {
      path: "/help",
      component: Help
    },
    {
      path: "/about",
      component: About
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/register",
      component: Register
    },
    {
      path: "/stock/:stockId",
      component: Stock
    },
    {
      path: "/myStock",
      component: MyStock
    },
    {
      path: "/simulate",
      component: Simulate
    },
    {
      path: "/simulateBuy",
      component: SimulateBuy
    },
    {
      path: "/simulateSell",
      component: SimulateSell
    },
    {
      path: "/simulateRegret",
      component: SimulateRegret
    },
    {
      path: "/simulateHold",
      component: SimulateHold
    },
    {
      path: "/simulateQuery",
      component: SimulateQuery
    },
    {
      path: "/userMain",
      component: UserMain
    },{
      path:'/test',
      component:Test
    }
  ]
})

export default router;