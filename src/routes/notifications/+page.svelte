<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { storedUser } from '$lib/stores/user';
	import toast, { Toaster } from 'svelte-french-toast';

	let invites = new Array();
	let users = new Array();
	let groups = new Array();
	let result = null;

	async function acceptInvite(group) {
		const res = await fetch('https://api-wan-kenobi.ovh/api/UserGroup/JoinExistingGroup', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				userID: $storedUser.id,
				groupID: group
			})
		});

		toast.success('Invite accepted', {
			position: 'bottom-center'
		});
	}

	async function endInvite(invite) {
		const res = await fetch('https://api-wan-kenobi.ovh/api/Invites/EndInvite/' + invite, {
			method: 'PUT',
			headers: { 'Content-type': 'application/json' }
		});
	}

	$: fetch('https://api-wan-kenobi.ovh/api/Invites/GetAllInvitesToUser/' + $storedUser.id)
		.then((response) => response.json())
		.then((data) => {
			invites = data;
			invites = invites;
		});

	$: fetch('https://api-wan-kenobi.ovh/api/ShareGroup/GetAllGroups/')
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

	onMount(async () => {
		if ($storedUser.token.includes('Empty')) {
			window.location.href = '/loginForm';
		}
	});

	$: pendingInvites = invites.filter((invite) => invite.isPending === true);
</script>

<Toaster />

<div class="text-column">
	<h1>Invites</h1>

	{#if pendingInvites.length > 0 && users.length > 0 && groups.length > 0}
		{#each pendingInvites as invite}
			<div class="cards">
				<div class="card">
					<div>
						<div class="card-title-row">
							<div class="card-title">
								{groups.find((group) => group.groupId === invite.groupId).name}
							</div>
						</div>
						<h3 class="card-subtitle">
							Invited by {users.find((user) => user.userId === invite.senderId).firstName}
						</h3>
						<h3 class="card-from">{invite.message}</h3>
					</div>
					<div class="action-buttons-row">
						<button
							class="action-button accept"
							on:click={[acceptInvite(invite.groupId), endInvite(invite.inviteId)]}>Accept</button
						>
						<button class="action-button delete" on:click={endInvite(invite.inviteId)}
							>Delete</button
						>
					</div>
				</div>
			</div>
		{/each}
	{/if}
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
		min-height: 100px;
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

	.card-from {
		font-weight: 400;
		letter-spacing: 0.75px;
		color: #242526;
	}

	.action-buttons-row {
		grid-column: 1/5;
		grid-row: 4/6;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 20px;
		margin-left: 5px;
		margin-right: 5px;
	}

	.action-button {
		display: inline-block;
		margin: 5px;
		padding: 1em 3em;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 2.5px;
		font-weight: 500;
		color: #fff;
		background-color: #fff;
		border: none;
		border-radius: 10px;
		box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease 0s;
		cursor: pointer;
		outline: none;
	}

	.delete {
		background-color: #ff3e00;
	}

	.accept {
		background-color: #147efb;
		width: 70%;
	}

	.action-button:hover {
		box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
		color: #fff;
	}
</style>
