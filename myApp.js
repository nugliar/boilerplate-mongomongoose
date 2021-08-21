require('dotenv').config();

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: {
    type: String
    // required: true,
    // unique: true
  },
  age: {
    type: Number
    // required: true,
    // min: [18, 'Must be 18 years old or more']
  },
  favoriteFoods: [{type: String}]
  // default: ['Shark soup', 'Salmon pizza', 'Pineapple stew']
})


let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const doc = new Person({
    name: 'John Wick',
    age: 20,
    favoriteFoods: ['apple', 'kiwi']
  });
  doc.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find(
    {name: personName},
    function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    })
};

const findOneByFood = (food, done) => {
  Person.findOne(
    {favoriteFoods: food},
    function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    })
};

const findPersonById = (personId, done) => {
  Person.findById(
    personId,
    function(err, data) {
      if (err) return console.error(err);
      done(null, data);
    })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(
    personId,
    function(err, person) {
      if (err) return console.error(err);
      person.favoriteFoods.push(foodToAdd)
      person.save(function(err, data) {
        if (err) console.error(err);
        done(null, data);
      })
    })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    {name: personName},
    'name',
    {new: true},
    function(err, person) {
      if (err) console.error(err);
      person.age = ageToSet;
      done(null, person);
    }
  )
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    function(err, person) {
      if (err) console.error(err);
      done(null, person)
    }
  )
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
