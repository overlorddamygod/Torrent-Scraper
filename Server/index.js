const express = require('express')
const cheerio = require('cheerio')
const cors = require('cors')
const morgan = require('morgan')
const axios = require('axios')

// Torrent sites search url
const piratebayurl="https://thepiratebay.org/search/"
const eztvurl="https://eztv.io/search/"

const app=express();

// Middlewares
app.use(cors())
app.use(morgan('combined'))


const port=process.env.PORT || 8080

// Routes

// For https://thepiratebay.org/
app.get("/piratebay/search",async (req,res) => {
    const result = await axios.get(`${piratebayurl}${req.query.q}/0/99/0`)
    const $ = await cheerio.load(result.data)
    let torrents = []
    let id=1
    $('tr').each((i, etr) => {
        let tor = {}
        $(etr).find('td').each((i, etd) => {
            const title = $(etd).find('.detLink').text()
            const torrentUrl = $(etd).find('.detLink').attr('href')
            const magnetUrl = $(etd).find('a[title="Download this torrent using magnet"]').attr('href')
            const details = $(etd).find('font').text()
            if (magnetUrl) {
                tor.title = title,
                tor.torrentUrl = `https://thepiratebay.org${torrentUrl}`,
                tor.magnetUrl = magnetUrl
            }
            if (details) {
                const deta = details.split(",")
                const uploadedDate = deta[0].split(" ")[1]
                const size = deta[1].split(" ")[2]
                const uploadedBy = deta[2].split(" ")[3]
                tor.size=size
                tor.id=id
                tor.details = {
                    uploadedDate,
                    uploadedBy
                }
                id++
            }
        })
        $(etr).find('td[align="right"]').each((j, etd) => {
            let seed_leech = $(etd).text()
            if (j === 0) tor.seeders = seed_leech
            if (j === 1) tor.leechers = seed_leech
        })
        if (Object.keys(tor).length != 0) torrents.push(tor)
        id++
    })
    res.send(torrents)
})

// For eztv.io
app.get("/eztv/search",async (req,res) => {
    query=req.query.q.replace(" ","-")
    const result = await axios.get(`${eztvurl}${query}`)
    const $ = await cheerio.load(result.data)
    let torrents = []
    let id=1
    $('tr[name="hover"]').each((i, etr) => {
        let tor= {}
        $(etr).find('td').each((j,etd)=> {
            switch(j) {
                case 1: 
                    const title = $(etd).find('a').text()
                    const torrentUrl = $(etd).find('a').attr('href')
                    tor.title=title
                    tor.torrentUrl=`https://eztv.io/${torrentUrl}`
                case 2:
                    const magnetUrl = $(etd).find('a').attr('href')
                    tor.magnetUrl=magnetUrl
                case 3:
                    const size = $(etd).text()
                    tor.size=size
                case 5:
                    const seeders = $(etd).find('font[color="green"]').text()
                    tor.seeders =seeders
            }
            tor.id=id
            id++
        })
        id++
        torrents.push(tor)
    })
    res.send(torrents)
})
// Server Listening
app.listen(port,()=> {
    console.log(`Server listening on port ${port}`)
})