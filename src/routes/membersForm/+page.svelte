<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	var reference = '' + $page.url.searchParams.get('reference');
	var result = null;
	let searchTerm = '';
	let users = new Array();

	$: filteredList = users.filter((user) =>
		user.firstName.toUpperCase().includes(searchTerm.length > 0 ? searchTerm.toUpperCase() : 'xyz')
	);

	onMount(async () => {
		fetch('https://api-wan-kenobi.ovh/api/ShareUser/GetAllUsers')
			.then((response) => response.json())
			.then((user) => {
				users = user;
			});
	});

	async function goHome() {
		window.location.href = '/';
	}

	function goBack() {
		history.back();
	}

	async function addMember(user) {
		const res = await fetch('https://api-wan-kenobi.ovh/api/UserGroup/JoinExistingGroup', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				groupID: reference,
				userId: user
			})
		});

		toast.success('Added member', {
			position: 'bottom-center'
		});

		const json = await res.json();
		result = JSON.stringify(json);

		//await goHome()
	}
</script>

<svelte:head>
	<title>Members</title>
	<meta name="description" content="About this app" />
</svelte:head>

<Toaster />

<div class="text-column">
	<h1>Add member</h1>
	<div>
		<input
			type="text"
			placeholder="Search all users"
			id="search"
			class="form-input"
			bind:value={searchTerm}
			required
		/>
		<label for="search" class="form-label">Search</label>
	</div>
	<div>
		<div class="chip-row">
			{#each filteredList as user}
				<button class="chip" on:click={addMember(user.userId)}>
					<span>{user.firstName}</span>
				</button>
			{/each}
		</div>
	</div>
	<div class="buttons-row">
		<button class="action-button" on:click={goHome}>Go back</button>
	</div>
</div>

<style>
	.form-input:active {
		box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
	}

	.form-input {
		color: #333;
		font-size: 1rem;
		margin: 0 auto;
		margin-bottom: 0px;
		width: 350px;
		height: 20px;
		padding: 0.75rem 2rem;
		border-radius: 10px;
		background-color: white;
		box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
		border: none;
		outline: none;
		transition: all 0.3s;
	}

	.form-input:placeholder-shown + .form-label {
		opacity: 0;
		visibility: hidden;
		transform: translateY(-3em);
	}

	.form-label {
		font-size: 1rem;
		margin-left: 2rem;
		margin-top: 0.7rem;
		display: block;
		transition: all 0.3s;
		transform: translateY(-75px);
	}

	input:not(:placeholder-shown):invalid {
		background-color: #ffe9ec;
	}

	.chip-row {
		margin-bottom: 15px;
		width: 350px;
	}

	.chip {
		padding: 0 10px;
		margin: 2px;
		height: 25px;
		font-size: 12px;
		font-weight: 600;
		line-height: 25px;
		border-radius: 25px;
		border-width: 0px;
		background-color: #147efb;
		color: #f5f5f4;
		transition: width 0.5s ease-in-out, background-color 0.2s ease-in-out;
	}

	.chip span {
		min-width: 90px;
	}

	.chip:hover span {
		display: none;
	}

	.chip:hover {
		background-color: #53d769;
		cursor: pointer;
		min-width: 90px;
	}

	.chip:hover:before {
		content: 'Add';
	}

	.buttons-row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.action-button {
		display: inline-block;
		margin: 5px;
		padding: 1em 3em;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 2.5px;
		font-weight: 500;
		color: #000;
		background-color: #fff;
		border: none;
		border-radius: 10px;
		box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease 0s;
		cursor: pointer;
		outline: none;
	}

	.action-button:hover {
		background-color: #147efb;
		box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.25);
		color: #fff;
		transform: scale(1.05);
	}
</style>
