<template>
  <div>
   <FusNav/>
    <router-view />
  </div>
</template>

<script>

import FusNav from './components/FusNav.vue'

export default {
  name: 'App',
  components: {

FusNav,
   

  },
}
</script>
