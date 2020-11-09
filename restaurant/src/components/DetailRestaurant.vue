<template>
    <div id="app">
        <div class="space10"></div>
        <v-container>
            <v-card-title justify="center">
                <h2 class="pageTitle"> Bienvenue au {{ restaurant.name }} </h2>
            </v-card-title>
        </v-container>
        <hr style="width: 50%;margin: 0 auto">
        <v-row>
            <v-col>
                <img src="https://picsum.photos/600">
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
                <v-list-item class="square">
                    <v-list-item-content>
                    <v-list-item-title class="list-item">Address : {{ restaurant.address.building }} {{ restaurant.address.street }} </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                    <v-list-item-title class="list-item">Borough : {{ restaurant.borough }} </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                 
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'DetailRestaurant',
    computed: {
        id() {
            return this.$route.params.id
        }
    },
    data:() => {
        return {
            restaurant: null
        }
    },
    mounted() {
        let url = "http://localhost:8080/api/restaurants/" + this.id;
        fetch(url)
        .then(reponse => {
            return reponse.json();
        }).then(data => {
            console.log(data.restaurant.name)
            this.restaurant = data.restaurant;
        })
    }
}

</script>

<style>

.list-item {
    font-family: 'Anton';
    font-size: 35px;
}
</style>