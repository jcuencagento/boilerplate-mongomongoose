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
    if(err) return console.error(err);
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
    if(err) return console.error(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName}, (err,personFound) => {
    if(err) return console.log(err);
    return done(null, personFound);
 });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food}, (err, data) => {
    if(err) return console.log(err);
    return done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if(err) return console.log(err);
    return done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "chicken";
  Person.findById(personId, (err,person) => {
    if(err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
        if(err) return console.log(err);
        done(null, updatedPerson);
     });
 });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {name:personName},
    {age:ageToSet},
    {new:true},
    (err,updatedDoc) => {
      if(err) return console.log(err);
      done(null, updatedDoc);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, removedDoc) => {
    if(err) return console.log(err);
    done(null,removedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Nuri";
  Person.remove({name:nameToRemove}, (err,response) => {
    if(err) return console.log(err);
    done(null, response);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:{$all:[foodToSearch]}})
    .sort({name:'asc'})
    .limit(2)
    .select('-age')
    .exec((error, filteredResults) =>{
      if(error){
        console.log(error)
      }else{
        done(null, filteredResults)
      }
    });
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
