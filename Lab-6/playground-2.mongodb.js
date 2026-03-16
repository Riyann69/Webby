// 1. Create and Select 'animal' DB

use('animal');
console.log("Selected DB:", db.getName());

// 2. Display all databases

const dbList = db.adminCommand({ listDatabases: 1 });
dbList.databases.forEach(d => console.log("DB:", d.name));

// 3. Create collections

db.createCollection('wild_animals', {
    capped: true,
    size: 1048576,
    max: 100
});

db.createCollection('domestic_animals');
console.log("Collections:", db.getCollectionNames());

// 4. Insert 5 wild animals

db.wild_animals.insertMany([
    {
    animal_name: "Bengal Tiger",
    nature: "harm",
    favourite_foods: ["deer", "wild boar", "buffalo"],
    care_taker_name: "Sebastian Muller",
    life_span: 15,
    timestamp: new Date("2021-03-10"),
    expenses: 85000
    },
    {
    animal_name: "African Lion",
    nature: "harm",
    favourite_foods: ["zebra", "wildebeest", "antelope"],
    care_taker_name: "Luca Rossi",
    life_span: 14,
    timestamp: new Date("2020-07-22"),
    expenses: 90000
    },
    {
    animal_name: "Giant Panda",
    nature: "harmless",
    favourite_foods: ["bamboo", "fruits", "vegetables"],
    care_taker_name: "Ingird Hoffmann",
    life_span: 20,
    timestamp: new Date("2022-01-15"),
    expenses: 120000
  },
  {
    animal_name: "Snow Leopard",
    nature: "harm",
    favorite_foods: ["deer", "rabbits", "mountain goat"],
    care_taker_name: "Sebastian Muller",
    life_span: 12,
    timestamp: new Date("2021-11-05"),
    expenses: 75000
  },
  {
    animal_name: "Chimpanzee",
    nature: "harmless",
    favorite_foods: ["fruits", "nuts", "insects"],
    care_taker_name: "Antoine Dubois",
    life_span: 40,
    timestamp: new Date("2019-06-30"),
    expenses: 60000
  }
]);

// 5. Insert 5 domestic animals 

db.domestic_animals.insertMany([
  {
    animal_name: "Golden Retriever",
    gender: "male",
    favorite_foods: ["meat", "dog biscuits", "vegetables"],
    animal_petname: "Bruno",
    life_span: 12,
    timestamp: new Date("2022-04-10"),
    expenses: 15000
  },
  {
    animal_name: "Persian Cat",
    gender: "female",
    favorite_foods: ["fish", "chicken", "cat food"],
    animal_petname: "Bella",
    life_span: 15,
    timestamp: new Date("2021-08-18"),
    expenses: 12000
  },
  {
    animal_name: "Indian Cow",
    gender: "female",
    favorite_foods: ["grass", "hay", "grains"],
    animal_petname: "Ganga",
    life_span: 20,
    timestamp: new Date("2020-02-25"),
    expenses: 20000
  },
  {
    animal_name: "Rabbit",
    gender: "male",
    favorite_foods: ["carrots", "lettuce", "pellets"],
    animal_petname: "Snowy",
    life_span: 4,
    timestamp: new Date("2023-01-12"),
    expenses: 5000
  },
  {
    animal_name: "Parrot",
    gender: "female",
    favorite_foods: ["seeds", "fruits", "nuts"],
    animal_petname: "Mango",
    life_span: 25,
    timestamp: new Date("2022-09-01"),
    expenses: 8000
  }
]);

// 6. Display all documents

console.log("\n--- WILD ANIMALS ---");
db.wild_animals.find().forEach(doc => console.log(doc));

console.log("\n--- DOMESTIC ANIMALS ---");
db.domestic_animals.find().forEach(doc => console.log(doc));

// 7. Display only animal name and expenses

console.log("\n--- WILD ANIMALS: Name & Expenses ---");
db.wild_animals.find({}, { animal_name: 1, expenses: 1, _id: 0 })
  .forEach(doc => console.log(doc));

console.log("\n--- DOMESTIC ANIMALS: Name & Expenses ---");
db.domestic_animals.find({}, { animal_name: 1, expenses: 1, _id: 0 })
  .forEach(doc => console.log(doc));


// 8. Domestic animals with a particular lifespan

console.log("\n--- DOMESTIC ANIMALS with lifespan 15 years ---");
db.domestic_animals.find(
  { life_span: 15 },
).forEach(doc => console.log(doc));


// 9. Wild animals under a particular caretaker

console.log("\n--- WILD ANIMALS under Rajan Kumar ---");
db.wild_animals.find(
  { care_taker_name: "Rajan Kumar" }
).forEach(doc => console.log(doc));


// 10. Animals with lifespan > 5 years

console.log("\n--- WILD ANIMALS: Lifespan > 5 ---");
db.wild_animals.find(
  { life_span: { $gt: 5 } },
  { animal_name: 1, favorite_foods: 1, expenses: 1, _id: 0 }
).forEach(doc => console.log(doc));

console.log("\n--- DOMESTIC ANIMALS: Lifespan > 5 ---");
db.domestic_animals.find(
  { life_span: { $gt: 5 } },
  { animal_name: 1, favorite_foods: 1, expenses: 1, _id: 0 }
).forEach(doc => console.log(doc));