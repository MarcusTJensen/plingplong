<script>
	import TableTennisSolid from "./TableTennisSolid.svelte";
	import players from "./playersData";
	import { onMount } from "svelte";
	import Notifications from 'svelte-notifications'
	import CustomNotification from './CustomNotification.svelte';
	import { username, alias } from './stores';

	let view = "scoreboard";
	let server;
	let receiver;
	let registered = false;

	let numOfGames = 0;
	let games = [];

	onMount( async() => {
		await fetch('http://localhost:3000/user')
		.then(res => console.log(res.json))
	});

	const addServerScore = (i, e) => {
		if(games[i]) {
			let game = games[i];
			game.serverScore = e;
		} else {
			let game = {
				server: i % 2 === 0 ? server : receiver,
				receiver: i % 2 === 0 ? receiver : server,
				serverScore: e
			};
			games.push(game)
		}
	}

	const addReceiverScore = (i, e) => {
		if(games[i]) {
			let game = games[i];
			game.receiverScore = e;
		} else {
			let game = {
				server: i % 2 === 0 ? server : receiver,
				receiver: i % 2 === 0 ? receiver : server,
				receiverScore: e
			};
			games.push(game)
		}
	}

	const postMatch = async() => {
		registered = true;
		setTimeout(() => {
			server = null;
			receiver = null;
			numOfGames = 0;
			games = [];
			registered = false;
			view = 'scoreboard';
		}, 1000);
	}

	const removeGame = () => {
		numOfGames = numOfGames - 1;
		games.pop();
	}

	const addGame = () => {
		numOfGames = numOfGames + 1;
		games.push({server: games.length % 2 === 0 ? receiver : server, receiver: games.length % 2 === 0 ? server : receiver});
	}

	let src = '/img/Jan-Ove-Waldner.png';
</script>

<Notifications>
<main>
	<div class="flex w-full align-center justify-center margin-b-3">
		<img class="jan-ove margin-r-0-5" {src} alt="Jan Ove">
		<h1 class="font-bold">Ping Pong</h1>
		<img class="jan-ove margin-l-0-5" {src} alt="Jan Ove" style="transform: scaleX(-1)">
	</div>
	<div class="flex-col align-center justify-center w-70 rounded">
		<div class="flex w-full align-center justify-center padding-b-2">
			<span on:click={() => view = "scoreboard"} class:selected={view === "scoreboard"} class:color-yellow={view !== "scoreboard"} class="flex flex-1 h-12 justify-center align-center cursor-pointer">Resultattavle</span>
			<span on:click={() => view = "player"} class:selected={view === "player"} class:color-yellow={view !== "player"} class="flex flex-1 h-12 justify-center align-center cursor-pointer">Legg til spiller</span>
			<span on:click={() => view = "match"} class:selected={view === "match"} class:color-yellow={view !== "match"} class="flex flex-1 h-12 justify-center align-center cursor-pointer">Registrer kamp</span>
		</div>
		{#if view === "scoreboard"}
			<div class="flex w-full align-center justify-center padding-t-0-5 padding-b-0-5">
				<span class="flex-1 color-yellow"><strong>Spiller</strong></span>
				<span class="flex-1 color-yellow"><strong>Elo</strong></span>
				<span class="flex-1 color-yellow"><strong>Utmerkelser</strong></span>
			</div>
			<div class="w-full rounded border-2 border-yellow">
				{#each players.sort((a, b) => b.elo - a.elo) as player, i}
					<div class="flex w-full align-center justify-center">
						<span class:rounded-top-left={i === 0} class:rounded-bottom-left={i === (players.length - 1)} 
							class:border-b-2={i !== (players.length - 1)}  
							class="flex justify-start color-black align-start bg-white padding-0-5 flex-1 border-yellow">
							<strong>{player.alias}</strong> ({player.username})
						</span>
						<span class:border-b-2={i !== (players.length - 1)} 
							class="flex justify-start color-black align-start bg-white padding-0-5 flex-1 border-l-2 border-yellow">
							{player.elo}
						</span>
						<span class:rounded-top-right={i === 0} class:rounded-bottom-right={i === (players.length - 1)} 
							class:border-b-2={i !== (players.length - 1)} 
							class="flex justify-start color-black align-start bg-white padding-0-5 flex-1 border-l-2 border-yellow">
							{player.title}
						</span>
					</div>
				{/each}
			</div>
		{/if}
		{#if view === "player"}
			<div class="flex w-full content-center justify-center padding-t-0-5 padding-b-0-5">
				<input placeholder="Brukernavn" class="h-8 flex-1 flex content-center justify-center bg-blue color-white rounded border-2 border-yellow" bind:value={$username}>
				<input placeholder="Alias" class="h-8 flex-1 flex content-center justify-center ml-2 bg-blue color-white rounded border-2 border-yellow" bind:value={$alias}>
				<CustomNotification />
			</div>
		{/if}
		{#if view === "match"}
			<div class="flex w-full align-center justify-center padding-t-0-5 padding-b-0-5">
				<input placeholder="Server" class="h-8 flex-1 flex content-center justify-center bg-blue color-white rounded border-2 border-yellow" bind:value={server}>
				<input placeholder="Mottaker" class="h-8 flex-1 flex content-center justify-center ml-2 bg-blue color-white rounded border-2 border-yellow" bind:value={receiver}>
			</div>
				{#each Array(numOfGames) as game, i}
				<div class="flex w-full align-center justify-center">
					<span class="h-8 color-yellow flex-0-5 flex"><strong>Spill {i + 1}:</strong></span>
					<input on:change={(e) => addServerScore(i, e.target.value)} 
						placeholder={`Poeng ${server ? i % 2 === 0 ? server : receiver : 'server'}`} 
						class="h-8 flex-1 flex align-center justify-center bg-blue color-white rounded border">
					<input on:change={(e) => addReceiverScore(i, e.target.value)} 
						placeholder={`Poeng ${receiver ? i % 2 === 0 ? receiver : server : 'mottaker'}`} 
						class="h-8 flex-1 flex align-center justify-center margin-l-0-5 bg-blue color-white rounded border">
				</div>
				{/each}
			<div class="flex w-full align-center justify-start">
				<button on:click={removeGame} disabled={numOfGames <= 1}>-</button>
				<button on:click={addGame} disabled={numOfGames === 5 || (!receiver || !server)}>+</button>
			</div>
			<div class="flex w-full align-end justify-end">
				<button on:click={postMatch} class="h-2 flex align-center justify-center bg-white color-black rounded border-black margin-l-0-5">SMASH! <TableTennisSolid /></button>
			</div>
			{#if registered}
				<h2 class="color-green"><strong>Spiller registrert :D</strong></h2>
			{/if}
		{/if}
	</div>
</main>
</Notifications>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	h1 {
		color: var(--red);
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>