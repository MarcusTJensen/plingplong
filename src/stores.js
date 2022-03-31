import { writable } from "svelte/store";

const games = writable([]);
export const username = writable(null);
export const alias = writable(null);