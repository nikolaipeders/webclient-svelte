<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { storedUser } from '$lib/stores/user';
	import toast, { Toaster } from 'svelte-french-toast';

	const formatter = new Intl.NumberFormat('da-DK', {
		style: 'currency',
		currency: 'DKK'
	});

	let groups = new Array();
	let expenses = new Array();
	let userGroups = new Array();
	let users = new Array();
	let searchTerm = '';

	async function removeMember(group, user) {
		const res = await fetch('https://api-wan-kenobi.ovh/api/UserGroup/RemoveMemberFromGroup', {
			method: 'DELETE',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				groupId: group,
				userId: user
			})
		});

		toast.success('Member removed from group', {
			position: 'bottom-center'
		});
	}

	async function deleteExpense(id) {
		const res = await fetch('https://api-wan-kenobi.ovh/api/Expense/DeleteExpenditure/' + id, {
			method: 'DELETE',
			headers: { 'Content-type': 'application/json' }
		});

		toast.success('Expense deleted', {
			position: 'bottom-center'
		});

		const json = await res.json();
		result = JSON.stringify(json);
	}

	function handleSort(event) {
		console.log('works');
		const selectedValue = event.target.value;

		// Create a copy of the groups array
		let sortedGroups = groups.slice();

		switch (selectedValue) {
			case 'recent':
				break;
			case 'alphabet':
				// Sort the copy of the array
				sortedGroups.sort(function (a, b) {
					if (a.name > b.name) {
						return 1;
					} else if (a.name < b.name) {
						return -1;
					} else {
						return 0;
					}
				});
				break;
		}

		// Use the sorted copy of the array instead of the original array
		filteredGroups = sortedGroups;
	}

	$: fetch('https://api-wan-kenobi.ovh/api/UserGroup/GetAllUserGroups')
		.then((response) => response.json())
		.then((userGroup) => {
			userGroups = userGroup;
			userGroups = userGroups;
		});

	$: fetch('https://api-wan-kenobi.ovh/api/Expense/GetAllExpenses')
		.then((response) => response.json())
		.then((expense) => {
			expenses = expense;
			expenses = expenses;
		});

	$: fetch('https://api-wan-kenobi.ovh/api/ShareUser/GetAllUsersGroups/' + $storedUser.id)
		.then((response) => response.json())
		.then((group) => {
			groups = group;
			groups = groups;
		});

	$: fetch('https://api-wan-kenobi.ovh/api/ShareUser/GetAllUsers/')
		.then((response) => response.json())
		.then((data) => {
			users = data;
			users = users;
		});

	$: filteredGroups = groups.filter((group) =>
		group.name ? group.name : ''.toLowerCase().includes(searchTerm.toLowerCase())
	);

	onMount(async () => {
		if ($storedUser.token.includes('Empty')) {
			window.location.href = '/loginForm';
		}
	});
</script>

<Toaster />

