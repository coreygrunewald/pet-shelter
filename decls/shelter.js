declare type PetAction = 'adopt' | 'foster';
declare type PetType = 'dog' | 'cat' | 'bunny';
declare type PetShelterDispatch = (x: PetShelterActions) => void;

declare type PetShelterApp = {
    getState: Function;
    subscribe: Function;
    dispatch: PetShelterDispatch;
    startSavingPets: Function;
};

declare type ShelterLocation = {
    city: string;
    id: number;
};

declare type Pet = {
    name: string;
    id: number;
    from: string;
    type: PetType;
    locationId: number;
    action?: PetAction;
};

declare type PetInquiry = {
    name: string;
    email: string;
    zip: number;
}

declare type PetShelterState = {
    locations: Array<ShelterLocation>;
    pets: Array<Pet>;
    selectedLocationId: number;
    selectedPetId: number;
};

declare type ActionSelectLocation = {
    type: 'LOCATION_SELECTED';
    id: number;
}

declare type ActionShowPet = {
    type: 'SHOW_PET';
    id: number;
}

declare type ActionHidePet = {
    type: 'HIDE_PET';
}

declare type ActionSendInquiry = {
    type: 'SEND_INQUIRY';
    action: PetAction;
    id: number;
    inquiry: PetInquiry;
}

declare type ActionInit = {
    type: '@@bark';
}

declare type PetShelterActions = ActionSelectLocation | ActionShowPet | ActionInit | ActionHidePet | ActionSendInquiry;

declare type ListingItems = [Pet] | [ShelterLocation];

declare type PetModalProps = {
    pet: Pet;
    dispatch: PetShelterDispatch;
}
