<template>
  <v-card class="mx-auto car mb-3">
        <v-col class="col-7">
          <a :href="torrent.torrentUrl">{{torrent.title}}</a>
        </v-col>
        <v-col class="details">
          Size : {{torrent.size}} Seeders : {{torrent.seeders}}
        </v-col>
        <div>
            <a class="ic" :href="torrent.magnetUrl"><v-icon>mdi-download</v-icon></a>
        </div>


  </v-card>
</template>

<script>
  export default {
    name: 'Card',

    data: () => ({
      
    }),
    props: ['torrent'],

  }
</script>

<style scoped>
    a {
        display:block;
    }
    .ic {
        display: inline-block;
        margin-right:1em;
    }
    .car {
        height:4em;
        display: flex;
        align-items: center;
    }

    @media only screen and (max-width: 600px) {
        * {
            font-size:0.9em;
        }

    }
</style>