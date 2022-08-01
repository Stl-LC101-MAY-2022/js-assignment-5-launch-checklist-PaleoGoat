// Write your helper functions here!
// 1. Use preventDefault() to prevent a request from being sent out and the page reloading.
// 2. Validate the user-submitted data to ensure the following:
//      a. The user entered something for every field.
//      b. The user entered text for names and numbers for fuel and cargo levels.
// 3. With validation, update a list of what is currently ready or not ready for the shuttle launch.
// 4. Indicate what is good or bad about the shuttle and whether it is ready for launch by using the DOM to update the CSS.
// 5. Fetch some planetary JSON to update the mission destination with vital facts and figures about where the shuttle is headed.

// From 25.29.2
//  window.addEventListener("load", function() {
//     let form = document.querySelector("form");
//     form.addEventListener("submit", function(event) {
//        alert("submit clicked");
//     });



function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
 //    addDestinationInfo() does not need to return anything.
    let destinationInfo = document.getElementById("missionTarget");
    destinationInfo.innerHTML = `
    <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}</li>
                     <li>Diameter: ${diameter}</li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance}</li>
                     <li>Number of Moons: ${moons}</li>
                 </ol>
                 <img src="${imageUrl}">
    `
    /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */
 }


function validateInput(testInput) {
    // take in a string as a parameter and return "Empty", "Not a Number", or "Is a Number" as appropriate.
    if (testInput === '') {
        return 'Empty';
    }
    
    if (isNaN(testInput)) {
        return 'Not a Number';
    }
    
    if (!isNaN(testInput)) {
        return 'Is a Number';
    }
}

console.log(validateInput("")==="Empty");
console.log(validateInput("asdf")==="Not a Number");
console.log(validateInput("10")==="Is a Number");
// it ("Function properly validates text", function() {
//     expect(studentFunctions.validateInput("")).toEqual("Empty");
//     expect(studentFunctions.validateInput("asdf")).toEqual("Not a Number");
//     expect(studentFunctions.validateInput("10")).toEqual("Is a Number");
//  })
// All come back as true.
// Jasmine is a dirty liar!


// function fuelFail() {
//     document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`;
//     document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
//     document.getElementById("launchStatus").style.color = "red";
//     document.getElementById("faultyItems").style.visibility = "visible";
// }


// function cargoFail() {
//     document.getElementById("cargoStatus").innerHTML = `Cargo mass too high for launch`;
//     document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
//     document.getElementById("launchStatus").style.color = "red";
//     document.getElementById("faultyItems").style.visibility = "visible";
// }


function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    // use validateInput() to complete the formSubmission() function
    // formSubmission() will take in a document parameter and strings representing the pilot, co-pilot, fuel level, and cargo mass. 
    let failedPrelaunchChecks = [];

    if (validateInput(pilot) === 'Empty'|| validateInput(copilot) === 'Empty'|| validateInput(fuelLevel) === 'Empty'|| validateInput(cargoLevel) === 'Empty') {
        failedPrelaunchChecks.push('Empty Field');
        list.style.visibility = 'visible';
    } else {
        // list.style.visibility = 'hidden';
    }

// String fields prelaunch check
    if (validateInput(pilot) === 'Is a Number') {
        document.getElementById("pilotStatus").innerHTML = `Pilot name can\'t be a number`;
        failedPrelaunchChecks.push(`Pilot name can\'t be a number`);
        list.style.visibility = 'visible';
    } else {
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilot} is ready for launch`;
        // list.style.visibility = 'hidden';
    }

    if (validateInput(copilot) === 'Is a Number') {
        document.getElementById("copilotStatus").innerHTML = `Co-pilot name can\'t be a number`;
        failedPrelaunchChecks.push(`Co-pilot name can\'t be a number`);
        list.style.visibility = 'visible';
    } else {
        document.getElementById("copilotStatus").innerHTML = `Co-pilot ${copilot} is ready for launch`;
        // list.style.visibility = 'hidden';
    }

// Number fields prelaunch check
    if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        failedPrelaunchChecks.push('Names in a numbers field');
        list.style.visibility = 'visible';
    } else {
        // list.style.visibility = 'hidden';
    }
    
    if (Number(fuelLevel) < 10000) {
        document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch`;
        document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
        document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)";
        list.style.visibility = "visible";
        failedPrelaunchChecks.push('Low Fuel');
    } else {
        document.getElementById("fuelStatus").innerHTML = 'Fuel level high enough for launch'
        // list.style.visibility = 'hidden';
    };
    
    if (Number(cargoLevel) > 10000) {
        document.getElementById("cargoStatus").innerHTML = `Cargo mass too heavy for launch`;
        document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
        document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)";
        list.style.visibility = "visible";
        failedPrelaunchChecks.push('Too much cargo');
    } else {
        document.getElementById("cargoStatus").innerHTML = 'Cargo mass low enough for launch';
        // list.style.visibility = 'hidden';
    }

    // if (Number(fuelLevel) < 10000) {
    //     fuelFail();
    //     failedPrelaunchChecks.push('Low Fuel');
    // };
    
    // if (Number(cargoLevel) > 10000) {
    //     cargoFail();
    //     failedPrelaunchChecks.push('Too much cargo');
    // } 
    
    if (failedPrelaunchChecks.length === 0) {
        document.getElementById("launchStatus").innerHTML = "Shuttle is Ready for Launch";
        document.getElementById("launchStatus").style.color = "rgb(65, 159, 106)";
    };
// return array red flagging failed prelaunch checks
    console.log(failedPrelaunchChecks);
    return failedPrelaunchChecks;
}


async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        return response.json();
    });
    return planetsReturned;
}
// maybe

function pickPlanet(planets) {
    // pickPlanet() takes in one argument: a list of planets. Using Math.random(), 
    // return one planet from the list with a randomly-selected index.
    let howAboutHere = -1;
    howAboutHere = Math.floor(Math.random()*planets.length);
    return planets[howAboutHere];
}
// module.exports.addDestinationInfo = addDestinationInfo;
// module.exports.validateInput = validateInput;
// module.exports.formSubmission = formSubmission;
// module.exports.pickPlanet = pickPlanet; 
// module.exports.myFetch = myFetch;