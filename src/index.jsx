// @flow

const PetShelter = require('./shelter');
const ShelterView = require('./views/shelter.jsx');
const pets = require('./pets');
const locations = require('./locations');

// Rigby starts his new pet shelter!

const shelter = new PetShelter({
    locations,
    pets,
    selectedLocationId: locations[0].id,
    selectedPetId: -1
});

// After starting his new pet shelter, Rigby can start saving pets!

shelter.startSavingPets(
    ShelterView,
    document.querySelector('#shelter')
);
