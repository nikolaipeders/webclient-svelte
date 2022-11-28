<script>
	var name = '';
	var description = '';
	var isPublic = true;
	var result = null;

	function goBack() {
		history.back();
	}

	async function goHome() {
		window.location.href = '/';
	}

	async function postGroup() {
		const res = await fetch('https://api-wan-kenobi.ovh/api/UserGroup/CreateGroup', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				name: name,
				description: description,
				userID: '1',
				isPublic: isPublic
			})
		});

		const json = await res.json();
		result = JSON.stringify(json);

		await goHome();
	}
</script>

<svelte:head>
	<title>Form</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>Add a group</h1>
	<form class="search-form">
		<input bind:value={name} placeholder="Name" class="search-input" />
	</form>
	<form class="search-form">
		<input bind:value={description} placeholder="Description" class="search-input" />
	</form>
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
	.search-form {
		position: relative;
		margin-top: 20px;
		top: 50%;
		left: 50%;
		width: 350px;
		height: 40px;
		border-radius: 40px;
		box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
		transform: translate(-50%, -50%);
		background: #fff;
		transition: all 0.3s ease;
	}

	.search-form:active {
		box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
	}

	.search-input {
		position: absolute;
		top: 10px;
		left: 38px;
		font-size: 14px;
		background: none;
		color: #5a6674;
		width: 280px;
		height: 20px;
		border: none;
		appearance: none;
		outline: none;
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
		border-radius: 45px;
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
