const express  = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()   

const uri = 'mongodb+srv://kamlesh:123@cluster0.9lxhl.mongodb.net/test'

mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology: true})
  .then(() => console.log('connected'))
  .catch(err => console.log('Error while connecting database',err))

app.set('view engine','ejs')

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use('/articles', articleRouter)

app.get('/', (req, res) => {
    res.send('Home Page')
})

app.listen(5000, err => {
    if (err)
       console.log("HEY HERE IS ERROR",err)
    else
       console.log("Server stared!!")
})
