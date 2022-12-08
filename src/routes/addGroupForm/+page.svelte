<script>
	import toast, { Toaster } from 'svelte-french-toast';
	import { storedUser } from '$lib/stores/user';
	import { onMount } from 'svelte';

	var name = '';
	var description = '';
	var isPublic = true;
	var result = null;

	onMount(async () => {
		if ($storedUser.token.includes('Empty')) {
			window.location.href = '/loginForm';
		}
	});

	function goBack() {
		history.back();
	}

	async function postGroup() {
		const res = await fetch('https://api-wan-kenobi.ovh/api/ShareGroup/CreateGroup', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				name: name,
				description: description,
				userID: $storedUser.id,
				isPublic: isPublic
			})
		});

		toast.success('Successfully added group', {
			position: 'bottom-center'
		});

		const json = await res.json();
		result = JSON.stringify(json);

		goBack();
	}
</script>

<svelte:head>
	<title>Form</title>
	<meta name="description" content="About this app" />
</svelte:head>

<Toaster />

<div class="text-column">
	<h1>Add a group</h1>
	<div>
		<input type="text" placeholder="Name" id="name" class="form-input" bind:value={name} required />
		<label for="name" class="form-label">Name</label>
	</div>
	<div>
		<input
			type="text"
			placeholder="Description"
			id="description"
			class="form-input"
			bind:value={description}
			required
		/>
		<label for="description" class="form-label">Description</label>
	</div>
	<div class="switch-box">
		Public &nbsp
		<input type="checkbox" class="switch" bind:checked={isPublic} />
	</div>
	<div class="buttons-row">
		<button class="action-button" on:click={goBack}>Go back</button>
		<button class="action-button" on:click={postGroup}>Confirm </button>
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
		/* transform: translateY(-7px); */
	}

	.switch-box {
		display: flex;
		max-width: 200px;
		min-width: 200px;
		justify-content: center;
		align-items: center;
		margin: 0 auto;
		margin-bottom: 10px;
	}

	input[type='checkbox'].switch {
		font-size: 15px;
		appearance: none;
		width: 3.5em;
		height: 1.5em;
		background: #ddd;
		border-radius: 3em;
		position: relative;
		cursor: pointer;
		outline: none;
		transition: all 0.2s ease-in-out;
	}

	input[type='checkbox'].switch:checked {
		background: #147efb;
	}

	input[type='checkbox'].switch:after {
		position: absolute;
		content: '';
		width: 1.5em;
		height: 1.5em;
		border-radius: 50%;
		background: #fff;
		box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.3);
		transform: scale(0.7);
		left: 0;
		transition: all 0.2s ease-in-out;
	}

	input[type='checkbox'].switch:checked:after {
		left: calc(100% - 1.5em);
	}
</style>
