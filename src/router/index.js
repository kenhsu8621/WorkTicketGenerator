import { createRouter, createWebHistory } from "vue-router"

let history = createWebHistory()
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
]

export default createRouter({ history, routes })