<template>
  <!-- <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <router-link class="nav-link" to="/FtvSystem" :class="{'active' : visiBility == 'pageOne'}"
          @click="visiBility = 'pageOne'">外場一</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/FtvSystemPage2" :class="{'active' : visiBility == 'pageTwo'}"
          @click="visiBility = 'pageTwo'">外場二</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/FtvSystemPage3" :class="{'active' : visiBility == 'pageThree'}"
          @click="visiBility = 'pageThree'">外場三</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/FtvSystemPage4" :class="{'active' : visiBility == 'pageFour'}"
          @click="visiBility = 'pageFour'">外場四</router-link>
      </li>
    </ul>
  </div> -->

  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <router-link class="nav-link" to="/taipei1" :class="{'active' : $route.path == '/taipei1'}">罷免一</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/taipei2" :class="{'active' : $route.path == '/taipei2'}">罷免二</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/taichung1" :class="{'active' : $route.path == '/taichung1'}">補選一</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/taichung2" :class="{'active' : $route.path == '/taichung2'}">補選二</router-link>
      </li>
    </ul>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "router",

    created() {

    }
  }

</script>
