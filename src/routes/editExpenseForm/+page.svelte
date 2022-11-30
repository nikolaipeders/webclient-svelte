<script>
	import { page } from '$app/stores';
	import toast, { Toaster } from 'svelte-french-toast';

	var name = '' + $page.url.searchParams.get('name');
	var description = '' + $page.url.searchParams.get('des');
	var amount = '' + $page.url.searchParams.get('amount');
	var reference = '' + $page.url.searchParams.get('reference');
	var result = null;

	function goBack() {
		history.back();
	}

	async function goHome() {
		window.location.href = '/';
	}

	async function postGroup() {
		const res = await fetch('https://api-wan-kenobi.ovh/api/Expense/EditAnExpense', {
			method: 'PUT',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				expenseId: reference,
				name: name,
				description: description,
				amount: amount,
				userId: '7'
			})
		});

		toast.success('Saved changes', {
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
	<h1>Edit an expense</h1>
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
	<div>
		<input
			type="number"
			min="1"
			step="any"
			placeholder="Amount"
			id="amount"
			class="form-input"
			bind:value={amount}
			required
		/>
		<label for="amount" class="form-label">Amount</label>
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
		border-radius: 40px;
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
		border-radius: 45px;
		box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease 0s;
		cursor: pointer;
		outline: none;
	}

	.action-button:hover {
		background-color: #147efb;
		box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
		color: #fff;
		transform: scale(1.05);
		/* transform: translateY(-7px); */
	}
</style>
