// import fetch from "node-fetch";
// globalThis.fetch = fetch
// // Write your JavaScript code here!

// vital information: the pilot's name, the co-pilot's name, the fuel levels, and the mass of the cargo.
// All we need to do is use validation to ensure that we have all of the info for the space shuttle program and make sure no one prematurely launches the shuttle

// 1. Use preventDefault() to prevent a request from being sent out and the page reloading.
// 2. Validate the user-submitted data to ensure the following:
//      a. The user entered something for every field.
//      b. The user entered text for names and numbers for fuel and cargo levels.
// 3. With validation, update a list of what is currently ready or not ready for the shuttle launch.
// 4. Indicate what is good or bad about the shuttle and whether it is ready for launch by using the DOM to update the CSS.
// 5. Fetch some planetary JSON to update the mission destination with vital facts and figures about where the shuttle is headed.

//is this working?

window.addEventListener("load", function() {
    const list = document.getElementById("faultyItems");
    list.style.visibility = 'hidden';
    let form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
       const pilotNameInput = document.querySelector("input[name=pilotName]").value.trim();
       const coPilotNameInput = document.querySelector("input[name=copilotName]").value.trim();
       const fuelLevelInput = document.querySelector("input[name=fuelLevel]").value.trim();
       const cargoMassInput = document.querySelector("input[name=cargoMass]").value.trim();
       console.log(cargoMassInput);
    //    const list = document.getElementById("faultyItems");
       let redFlags = formSubmission(document, list, pilotNameInput, coPilotNameInput, fuelLevelInput, cargoMassInput) // add back in: document, list, 
       console.log(redFlags);

       if (redFlags.length > 0) {
           console.log('Houston, we have a problem!')
           console.log(redFlags); 
           event.preventDefault();
       } else {
           formSubmission(document, list, pilotNameInput, coPilotNameInput, fuelLevelInput, cargoMassInput);
           event.preventDefault();
       }
  }); 
  console.log('test');

    let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let destination = pickPlanet(listedPlanets);
       console.log(destination.image);
       addDestinationInfo(document, destination.name, destination.diameter, destination.star, destination.distance, destination.moons, destination.image)
   })
});