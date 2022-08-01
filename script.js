// // Write your JavaScript code here!

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
       addDestinationInfo(document, destination.name, destination.diameter, destination.star, destination.distance, destination.moons,  destination.image)    
   })
});