const mongoose = require('mongoose')
// require('dotenv').config()

// const url = process.env.url || 4000

const dbConnect = () => {
  const url = 'mongodb+srv://abheyk04:abhey1234@authcluster.fw5qelg.mongodb.net/?retryWrites=true&w=majority'
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  mongoose.connection.on('error', (error) => {
      console.log(`not connected ${error}`)
  })
  mongoose.connection.on('open', async () => {
      console.log('connected')
  })
}


const dbDisconnect =  async () => {
  if (!mongoose.connection) {
    return ;
  }
  mongoose.disconnect()
  mongoose.once('close', async () => {
    console.log('disconnected to db')
  })
} 

module.exports = {
  dbConnect,
  dbDisconnect
}