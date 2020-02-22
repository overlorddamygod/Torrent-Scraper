<template>
  <v-app>
    <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
            <span id="main-title">Torrent Scraper</span>
        </div>

        <v-spacer></v-spacer>

        <v-btn href="https://github.com/overlorddamygod" target="_blank" text>
            <span class="mr-2">By Pratham Byanjankar</span>
            <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
    </v-app-bar>

    <v-content class="main">
        <v-alert v-if="error" type="error" class="mt-2" dismissible>{{error}}</v-alert>
        <v-text-field v-model="query" label="Search for torrents . . ." class="input-box mt-5"></v-text-field>
        <v-btn class="mr-4 mb-2" @click="search()">Search</v-btn>

        <v-tabs background-color="white" color="deep-purple accent-4" right>
            <v-tab @click="search('piratebay')">Pirate Bay</v-tab>
            <v-tab @click="search('eztv')">EZTV</v-tab>

            <v-tab-item v-for="n in 2" :key="n">
                <v-container fluid>
                    <v-progress-circular v-if="loading" :width="4" color="red" id="loader" indeterminate></v-progress-circular>
                    <Card v-for="torrent in torrents" :key="torrent.id" :torrent="torrent" />
                </v-container>
            </v-tab-item>
        </v-tabs>

    </v-content>
</v-app>
</template>

<script>
import Card from './components/Card';
import axios from 'axios'

export default {
  name: 'App',

  components: {
    Card,
  },

  data: () => ({
    query:'',
    torrents:[],
    loading:false,
    searchsite:'piratebay',
    error:'',
  }),
  methods: {
    search(searchsite=null) {
      if(this.query === "") {
        this.error="Please input search items."
        setTimeout(()=>{
          this.error=""
        },2300)
      } else {
        this.torrents=[]
        this.loading=true
        searchsite = searchsite === null ? 'piratebay' : searchsite
        axios.get(`http://localhost:3001/${searchsite}/search?q=${this.query}`)
        .then(res=> {
          this.torrents=res.data
          this.loading=false
        })
      }
    },
  }
};
</script>


<style>
  .main {
    width:80%;
    margin:auto;
    position: relative;
  }
  #main-title {
    font-size: 1.2rem;
  }
  #loader {
    position: fixed;
    top:50%;
    right:50%;
    transform: translate(-50%,-50%);
  }
  
  @media only screen and (max-width: 600px) {
    .main {
      width:95%;
    }
  }
</style>


