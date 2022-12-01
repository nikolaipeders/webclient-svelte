<script>
	import toast, { Toaster } from 'svelte-french-toast';
	import { storedUser } from '$lib/stores/user';

	let username = '';
	let pass = '';
	let result = null;
	let users = new Array();

	$: fetch('https://api-wan-kenobi.ovh/api/ShareUser/GetAllUsers')
		.then((response) => response.json())
		.then((data) => {
			users = data;
			users = users;
		});

	function goBack() {
		history.back();
	}

	async function goHome() {
		window.location.href = '/';
	}

	async function signIn() {
		if (
			(typeof username === 'string' && username.length === 0) ||
			(typeof pass === 'string' && pass.length === 0)
		) {
			toast.error('Missing inputs', {
				position: 'bottom-center'
			});
		} else {
			const res = await fetch('https://api-wan-kenobi.ovh/api/Main/Login/', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({
					userName: username,
					password: pass
				})
			});
			const json = await res.text();
			result = JSON.stringify(json);

			let user = users.find((u) => u.userName === username);

			if (!result.includes('Already logged in')) {
				$storedUser.token = result;
				$storedUser.id = user.userId;
				$storedUser.username = user.username;
			}

			toast.success('Logged in as ' + username, {
				position: 'bottom-center'
			});

			goHome();
		}
	}
</script>

<svelte:head>
	<title>Profile</title>
	<meta name="profile" content="profile" />
</svelte:head>

<Toaster />

<div class="text-column">
	<h1>Sign in</h1>
	<div>
		<input
			type="text"
			placeholder="Username"
			id="username"
			class="form-input"
			bind:value={username}
			required
		/>
		<label for="username" class="form-label">Username</label>
	</div>
	<div>
		<input
			type="password"
			placeholder="Password"
			id="password"
			class="form-input"
			bind:value={pass}
			required
		/>
		<label for="password" class="form-label">Password</label>
	</div>
	<div class="text-row">
		<p>Don't have an account? <a href="/registerAccountForm">Register</a></p>
	</div>
	<div class="buttons-row">
		<button class="action-button" on:click={goBack}>Go back</button>
		<button class="action-button" on:click={signIn}>Sign in </button>
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

	.text-row {
		margin-top: -20px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
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
</style>
