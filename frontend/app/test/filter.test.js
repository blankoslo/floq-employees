var filter = require('./../filter.js');

var testSpots = [
  {name:"Spot", city: "Oslo", imgUrl:"http://www.hipshops.com/img/shopPhotos/132/1.jpg", description:"Blablabla...", type: "Bar"},
  {name:"Spot 2", city: "Oslo", imgUrl:"http://www.hipshops.com/img/shopPhotos/132/1.jpg", description:"Blablabla...", type: "Cafe"},
  {name:"Spot 3", city: "Stockholm", imgUrl:"http://www.hipshops.com/img/shopPhotos/132/1.jpg", description:"Blablabla...", type: "Cafe"}
];


describe("when apply the getUniqueTypes to the testSpots it", function() {
  it("returns the two unique types", function() {
    var uniqueTypes = filter.getUniqueTypes(testSpots);

    expect(uniqueTypes).toContain("Cafe");
    expect(uniqueTypes).toContain("Bar");
    expect(uniqueTypes.length).toBe(2);
  });
});

describe("when apply the getUniqueCities to the testSpots it", function() {
  it("returns the two unique cities", function() {
    var uniqueTypes = filter.getUniqueCities(testSpots);

    expect(uniqueTypes).toContain("Oslo");
    expect(uniqueTypes).toContain("Stockholm");
    expect(uniqueTypes.length).toBe(2);
  });
});

describe("when filtering employees", function() {
  it("it only returns the employees that match the filters", function() {
    var activeFilters = ["Bar"];

    var filteredSpots = filter.filterSpots(testSpots, activeFilters, undefined);

    expect(filteredSpots.length).toBe(1);
    expect(filteredSpots[0].type).toEqual("Bar");
  });

  it("no active filters means all employees are returned", function() {
    var activeFilters = [];

    var filteredSpots = filter.filterSpots(testSpots, activeFilters, undefined);

    expect(filteredSpots.length).toBe(3);
  });

  it("only employees from the selected city should be returned", function() {
    var activeFilters = [];

    var filteredSpots = filter.filterSpots(testSpots, activeFilters, "Oslo");

    expect(filteredSpots.length).toBe(2);
  });

  it("only employees from the selected city that matches the filter should be returned", function() {
    var activeFilters = ["Bar"];

    var filteredSpots = filter.filterSpots(testSpots, activeFilters, "Oslo");

    expect(filteredSpots.length).toBe(1);
    expect(filteredSpots[0].name).toEqual("Spot");
  });

});
