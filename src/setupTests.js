// src/setupTests.js

// Mock para fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve('Applicant,FacilityType,Address,FoodItems\nTruck1,Type1,Address1,Item1\nTruck2,Type2,Address2,Item2')
  })
);

// Mock para Papa.parse
jest.mock('papaparse', () => ({
  parse: (input, config) => {
    config.complete({
      data: [
        { Applicant: 'Truck1', FacilityType: 'Type1', Address: 'Address1', FoodItems: 'Item1' },
        { Applicant: 'Truck2', FacilityType: 'Type2', Address: 'Address2', FoodItems: 'Item2' }
      ]
    });
  }
}));
