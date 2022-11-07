let mongoose = require('moongose');
require('dotenv').config();

mongoose.connect(sample.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const model = mongoose.model;
var personSchema = new Schema({
  name:{type:String, required:true},
  age:Number,
  favoriteFoods:[String]
});

var Person = model("Person", personSchema);

const createAndSavePerson = (done) => {
  let javiCuenca = new Person({
    name: "Javi Cuenca", 
    age: 23, 
    favoriteFoods:["pasta", "steak", "fruit"]
    });
    javiCuenca.save((err, data) => {
        if(err)return console.error(err);
        done(null, data);
      });
};


let arrayOfPeople = [
  {name:"Nuri", age:22, favoriteFoods:["hamburger"]},
  {name:"Elo", age:50,favoriteFoods:["salmon"]},
  {name:"Dani", age:23, favoriteFoods:["pasta"]}
  ];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if(err){
      return console.error(err);
    }else{
       done(null, people);
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err,personFound) => {
    if(err){
     return console.log(err);
    }else{
      return done(null, personFound);
    }
 });
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
