const testData = [
    {
        name: "Toyota Corolla",
        image: "https://example.com/images/toyota-corolla.jpg",
        capacity: 5,
        fuelType: "Petrol",
        bookedTimeSlots: [
            { from: "2024-12-27T09:00", to: "2024-12-27T12:00" },
            { from: "2024-12-28T14:00", to: "2024-12-28T16:00" },
        ],
        rentPerHour: 15,
    },
    {
        name: "Honda Civic",
        image: "https://example.com/images/honda-civic.jpg",
        capacity: 5,
        fuelType: "Diesel",
        bookedTimeSlots: [
            { from: "2024-12-29T10:00", to: "2024-12-29T13:00" },
            { from: "2024-12-30T15:00", to: "2024-12-30T17:00" },
        ],
        rentPerHour: 18,
    },
    {
        name: "Tesla Model 3",
        image: "https://example.com/images/tesla-model-3.jpg",
        capacity: 5,
        fuelType: "Electric",
        bookedTimeSlots: [
            { from: "2024-12-31T08:00", to: "2024-12-31T11:00" },
            { from: "2025-01-01T13:00", to: "2025-01-01T15:00" },
        ],
        rentPerHour: 25,
    },
    {
        name: "Ford Ranger",
        image: "https://example.com/images/ford-ranger.jpg",
        capacity: 4,
        fuelType: "Diesel",
        bookedTimeSlots: [
            { from: "2025-01-02T07:00", to: "2025-01-02T09:00" },
            { from: "2025-01-03T12:00", to: "2025-01-03T14:00" },
        ],
        rentPerHour: 20,
    },
    {
        name: "Hyundai Elantra",
        image: "https://example.com/images/hyundai-elantra.jpg",
        capacity: 5,
        fuelType: "Petrol",
        bookedTimeSlots: [
            { from: "2025-01-04T10:00", to: "2025-01-04T13:00" },
            { from: "2025-01-05T14:00", to: "2025-01-05T16:00" },
        ],
        rentPerHour: 17,
    },
];

console.log(testData);

const Car = require('./models/carModel')

testData.forEach(async (car) => {
    
    Car.create(car);
   
    console.log("Car inserted");
})


