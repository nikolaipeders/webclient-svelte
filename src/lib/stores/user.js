// @ts-nocheck
import { browser } from '$app/environment';
import { writable } from 'svelte/store';

// create an object with default values
let user = {
    id: 0,
    username: "Empty",
    token: "Empty"
};

// ensure this only runs in the browser
if (browser) {
    // if the object already exists in localStorage, get it
    // otherwise, use our default values
    user = JSON.parse(localStorage.getItem('user')) || user;
}

// export the store for usage elsewhere
export const storedUser = writable(user);

if (browser) {
    // update localStorage values whenever the store values change
    storedUser.subscribe((value) =>
        // localStorage only allows strings
        localStorage.setItem('user', JSON.stringify(value))
    );
}