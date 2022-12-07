<script>
	// @ts-nocheck
	import { storedUser } from '$lib/stores/user';
	import toast, { Toaster } from 'svelte-french-toast';

	export let visible = false;

	let amount;

	function handleShowDialog() {
		visible = true;
	}

	function handleCloseDialog() {
		visible = false;
	}

	async function acceptInvite() {
		// const res = await fetch('https://api-wan-kenobi.ovh/api/ShareGroup/PayIntoGroupPool', {
		// 	method: 'POST',
		// 	headers: { 'Content-type': 'application/json' },
		// 	body: JSON.stringify({
		// 		name: name,
		// 		description: description,
		// 		userID: $storedUser.id,
		// 		isPublic: isPublic
		// 	})
		// });

		// const json = await res.json();
		// result = JSON.stringify(json);

		toast.success('Payment registered', {
			position: 'bottom-center'
		});

		setTimeout(function () {
			visible = false;
		}, 1000);
	}

	async function deleteInvite() {
		// const res = await fetch('https://api-wan-kenobi.ovh/api/ShareGroup/PayIntoGroupPool', {
		// 	method: 'POST',
		// 	headers: { 'Content-type': 'application/json' },
		// 	body: JSON.stringify({
		// 		name: name,
		// 		description: description,
		// 		userID: $storedUser.id,
		// 		isPublic: isPublic
		// 	})
		// });

		// const json = await res.json();
		// result = JSON.stringify(json);

		toast.success('Payment registered', {
			position: 'bottom-center'
		});

		setTimeout(function () {
			visible = false;
		}, 1000);
	}
</script>

{#if visible}
	<Toaster />
	<div class="dialog">
		<div class="dialog-content">
			<h1>Enter amount</h1>
			<div>
				<input
					type="number"
					placeholder="Amount"
					id="amount"
					class="form-input"
					bind:value={amount}
					required
				/>
				<label for="amount" class="form-label">Amount</label>
			</div>

			<div class="buttons-row">
				<button class="action-button" on:click={handleCloseDialog}>Cancel</button>
				<button class="action-button" on:click={postPayment}>Confirm</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.dialog {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dialog-content {
		background-color: white;
		padding: 20px;
		border-radius: 5px;
	}

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
		transform: translateY(-3rem);
	}

	.form-label {
		font-size: 1rem;
		margin-left: 2rem;
		margin-top: 0.7rem;
		display: block;
		transition: all 0.3s;
		transform: translateY(-75px);
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
