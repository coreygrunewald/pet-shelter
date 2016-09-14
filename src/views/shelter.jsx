// @flow

const React = require('react');
const ReactDOM = require('react-dom');
const PetModal = require('./modal.jsx');

const {
    select,
    option,
    ul,
    li
} = React.DOM;

const Action = ({ action = 'adopt' }: { action?: PetAction }) => {
    let cta = null;

    switch (action) {
        case 'adopt':
            cta = 'Adopt Me!';
            break;
        case 'foster':
            cta = 'Foster Me!';
            break;
    }

    return cta
         ? <span className='pet-cta'>{ cta }</span>
         : null;
};

const petView = ({
    pet,
    location,
    onClick,
    selectedLocationId
}: {
    pet: Pet,
    location: ShelterLocation,
    onClick: Function,
    selectedLocationId: number
}) => (
    <div className='pet-shelter-view'
         onClick={onClick}>
        <div className='pet-profile-image' style={{ backgroundImage: 'url(/images/pet-' + pet.id + '.jpg)' }}/>
        <div className='pet-status'>
            <div className='pet-name'>{ pet.name }</div>
            <div className='pet-action'>
                <Action action={pet.action}/>
            </div>
            <div className='pet-from'>
                <span className='pet-from-label'>From: </span>
                { pet.from }
            </div>
        </div>
        {
            location.id !== selectedLocationId &&
            <div className='pet-location'>
                Located in: { location.city }
            </div>
        }
    </div>
)

const listing = ({
    items,
    ListEl,
    ListItemEl,
    ItemEl,
    listPropsSelector = () => {{}},
    listItemPropsSelector,
    itemPropsSelector = (item) => item
}: {
    items: ListingItems,
    ListEl: ReactClass<*>,
    ListItemEl: ReactClass<*>,
    ItemEl: ReactClass<*>,
    listPropsSelector?: Function,
    listItemPropsSelector: (x: Object) => { key: string | number },
    itemPropsSelector?: Function
}) =>
    ListEl(
        listPropsSelector(),
        items.map((item, idx) =>
            ListItemEl(
                listItemPropsSelector(item),
                ItemEl(itemPropsSelector(item))
            )
        )
    );

function shelter({
    shelter,
    dispatch
}: {
    shelter: PetShelterState,
    dispatch: PetShelterDispatch
}) {
    return (
        <section className='pet-shelter'>
            <div className='pet-shelter-header'>
                <h1 className='pet-shelter-headline'>Rigby's Pet Shelters</h1>
                <div className='pet-shelter-locations-select pet-shelter-listing'>
                    {
                        listing({
                            items: shelter.locations,
                            ListEl: select,
                            ListItemEl: (props, children) => option(props, children),
                            ItemEl: ({ city }) => city,
                            listPropsSelector: () => {
                                return {
                                    value: shelter.selectedLocationId,
                                    onChange: (ev: Event) => {
                                        dispatch({
                                            type: 'LOCATION_SELECTED',
                                            id: ev.target.value ? parseInt(ev.target.value) : -1
                                        });
                                    }
                                };
                            },
                            listItemPropsSelector: ({ id }) => {
                                return {
                                    value: id,
                                    key: id
                                };
                            }
                        })
                    }
                </div>
            </div>
            <div className='pet-shelter-container'>
                <div className='pet-shelter-pets-listing pet-shelter-listing'>
                    {
                        listing({
                            items: shelter.pets.filter((pet: Pet) => {
                                if (shelter.selectedLocationId === -1) {
                                    return true;
                                }

                                return pet.locationId === shelter.selectedLocationId;
                            }),
                            ListEl: (props, children) =>
                                ul({ className: 'pet-shelter-list' }, children),
                            ListItemEl: li,
                            listItemPropsSelector: ({ id }) => {
                                return { key: id };
                            },
                            ItemEl: petView,
                            itemPropsSelector: (pet) => {
                                return {
                                    pet,
                                    location: shelter.locations.find(loc => loc.id === pet.locationId),
                                    selectedLocationId: shelter.selectedLocationId,
                                    onClick: () => {
                                        dispatch({
                                            type: 'SHOW_PET',
                                            id: pet.id
                                        })
                                    }
                                };
                            }
                        })
                    }
                </div>
            </div>
            { petModal(shelter, dispatch) }
        </section>
    );
};

const petModal = (shelter: PetShelterState, dispatch) => {
    const selectedPet = shelter.pets.find(pet => pet.id === shelter.selectedPetId);
    return selectedPet && (
        <div className='pet-shelter-modal-container'>
            <button
                className='pet-shelter-modal-close-btn'
                type='button'
                onClick={() => { dispatch({ type: 'HIDE_PET' }) }}
            >
                ×
            </button>
            { PetModal(
                selectedPet,
                dispatch
              )
            }
        </div>
    );
}

module.exports = shelter;
