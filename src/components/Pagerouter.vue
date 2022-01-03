<template>
  <div class="card-header">
    <ul class="nav nav-tabs card-header-tabs">
      <li class="nav-item">
        <router-link class="nav-link" to="/taipei1" :class="{'active' : visiBility == 'pageOne'}"
          @click="visiBility = 'pageOne'">林昶佐罷免一</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/taipei2" :class="{'active' : visiBility == 'pageTwo'}"
          @click="visiBility = 'pageTwo'">林昶佐罷免二</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/taichung1" :class="{'active' : visiBility == 'pageThree'}"
          @click="visiBility = 'pageThree'">台中二選區補選一</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/taichung2" :class="{'active' : visiBility == 'pageFour'}"
          @click="visiBility = 'pageFour'">台中二選區補選二</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "router",
    props: {
      visiBility: {
        type: String,
        required: true,
      }
    },
  }

</script>
