<template>
  <div id="app">
    <v-app-bar dense fixed>
      <v-toolbar-title v-bind:style="menuTitle"> Projet Restaurants </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text> <router-link v-bind:style="menuItem" to="/">Accueil</router-link> </v-btn>
        <v-btn text> <router-link v-bind:style="menuItem" to="/restaurants">Restaurants</router-link> </v-btn>
      </v-toolbar-items>
    </v-app-bar>
      <router-view></router-view>
  </div>
  
</template>

<script>
export default {
  name: 'App',
  data:() => ({
    menuItem: {
      fontFamily: 'Lato',
      textDecoration: 'none'
    },
    menuTitle: {
      fontFamily: 'Bebas Neue',
      fontSize: '20px'
    }
  })
};
</script>
