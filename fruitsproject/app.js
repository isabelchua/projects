const mongoose = require('mongoose');

    mongoose.connect("mongodb://localhost:27017/test", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

const fruitSchema = new mongoose.Schema ({
	name: {
    type: String,
    required: [true, 'Please check data entry']
  },
	rating: {
    type: Number,
    min: 1,
    max: 10
  },
	review: String
});

const Fruit = mongoose.model('Fruit', fruitSchema);

const fruit = new Fruit ({
//	name: "Apple",
	rating: 10,
	review: "Pretty solid as a fruit."
});

//fruit.save();

const personSchema = new mongoose.Schema ({
  name: String,
  age:  Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const mango = new Fruit ({
  name: 'Mango',
  score: 6,
  review: 'Decent fruit.'
});

mango.save();

Person.updateOne({name: 'John'}, {favouriteFruit: mango}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log('Succesfully updated the document')
  }
})

const person = new Person ({
  name: "Amy",
  age:  34,
 // favouriteFruit: pineapple
});

person.save();

// const kiwi = new Fruit ({
//   name: "Kiwi",
//   score: 10,
//   review: "The best Fruit"
// });

// const orange = new Fruit ({
//   name: "Orange",
//   score: 3,
//   review: "The best Fruit"
// });

// const banana = new Fruit ({
//   name: "Banana",
//   score: 4,
//   review: "weird"
// });

// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if (err){
//     console.log(err);
// } else {
//   console.log("Succesfully save all fruits")
// }

// });


Fruit.find(function(err, fruits){
  if(err) {
  console.log(err);
} else {
 // console.log(fruits);
  mongoose.connection.close();

  fruits.forEach(function(fruits){
  console.log(fruits.name);
})
}
});

// Fruit.updateOne({_id: '5f25eec095d7604168b843bb'}, {name: 'Peach'}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Successfully updated the document.")
//   }
// });


// Fruit.deleteOne({name: 'Peach'}, function(err){
//   if(err){
//     console.log(err);
//   } else {
//     console.log("Successfully deleted the document.")
//   }
// });

Person.deleteMany({name: 'John'}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Succesfully deleted all');
  }
});

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}