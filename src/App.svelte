<script>
	import TableTennisSolid from "./TableTennisSolid.svelte";
	import players from "./playersData";

	export let name;

	let view = "scoreboard";
	let username = "";
	let alias = "";

	let server = "";
	let receiver = "";
	let serverPoints = "";
	let receiverPoints = "";

	let numOfGames = 1;
	let games = [];
	const addServerScore = (i, e) => {
		if(games[i]) {
			let game = games[i];
			game.serverScore = e;
		} else {
			let game = {
				server: server,
				receiver: receiver,
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
				server: server,
				receiver: receiver,
				receiverScore: e
			};
			games.push(game)
		}
	}
</script>

<main>
	<h1>Ping Pong</h1>
	<div class="flex-col align-center justify-center w-70 rounded">
		<div class="flex w-full align-center justify-center padding-b-2">
			<span on:click={() => view = "scoreboard"} class:selected={view === "scoreboard"} class:color-red={view !== "scoreboard"} class="flex flex-1 h-2 justify-center align-center cursor-pointer">Scoreboard</span>
			<span on:click={() => view = "player"} class:selected={view === "player"} class:color-red={view !== "player"} class="flex flex-1 h-2 justify-center align-center cursor-pointer">Add new player</span>
			<span on:click={() => view = "match"} class:selected={view === "match"} class:color-red={view !== "match"} class="flex flex-1 h-2 justify-center align-center cursor-pointer">Register match</span>
		</div>
		{#if view === "scoreboard"}
			<div class="flex w-full align-center justify-center padding-t-0-5 padding-b-0-5">
				<span class="flex-1 color-red"><strong>Player</strong></span>
				<span class="flex-1 color-red"><strong>Elo</strong></span>
				<span class="flex-1 color-red"><strong>Rank/title</strong></span>
			</div>
			<div class="w-full rounded border">
				{#each players.sort((a, b) => b.elo - a.elo) as player, i}
					<div class="flex w-full align-center justify-center">
						<span class:rounded-top-left={i === 0} class:rounded-bottom-left={i === (players.length - 1)} class:border-bottom={i !== (players.length - 1)}  class="flex justify-start align-start bg-white padding-0-5 flex-1"><strong>{player.alias}</strong> ({player.username})</span>
						<span class:border-bottom={i !== (players.length - 1)} class="flex justify-start align-start bg-white padding-0-5 flex-1 border-left">{player.elo}</span>
						<span class:rounded-top-right={i === 0} class:rounded-bottom-right={i === (players.length - 1)} class:border-bottom={i !== (players.length - 1)} class="flex justify-start align-start bg-white padding-0-5 flex-1 border-left"><strong>{player.title}</strong></span>
					</div>
				{/each}
			</div>
		{/if}
		{#if view === "player"}
			<div class="flex w-full align-center justify-center padding-t-0-5 padding-b-0-5">
				<input placeholder="Username" class="h-2 flex-1 flex align-center justify-center bg-black color-red rounded border" bind:value={username}>
				<input placeholder="Alias" class="h-2 flex-1 flex align-center justify-center margin-l-0-5 bg-black color-red rounded border" bind:value={alias}>
				<button class="h-2 flex align-center justify-center bg-white color-red rounded border margin-l-0-5">SMASH! <TableTennisSolid /></button>
			</div>
		{/if}
		{#if view === "match"}
			<div class="flex w-full align-center justify-center padding-t-0-5 padding-b-0-5">
				<input placeholder="Server" class="h-2 flex-1 flex align-center justify-center bg-black color-red rounded border" bind:value={server}>
				<input placeholder="Receiver" class="h-2 flex-1 flex align-center justify-center margin-l-0-5 bg-black color-red rounded border" bind:value={receiver}>
			</div>
			<div class="flex w-full align-center justify-start">
				<span class="h-2 color-red">Number of games in match: </span>
				<select bind:value={numOfGames} class="bg-white color-red margin-l-0-5">
					<option value={1}>1</option>
					<option value={2}>2</option>
					<option value={3}>3</option>
					<option value={4}>4</option>
					<option value={5}>5</option>
				</select>
			</div>
				{#each Array(numOfGames) as game, i}
				<div class="flex w-full align-center justify-center">
					<span class="h-2 color-red flex-0-5 flex"><strong>Game {i + 1}:</strong></span>
					<input on:change={(e) => addServerScore(i, e.target.value)} placeholder="Points server" class="h-2 flex-1 flex align-center justify-center bg-black color-red rounded border">
					<input on:change={(e) => addReceiverScore(i, e.target.value)} placeholder="Points receiver" class="h-2 flex-1 flex align-center justify-center margin-l-0-5 bg-black color-red rounded border">
				</div>
				{/each}
			<div class="flex w-full align-end justify-end">
				<button on:click={() => console.log(games)} class="h-2 flex align-center justify-center bg-white color-red rounded border margin-l-0-5">SMASH! <TableTennisSolid /></button>
			</div>
		{/if}
	</div>
</main>

<style>
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