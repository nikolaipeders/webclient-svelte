<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { storedUser } from '$lib/stores/user';

	const formatter = new Intl.NumberFormat('da-DK', {
		style: 'currency',
		currency: 'DKK'
	});

	var reference = '' + $page.url.searchParams.get('reference');
	var name = '' + $page.url.searchParams.get('name');
	var distributions = new Array();

	function goBack() {
		window.history.back();
	}

	function pay() {}

	onMount(async () => {
		fetch('https://api-wan-kenobi.ovh/api/UserGroup/MoneyOwedByEveryoneInGroupID/' + reference)
			.then((response) => response.json())
			.then((data) => {
				distributions = data;
			});
	});
</script>

<div in:fade class="text-column">
	<div class="cards">
		<div class="card card-1">
			<div>
				<div class="card-title-row">
					<div class="card-title">{name}</div>
				</div>
				<h3 class="card-subtitle">Details</h3>
			</div>
			<div class="chip-row" />
			{#if distributions.length > 0}
				<ul class="distribution-list">
					{#each distributions as distribution}
						<details>
							<summary>
								{distribution.firstName}
							</summary>
							<in class="distribution-item">
								Expenses
								<in>{formatter.format(distribution.amountPaidDuringGroup)}</in>
							</in>
							<in class="distribution-item">
								{#if distribution.finalAmountOwed >= 0}
									Owes
								{/if}
								{#if distribution.finalAmountOwed < 0}
									Needs
								{/if}
								<in>{formatter.format(distribution.finalAmountOwed)}</in>
							</in>
							<in class="distribution-item">
								Has paid
								<in>{formatter.format(distribution.amountAlreadyPaid)}</in>
							</in>
						</details>
					{/each}
				</ul>
			{/if}

			<div class="action-buttons-row">
				<div class="burger-drop">
					<div class="nav">
						<input type="checkbox" />
						<span />
						<span />
						<div class="menu">
							<li><button>Export to PDF</button></li>
							<li><button>Conclude</button></li>
							<li><button>Pay my share</button></li>
							<li><button on:click={goBack}>Go back</button></li>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.cards {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.card {
		margin: 15px;
		padding: 20px;
		width: 600px;
		min-height: 200px;
		display: grid;
		grid-template-rows: auto auto auto auto;
		grid-template-columns: 2fr 1fr;
		border-radius: 10px;
		background: #ffffff;
		box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
		transition: all 0.2s;
	}

	.card:hover {
		box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
		transform: scale(1.01);
	}

	.card-title-row {
		grid-column: 1;
		grid-row: 1/4;
		column-span: all;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.card-title {
		font-weight: 400;
		font-size: 1.5rem;
		color: #242526;
	}

	.card-subtitle {
		grid-column: 1;
		column-span: all;
		grid-row: 2/4;
		color: rgba(0, 0, 0, 0.25);
		margin-top: 0px;
		letter-spacing: 0.75px;
		font-weight: 400;
	}

	details summary {
		width: 100%;
		padding: 0.5rem 0;
		border-top: 1px solid black;
		position: relative;
		cursor: pointer;
		font-size: 1.25rem;
		font-weight: 300;
		list-style: none;
	}

	details summary:after {
		content: '+';
		color: black;
		position: absolute;
		font-size: 1.75rem;
		line-height: 0;
		margin-top: 0.75rem;
		right: 0;
		font-weight: 200;
		transform-origin: center;
		transition: 200ms linear;
	}
	details[open] summary:after {
		transform: rotate(45deg);
		font-size: 2rem;
	}
	details summary {
		outline: 0;
	}

	.distribution-list {
		grid-column: 1/2;
		column-span: all;
		grid-row: 3/4;
		width: 600px;
		padding: 0;
	}

	.distribution-item {
		margin-left: 5px;
		margin-right: 5px;
		margin-bottom: 15px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		position: relative;
		text-decoration: none;
		font-weight: 500;
		letter-spacing: 0.5px;
		color: #242526;
	}

	.action-buttons-row {
		grid-column: 1/5;
		grid-row: 4/4;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 20px;
		margin-left: 5px;
		margin-right: 5px;
	}

	.burger-drop,
	.nav,
	.menu {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: auto;
	}

	.nav {
		position: relative;
		background-color: #fff;
		padding: 10px;
		transition: 0.5s;
		border-radius: 50px;
		overflow: hidden;
		box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
	}

	.menu {
		margin: 0;
		padding: 0;
		width: 0;
		overflow: hidden;
		transition: 0.5s;
	}

	.nav input:checked ~ .menu {
		width: 500px;
	}

	.menu li {
		list-style: none;
		white-space: nowrap;
		font-size: 14px;
		margin: 0 10px;
		margin-top: 0px;
	}

	.menu li button {
		text-decoration: none;
		color: #666;
		background-color: transparent;
		border-width: 0px;
		text-transform: uppercase;
		vertical-align: middle;
		letter-spacing: 0.5px;
		font-weight: 600;
		transition: 0.5s;
	}

	.menu li button:hover {
		color: #147efb;
		cursor: pointer;
	}

	.nav input {
		width: 20px;
		height: 20px;
		cursor: pointer;
		opacity: 0;
	}

	.nav span {
		position: absolute;
		left: 15px;
		width: 17px;
		height: 2px;
		border-radius: 50px;
		background-color: #666;
		pointer-events: none;
		transition: 0.5s;
	}

	.nav input:checked ~ span {
		background-color: #fc3c44;
	}

	.nav span:nth-child(2) {
		transform: translateY(-4px);
	}

	.nav input:checked ~ span:nth-child(2) {
		transform: translateY(0) rotate(-45deg);
	}
	.nav span:nth-child(3) {
		transform: translateY(4px);
	}

	.nav input:checked ~ span:nth-child(3) {
		transform: translateY(0) rotate(45deg);
	}
</style>
