const Axios = require('axios')
const express = require('express')
const fs = require('fs')
const request = require('request')
const router = express.Router()
const followRedirects = require('follow-redirects');
followRedirects.maxBodyLength = 500 * 1024 * 1024 * 1024; // 500 GB

function sleep(milliSeconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), milliSeconds)
  })
}

// setInterval(() => {
//   const used = process.memoryUsage();
//   const messages = [];
//   for (let key in used) {
//     messages.push(`${key}: ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`)
//   }
//   console.log(new Date(), messages.join(', '));
// }, 5000);

/* GET home page. */
router.get('/', async function (req, res, next) {
  console.log(`[${new Date()}] get / called`)
  // let readStream = fs.createReadStream('dummy\\2GB.dummy')
  let readStream = fs.createReadStream('dummy\\2GB.dummy')
  readStream.pipe(request.put('http://localhost:3002/upload'))
  // await sleep(10000)
  res.sendStatus(202);
  // Axios({
  //   method: 'PUT',
  //   url: 'http://localhost:3002/upload',
  //   headers: {
  //     'Content-Type': 'application/octet-stream',
  //     'Content-Length': 100 * 1024 * 1024,
  //     "Content-Disposition": "attachment"
  //   },
  //   data: readStream
  // })
  //   .then(putResponse => {
  //     console.log(`[${new Date()}] success`)
  //     res.send(`putResponse.statusCode = ${putResponse.statusCode}`)
  //     // res.sendStatus(202);
  //   }).catch(err => {
  //     console.log('failed')
  //     console.log(err)
  //   })
})

module.exports = router
