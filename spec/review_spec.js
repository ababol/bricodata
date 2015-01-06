var url = "https://oqadu.herokuapp.com",
  frisby = require('frisby');


// test the integrity of the returned JSON by getting the products list
frisby.create('Check Products endpoints')
.get(url + '/api/v2/reviews')
.expectHeaderContains('Content-Type', 'json')
.expectStatus(200)
.expectJSONTypes('*', {
  reviewedProduct: {
    name: String,
    dutyFreePrice: Number,
    tags: Array,
    pictures: Array,
    features: Array
  },
  reviewerName: String,
  score: Number,
  comment: String
})
.toss();


