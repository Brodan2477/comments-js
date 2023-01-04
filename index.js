const express = require('express')
const app = express()
const path = require('path')

const { v4: uuidv4 } = require('uuid');


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))


const comments = [

    {
     name: 'Brody',
     comment: 'Hahaha nice one',
     id: uuidv4()
    },
    {
     name: 'Dan',
     comment: 'Guillotine is my thing',
     id: uuidv4()
    },
    {
     name: 'James',
     comment: 'Give leg',
     id: uuidv4()
    },
]

app.listen(3000, () => {
    console.log('listening...')
})

// comments page that has array of comments 

app.get('/comments', (req,res) => {

res.render('comments', { comments })

})

app.get('/comments/new', (req,res) => {

    res.render('new')

})

app.post('/comments', (req,res) => {

    const {name, comment} = req.body;
    comments.push({name, comment, id: uuidv4()})
    res.redirect('/comments')

})

app.get('/comments/:id', (req,res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('show', { comment })
})

app.patch('/comments/:id', (req,res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id)
    console.log(foundComment)
    const newComment = req.body.comment;
    console.log(newComment)
    foundComment.comment = newComment
    console.log(foundComment)
    res.redirect('/comments')
})
