<script>
    import { getNotificationsContext } from 'svelte-notifications';
    import TableTennisSolid from './TableTennisSolid.svelte';
    import { username, alias } from './stores';
  
    const { addNotification } = getNotificationsContext();
    const createUser = async() => {
		const player = {username: $username, alias: $alias}
		await fetch('http://localhost:3000/player', {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(player)
		}).then(res => {
			if(res.status === 200) {
				$username = null;
				$alias = null;
				addNotification({
					text: 'Suksess!',
					position: 'top-right',
					type: 'success'
				})
			}
		});
	}
</script>

  <button on:click={createUser} class="h-2 flex align-center justify-center bg-white 
    color-black rounded border-black margin-l-0-5">
    SMASH! <TableTennisSolid />
</button>