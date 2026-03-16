// 1. Create and Select 'vehicles' DB

use('vehicles');
console.log("Selected DB:", db.getName());

// 2. Display all databases

const dbList = db.adminCommand({ listDatabases: 1 });
dbList.databases.forEach(d => console.log("DB:", d.name));

// 3. Create collections

db.createCollection('two_wheelers', {
    capped: true,
    size: 1048576,
    max: 100,
});

db.createCollection('four_wheelers');
console.log("Collections:", db.getCollectionNames());

// 4. Insert 5 two-wheelers

db.two_wheelers.insertMany([
  {
    bike_name: "Ducati Panigale V4",
    model: "gear",
    category: "1100cc",
    colors_available: ["red", "black", "sport red"],
    manufacturer: "Ducati",
    performance: 10,
    timestamp: new Date("2022-03-15"),
    price: 2600000
  },
  {
    bike_name: "Harley-Davidson Iron 883",
    model: "gear",
    category: "883cc",
    colors_available: ["black", "vivid black", "silver"],
    manufacturer: "Harley-Davidson",
    performance: 8,
    timestamp: new Date("2021-07-20"),
    price: 1200000
  },
  {
    bike_name: "BMW S1000RR",
    model: "gear",
    category: "1000cc",
    colors_available: ["blue", "black", "red"],
    manufacturer: "BMW Motorrad",
    performance: 10,
    timestamp: new Date("2023-01-10"),
    price: 2000000
  },
  {
    bike_name: "Kawasaki Ninja ZX-10R",
    model: "gear",
    category: "1000cc",
    colors_available: ["green", "black", "sport red"],
    manufacturer: "Kawasaki",
    performance: 9,
    timestamp: new Date("2022-11-05"),
    price: 1500000
  },
  {
    bike_name: "Triumph Street Triple RS",
    model: "gear",
    category: "765cc",
    colors_available: ["silver", "black", "blue"],
    manufacturer: "Triumph",
    performance: 9,
    timestamp: new Date("2023-02-28"),
    price: 1100000
  }
]);

// 5. Insert 5 four-wheelers

db.four_wheelers.insertMany([
  {
    vehicle_name: "Rolls-Royce Phantom",
    model: "own",
    category: "car",
    variants: ["petrol", "extended wheelbase"],
    manufacturer: "Rolls-Royce",
    performance: 9,
    timestamp: new Date("2022-06-01"),
    price: 95000000
  },
  {
    vehicle_name: "Lamborghini Urus",
    model: "own",
    category: "car",
    variants: ["petrol", "s variant", "performante"],
    manufacturer: "Lamborghini",
    performance: 10,
    timestamp: new Date("2022-09-15"),
    price: 40000000
  },
  {
    vehicle_name: "Bugatti Chiron",
    model: "own",
    category: "car",
    variants: ["petrol", "super sport", "pur sport"],
    manufacturer: "Bugatti",
    performance: 10,
    timestamp: new Date("2023-01-20"),
    price: 1200000000
  },
  {
    vehicle_name: "Ferrari SF90 Stradale",
    model: "own",
    category: "car",
    variants: ["petrol", "hybrid", "assetto fiorano"],
    manufacturer: "Ferrari",
    performance: 10,
    timestamp: new Date("2022-12-05"),
    price: 80000000
  },
  {
    vehicle_name: "Mercedes-Maybach S680",
    model: "own",
    category: "car",
    variants: ["petrol", "diesel", "vxi", "zxi"],
    manufacturer: "Mercedes-Benz",
    performance: 9,
    timestamp: new Date("2023-03-10"),
    price: 28000000
  }
]);

// 6. Display all documents

console.log("\n--- TWO WHEELERS ---");
db.two_wheelers.find().forEach(doc => console.log(doc));

console.log("n\--- FOUR WHEELERS ---");
db.four_wheelers.find().forEach(doc => console.log(doc));

// 7. Display only name and price

console.log("\n--- TWO WHEELERS: Name & Price ---");
db.two_wheelers.find({}, { bike_name: 1, price: 1, _id: 0 }
).forEach(doc => console.log(doc));

console.log("\n--- FOUR WHEELERS: Name & Price ---");
db.four_wheelers.find({}, { vehicle_name: 1, price: 1, _id: 0 }
).forEach(doc => console.log(doc));

// 8. Two Wheelers from a particular company

console.log("\n--- TWO WHEELERS by Ducati ---");
db.two_wheelers.find(
    { manufacturer: "Ducati" }
).forEach(doc => console.log(doc));

// 9. Four Wheelers in diesel variants

console.log("\n--- FOUR WHEELERS: Diesel Variants ---");
db.four_wheelers.find(
    { variants: "diesel" }
).forEach(doc => console.log(doc));

// 10. Vehicles with performance > 5

console.log("\n--- TWO WHEELERS: Rating > 5 ---");
db.two_wheelers.find(
    { performance: { $gt: 5 } },
    { bike_name: 1, category: 1, manufacturer: 1, performance: 1, _id: 0 }
).forEach(doc => console.log(doc));

console.log("\n--- FOUR WHEELERS: Rating > 5 ---");
db.four_wheelers.find(
    { performance: { $gt: 5 } },
    { vehicle_name: 1, category: 1, manufacturer: 1, performance: 1, _id: 0 }
).forEach(doc => console.log(doc));