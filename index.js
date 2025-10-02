const express = require("express");
const app = express();

app.use(express.json());
///////////////////////////////////
const petShop=[
    {id:1, name: "labradoras"},
    {id:2, name: "auksinis retriveris"},
    {id:3, name: "chihuahua"},
    {id:4, name: "huskis"},
    {id:5, name: "pitbulis"},
    {id:6, name: "vokieciu aviganis"},
    {id:7, name: "vokieciu dogas"},
]

// GET read data from database
app.get("/pets/all", (request, response)=>{
    response.send(petShop);
})

// GET read one record from database
app.get("/pets/all/:id", (request, response)=>{
    const customPet= petShop.find ((pet) => pet.id ===parseInt(request.params.id));
    console.log(typeof request.params.id);

    if(!customPet){
        response.status(404).send("pet not found");
    }

    response.send(customPet);
})

/// POST create record to database

app.post("/pets/all", (request, response)=>{
    const newPet={
        id: petShop.length + 1,
        name: request.body.petName,
    };

    petShop.push(newPet);
    
    response.send(newPet);
})

// PUT update record in database
app.put("/pets/all/:id", (request, response)=> {
    const renewPet= petShop.find(pet=>pet.id===parseInt(request.params.id));

    if(!renewPet){
        response.status(404).send("pet not found, can not be updated");
    };

    renewPet.name = request.body.petName;

    response.send(renewPet);
});

// DELETE removs record from database
app.delete("/pets/all/:id", (request, response)=>{
    const deletePet = petShop.find(pet=>pet.id===parseInt(request.params.id));

    if(!deletePet){
        response.status(404).send("pet not found, can not be deleted");
    }
    const petIndex =petShop.indexOf(deletePet);
    petShop.splice(petIndex, 1);

    response.send(deletePet);
})

///////////////////////////////////
app.listen(5000, ()=>{
    console.log('Serveris paleistas ant 5000 porto');
});