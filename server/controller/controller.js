var Bookdb = require('../model/model');

//add and save new book
exports.create = (req, res)=>{
    //validate request
    if(!req.body){
        res.status(400).sed({message : "Content can not be empty!"});
        return;
    }

    //new book
    const book = new Bookdb({
        title : req.body.title,
        author : req.body.author,
        status: req.body.status
    })

    //save book in the database
    book
        .save(book)
        .then(data => {
            //res.send(data)
            res.redirect('/add-book');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });
}

//retrive and return all books/retrive and return a single book
exports.find = (req, res)=> {

    if(req.query.id){
        const id = req.query.id

        Bookdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message: "Not found book with id " + id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retriving book with id " + id})
            })

    }else{
        Bookdb.find()
           .then(book => {
                res.send(book)
            })
            .catch(err => {
                res.starus(500).send({message : err.message || "Error occurred while retriving user information"})
            })
    } 
}

//update a new idetified book by book id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Bookdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data =>{
            if(!data){
                res.status(404).send({ message: "Cannot update book with chosen id. Maybe book not found!"})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Error update book information"})
        })
}

//delete a book with specified book id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Bookdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message: "Cannot delete with chosen id. Maybe id is wrong"})
            }else{
                res.send({
                    message : "Book was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Book with id=" + id
            })
        });
}