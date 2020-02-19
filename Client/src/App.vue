<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span id="main-title">Torrent Scraper</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/overlorddamygod"
        target="_blank"
        text
      >
        <span class="mr-2">By Pratham Byanjankar</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content class="main">
        <v-text-field
          v-model="query"
          label="Search for torrents . . ."
          class="input-box mt-5"
        ></v-text-field>
        <v-btn class="mr-4" @click="search">Search</v-btn>

        <v-tabs
      background-color="white"
      color="deep-purple accent-4"
      right
    >
      <v-tab @click="search">Pirate Bay</v-tab>
      <v-tab @click="eztvsearch">EZTV</v-tab>

      <v-tab-item
        v-for="n in 2"
        :key="n"
      >
        <v-container fluid>
              <v-progress-circular
      v-if="loading"
      :width="3"
      color="red"
      indeterminate></v-progress-circular>
      <Card v-for="torrent in torrents" :key="torrent.id" :torrent="torrent"/>
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
    query:'Vampire Diaries',
    torrents:[],
    loading:false
    //
  }),
  methods: {
    search() {
      this.torrents=[]
      this.loading=true
      axios.get(`http://localhost:8080/piratebay/search?q=${this.query}`)
      .then(res=> {
        this.torrents=res.data
        this.loading=false
      })
    },
    eztvsearch() {
      this.torrents=[]
      this.loading=true
      axios.get(`http://localhost:8080/eztv/search?q=${this.query}`)
      .then(res=> {
        this.torrents=res.data
        this.loading=false
      })
    }
  }
};
</script>


<style>
  .main {
    width:80%;
    margin:auto;
  }
  #main-title {
    font-size: 1.5em;
  }
</style>


