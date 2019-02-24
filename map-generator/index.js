const request = require('request')
const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname + '/static'))

app.get('/', (req, res) => res.sendFile(__dirname + '/views/map.html'))

app.get('/spaces.json', function(req, res) {
	request('https://hackspace.org.uk/spaces.json', function(err,response,body) {
		if (err) {
			res.send(500);
			console.log(err);
		} else {
			res.json(JSON.parse(body));
		}
	})
})

app.listen(port, () => console.log(`Map generator listening on port ${port}.`))