<div class="main-body">
	<div class="row">
		<input type="text" placeholder="Search" bind:value={searchTerm} class="search-field" />
		<select on:change={handleSort} class="sort-dropdown">
			<option value="recent">Sort by first added</option>
			<option value="alphabet">Sort alphabetically</option>
		</select>
	</div>

	{#each filteredGroups as group}
		<div class="cards">
			<div class="card">
				<div>
					<div class="card-title-row">
						<div class="card-title">{group.name}</div>
					</div>
					<h3 class="card-subtitle">{group.description}</h3>
				</div>
				<div class="chip-row">
					{#each userGroups
						.filter((data) => data.groupId == group.groupId)
						.map((data) => data.user) as member}
						<button class="chip" on:click={removeMember(group.groupId, member.userId)}>
							<span>{member.firstName}</span>
						</button>
					{/each}
				</div>
				<ul class="expenses-list">
					{#each expenses.filter((data) => data.groupId == group.groupId) as expense}
						<details>
							<summary>
								<span> &nbsp &nbsp </span>
								{expense.expenseName}
								<span>
									<in class="expense-price">{formatter.format(expense.amount)}</in>
								</span>
							</summary>
							<in class="expense-item">
								Added by: &nbsp {expense.firstName}
							</in>
							<in class="expense-item">
								Comment: &nbsp {expense.expenseDescription}
							</in>
							<div class="expenses-buttons-div">
								<a
									class="button-expense"
									href="/editExpenseForm?reference={expense.expenseId}&name={expense.expenseName}&des={expense.expenseDescription}&amount={expense.amount}"
									>Configure
								</a>
								<button class="button-del-expense" on:click={deleteExpense(expense.expenseId)}
									>Delete</button
								>
							</div>
						</details>
					{/each}
				</ul>
				<div class="action-buttons-row">
					<div class="burger-drop">
						<div class="nav">
							<input type="checkbox" />
							<span />
							<span />
							<div class="menu">
								<li><a href="/addExpenseForm?reference={group.groupId}">Add expense</a></li>
								<li>
									<a
										href="/editGroupForm?reference={group.groupId}&name={group.name}&des={group.description}&show={group.isPublic}"
										>Configure</a
									>
								</li>
								<li>
									<a href="/sendinvite?reference={group.groupId}&name={group.name}">Send invite</a>
								</li>
								<li>
									<a href="/details?reference={group.groupId}&name={group.name}">Details</a>
								</li>
							</div>
						</div>
					</div>
				</div>
				<div class="sum-row">
					<in class="sum">
						Total: {formatter.format(
							expenses
								.filter((data) => data.groupId == group.groupId)
								.map((data) => data.amount)
								.reduce((partialSum, a) => partialSum + a, 0)
						)}</in
					>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.main-body {
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-width: 600px;
		margin: 15px;
		margin-bottom: 0px;
	}

	.search-field {
		width: 100%;
		height: 18px;
		padding: 5px;
		border-radius: 5px;
		margin-right: 5px;
		border: 1px solid #ccc;
	}

	.search-field:active,
	.search-field:focus {
		outline: none;
	}

	.sort-dropdown {
		width: 250px;
		height: 30px;
		padding: 5px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

	.sort-dropdown:active,
	.sort-dropdown:focus {
		outline: none;
	}

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
		grid-template-rows: auto auto auto auto auto;
		grid-template-columns: 2fr 1fr;
		border-radius: 10px;
		background: #ffffff;
		box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
		transition: all 0.2s ease-in;
	}

	.card:hover {
		box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
	}

	.card:expanded {
		transition: min-height 0.25s ease-in;
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
		color: rgba(0, 0, 0, 0.25);
		margin-top: 0px;
		letter-spacing: 0.75px;
		font-weight: 400;
	}

	.chip-row {
		grid-column: 1/5;
		grid-row: 2/5;
		display: flex;
		flex-wrap: wrap;
		justify-content: left;
	}

	.chip {
		display: inline-flex;
		padding: 0 10px;
		margin: 2px;
		height: 25px;
		width: auto;
		font-size: 12px;
		font-weight: 600;
		line-height: 25px;
		border-radius: 25px;
		border-width: 0px;
		background-color: #147efb;
		color: #f5f5f4;
		transition: width 1.5s ease-in-out, background-color 0.2s ease-in-out;
	}

	.chip:width {
		width: auto;
	}

	.chip:hover span {
		display: none;
	}

	.chip:hover {
		background-color: #fc3c44;
		cursor: pointer;
	}

	.chip:hover:before {
		content: 'Remove';
	}

	.expenses-list {
		grid-column: 1/2;
		column-span: all;
		margin-top: 50px;
		grid-row: 3/5;
		width: 600px;
		padding: 0;
	}

	.expense-price {
		float: right;
		margin-right: 5px;
	}

	.expense-item {
		margin-left: 5px;
		margin-right: 5px;
		margin-bottom: 15px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		position: relative;
		text-decoration: none;
		font-size: 1.1rem;
		font-weight: 200;
		letter-spacing: 0.5px;
		color: #242526;
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

	details {
		transition: height 0.4s ease;
		overflow: hidden;
	}

	details:not([open]) {
		height: 2.5em;
	}

	details[open] {
		height: 10em;
	}

	details summary:before {
		content: '+';
		color: black;
		position: absolute;
		font-size: 1.75rem;
		line-height: 0;
		margin-top: 0.75rem;
		left: 0;
		font-weight: 200;
		transform-origin: center;
		transition: 200ms linear;
	}
	details[open] summary:before {
		transform: rotate(45deg);
		font-size: 2rem;
	}
	details summary {
		outline: 0;
	}

	.expenses-buttons-div {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 5px;
		margin-bottom: 15px;
	}

	.button-expense {
		margin-right: 5px;
		display: inline-block;
		background-color: #147efb;
		border: 1px solid #147efb;
		border-radius: 4px;
		box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;
		box-sizing: border-box;
		color: #fff;
		cursor: pointer;
		font-size: 16px;
		font-weight: 400;
		outline: none;
		outline: 0;
		padding: 5px 12px;
		text-align: center;
		transform: translateY(0);
		transition: transform 150ms, box-shadow 150ms;
		user-select: none;
		touch-action: manipulation;
	}

	.button-del-expense {
		margin-left: 5px;
		background-color: #fc3c44;
		border: 1px solid #fc3c44;
		border-radius: 4px;
		box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;
		box-sizing: border-box;
		color: #fff;
		cursor: pointer;
		font-size: 16px;
		font-weight: 400;
		outline: none;
		outline: 0;
		padding: 5px 12px;
		text-align: center;
		transform: translateY(0);
		transition: transform 150ms, box-shadow 150ms;
		user-select: none;
		touch-action: manipulation;
	}

	.button-expense:hover,
	.button-del-expense:hover {
		box-shadow: rgba(0, 0, 0, 0.15) 0 3px 9px 0;
		transform: translateY(-2px);
		text-decoration: none;
	}

	.sum {
		font-size: 1.25rem;
		font-weight: 400;
	}

	.sum-row {
		grid-column: 1/5;
		grid-row: 5/5;
		margin-top: 5px;
		margin-right: 10px;
		margin-left: auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.action-buttons-row {
		grid-column: 1/5;
		grid-row: 6/6;
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

	.nav:hover {
		box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
	}

	.menu {
		margin: 0;
		padding: 0;
		width: 0;
		overflow: hidden;
		transition: 0.5s;
	}

	.nav input:checked ~ .menu {
		width: 450px;
	}

	.menu li {
		list-style: none;
		white-space: nowrap;
		font-size: 14px;
		margin: 0 10px;
		margin-top: 0px;
	}

	.menu li a {
		text-decoration: none;
		color: #666;
		text-transform: uppercase;
		vertical-align: middle;
		letter-spacing: 0.5px;
		font-weight: 600;
		transition: 0.5s;
	}

	.menu li a:hover {
		color: #147efb;
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
