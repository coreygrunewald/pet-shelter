// @flow

function petReducer(state: PetShelterState, action: PetShelterActions): PetShelterState {
    switch(action.type) {
    case 'LOCATION_SELECTED':
        state.selectedLocationId = parseInt(action.id);
        break;

    case 'SHOW_PET':
        state.selectedPetId = parseInt(action.id);
        break;

    case 'HIDE_PET':
        state.selectedPetId = -1;
        break;

    case 'SEND_INQUIRY':
        // TODO: send network request!
        console.log('Inquiry sent.', action);
        break;
    }

    return state;
}

module.exports = petReducer;
