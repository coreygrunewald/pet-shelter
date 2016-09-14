// @flow

const React = require('react');
const ReactDOM = require('react-dom');
const reducer = require('./reducer');

function PetShelter(initialState: PetShelterState): PetShelterApp {
    let state = initialState || {};
    const subscriptions = [];

    function disposable(fn: Function) {
        return () => {
            subscriptions.filter(listener => listener !== fn);
        };
    }

    function getState(): PetShelterState {
        return state;
    }

    function subscribe(fn): Function  {
        subscriptions.push(fn);
        return disposable(fn);
    }

    function dispatch(action: PetShelterActions)  {
        console.log('action', action.type, action);
        state = reducer(state, action);
        subscriptions.forEach(fn => fn());
    }

    function startSavingPets(View: Object, element: Object) {
        function render(): void {
            ReactDOM.render(
                <View shelter={getState()} dispatch={dispatch}/>,
                element
            );
        }

        document.addEventListener('DOMContentLoaded', function(ev: Object): void {
            subscribe(render);
            render();
        });
    }

    dispatch({
        type: '@@bark'
    });

    return {
        getState,
        subscribe,
        dispatch,
        startSavingPets
    };
}

module.exports = PetShelter;
