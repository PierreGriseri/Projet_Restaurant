<template>
  <div id="app">
  <v-app id="inspire">
    <v-container>
      <br><br>
        <v-card-title justify="center">
            <h2 class="pageTitle"> Restaurants </h2>
        </v-card-title>
    </v-container>
    <v-container> 
      <v-row> 
        <v-col>
          <br>
          <v-slider v-on:input="chercherRestaurants()" 
          type="range" max=100 min=5 step=5 value=10 v-model="pagesize"></v-slider>
          <p>Restaurants par page : {{ pagesize }}</p>
        </v-col>
      </v-row>
    </v-container>
    <br>
    <v-container> 
      <v-row> 
        <v-col>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Rechercher un restaurant"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col>
          <form @submit.prevent="ajouterRestaurant($event)">
              <input name="nom" type="text" required v-model="nom" placeholder="Nom">
              <input name="cuisine" type="text" required v-model="cuisine" placeholder="Cuisine">
            <button class="btnStyle"> Ajouter </button>
          </form>
        </v-col>
      </v-row>
    </v-container>

    <v-data-table
        :headers="headers"
        :items="restaurants"
        :search="search"
        loading="true"
      loading-text="CHARGEZ !!!! - Napoléon"
      :single-expand=true
      item-key="name"
      show-expand
      :items-per-page="pagesize"
      class="dataCorpus"
      >
      <template>
        <router-link :to="'/restaurant/' + item._id">
        <v-icon
          small
          class="mr-2"
        >
          mdi-pencil
        </v-icon>
      </router-link>
        <v-icon
          small
          @click="supprimerRestaurant(item._id)"
        >
          mdi-delete
        </v-icon>
      </template>
      <v-progress-linear v-show="load" slot="progress" color="blue" indeterminate></v-progress-linear>
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length">
          <br>
          <div >
          <v-row>
            <v-col>
              <GmapMap 
              :center="{lat:item.address.coord[1], lng:item.address.coord[0]}" 
              :zoom="15" map-type-id="terrain"
                style="width: 500px; height: 300px"
              >
              <GmapMarker :position="{lat:item.address.coord[1], lng:item.address.coord[0]}"
                :clickable="true"
              />
              </GmapMap>
            </v-col>
          </v-row>
          </div>
        </td>
      </template>
    </v-data-table>
  </v-app>
</div>
</template>


<script>
import _ from 'lodash';
export default {
    name: 'Restaurants',
    data:() => ({
      autocomplete: null,
      load: true,
      expended: [],
      selected: null,
      restaurants: [],
      search: null,
      cuisine: "",
      nom: "",
      nbRestaurantsTotal: 0,
      page: 0,
      pagesize: 10,
      nbPagesTotal: 0,
      msg: "",
      nomRestauRecherche: "",
      headers: [
        {text: "Nom", value: 'name'},
        {text: "Cuisine", value: 'cuisine'},
        {text: "Quartier", value: 'borough'},
        {text: "Actions", value: 'actions', sortable: false},
      ]
    }),
    mounted() {
      console.log("AVANT AFFICHAGE");
      this.getRestaurantsFromServer();
    },
    watch: {
      nbRestaurantsTotal() {
        console.log(this.nbRestaurantsTotal);
      },
      restaurants() {
        this.load = false
      }
    },
    methods: {
       pagePrecedente() {
        if (this.page === 0) return;

        this.page--;
        this.getRestaurantsFromServer(this.nbRestaurantsTotal);
      },
      pageSuivante() {
        if (this.page === this.dernierePage) return;
        this.page++;
        this.getRestaurantsFromServer();
      },
      coucou() {
        console.log([...new Set(this.restaurants.cuisine)]);
      },
      getRestaurantsFromServer(page_size) {
        let url = "http://localhost:8080/api/restaurants?";
        url += "page=" + this.page;
        url += "&pagesize=" + page_size;
        url += "&name=" + this.nomRestauRecherche;


        fetch(url)
          .then((responseJSON) => {
            // arrow functions, conserve le bon "this"
            // la réponse est en JSON, on la convertit avec la ligne suivante
            responseJSON.json().then((resJS) => {
              // Maintenant resJS est un vrai objet JavaScript
              this.restaurants = resJS.data;
              this.nbRestaurantsTotal = resJS.count;
              this.nbPagesTotal = Math.round(
                this.nbRestaurantsTotal / this.pagesize
              );
              this.load = false;
              console.log(this.restaurants);
            });
          })
          .catch(function (err) {
            console.log(err);
          });
      },
      chercherRestaurants: _.debounce(
        function () {
          this.getRestaurantsFromServer();
        }, 300),
      supprimerRestaurant(r) {
        let url = "http://localhost:8080/api/restaurants/" + r;

        fetch(url, {
            method: "DELETE",
          })
            .then((responseJSON) => {
              responseJSON.json().then((resJS) => {
                // Maintenant res est un vrai objet JavaScript
                console.log(resJS.msg);
                this.msg = resJS.msg;
                // On rafraichit la vue
                this.getRestaurantsFromServer();
              });
            })
            .catch(function (err) {
              console.log(err);
            });
      },
      ajouterRestaurant(event) {
        // Récupération du formulaire. Pas besoin de document.querySelector
        // ou document.getElementById puisque c'est le formulaire qui a généré
        // l'événement
        let form = event.target;
        // Récupération des valeurs des champs du formulaire
        // en prévision d'un envoi multipart en ajax/fetch
        let donneesFormulaire = new FormData(form);
        
        let url = "http://localhost:8080/api/restaurants";

        fetch(url, {
          method: "POST",
          body: donneesFormulaire,
        })
          .then((responseJSON) => {
            responseJSON.json().then((resJS) => {
              // Maintenant res est un vrai objet JavaScript
              console.log(resJS.msg);
              this.msg = resJS.msg;
              // On rafraichit la vue
              this.getRestaurantsFromServer();
            });
          })
          .catch(function (err) {
            console.log(err);
          });

        this.nom = "";
        this.cuisine = "";
      },
      getColor(index) {
        return index % 2 ? "lightBlue" : "pink";
      },
      getAlternateLabel (count) {
        return `${count} restaurant(s)selected`
      },
      onSelect (items) {
        if(items[0] === undefined)
          return;
        this.selected = items[0]._id;
      },
      setPlace(place) {
        this.currentPlace = place;
      },
      geolocate: function() {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
        });
      }
    }
}
</script>

<style>
.block {
  display: block!important;
}

.pageTitle {
  font-family: 'Lobster Two'!important;
  margin: 0 auto!important;
  font-size: 35px;
}

.dataCorpus {
  font-family: 'Bebas Neue';
}
</style>