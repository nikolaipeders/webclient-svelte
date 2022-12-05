<script>
	// @ts-nocheck
	import toast, { Toaster } from 'svelte-french-toast';
	import { storedUser } from '$lib/stores/user';
	const regexExpMail =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
	let name = '';
	let lastName = '';
	let username = '';
	let mail = '';
	let password = '';
	let passwordConfirmation = '';
	let result = null;
	let users = new Array();
	let user = '';

	function goBack() {
		history.back();
	}

	async function goHome() {
		window.location.href = '/loginForm';
	}

	fetch('https://api-wan-kenobi.ovh/api/ShareUser/GetAllUsers')
		.then((response) => response.json())
		.then((data) => {
			users = data;

			user = users?.find((u) => u.userId == $storedUser.id);
			name = user?.firstName;
			lastName = user?.lastName;
			username = user?.userName;
			mail = user?.email;
		});

	async function signOut() {
		const res = await fetch('https://api-wan-kenobi.ovh/api/Main/Logout/' + $storedUser.id, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' }
		});

		$storedUser.id = 0;
		$storedUser.token = 'Empty';

		toast.success('Logged out', {
			position: 'bottom-center'
		});

		goHome();
	}

	async function editAcc() {
		if (
			(typeof name === 'string' && name.length === 0) ||
			(typeof lastName === 'string' && lastName.length === 0) ||
			(typeof username === 'string' && username.length === 0) ||
			(typeof mail === 'string' && mail.length === 0) ||
			(typeof password === 'string' && password.length === 0) ||
			(typeof passwordConfirmation === 'string' && passwordConfirmation.length === 0)
		) {
			toast.error('Missing inputs', {
				position: 'bottom-center'
			});
		} else if (regexExpMail.test(mail) != true) {
			toast.error('Please enter a valid email', {
				position: 'bottom-center'
			});
		} else if (password !== passwordConfirmation) {
			toast.error('Passwords not identical', {
				position: 'bottom-center'
			});
		} else {
			toast.success('Successfully updated account', {
				position: 'bottom-center'
			});

			const res = await fetch('https://api-wan-kenobi.ovh/api/ShareUser/UpdateUser', {
				method: 'PUT',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({
					userId: $storedUser.id,
					firstName: name,
					lastName: lastName,
					userName: username,
					email: mail,
					password: password
				})
			});
			const json = await res.json();
			result = JSON.stringify(json);

			goBack();
		}
	}
</script>

<svelte:head>
	<title>Account</title>
	<meta name="register" content="register" />
</svelte:head>

<Toaster />

<div class="text-column">
	<h1>Change password</h1>
	<div>
		<input
			type="password"
			placeholder="Current Password"
			id="password"
			class="form-input"
			bind:value={password}
			required
		/>
		<label for="password" class="form-label">Password</label>
	</div>
	<div>
		<input
			type="password"
			placeholder="New password"
			id="confirmPassword"
			class="form-input"
			bind:value={passwordConfirmation}
			required
		/>
		<label for="confirmPassword" class="form-label">Confirm password</label>
	</div>
	<div>
		<input
			type="password"
			placeholder="New confirm password"
			id="confirmPassword"
			class="form-input"
			bind:value={passwordConfirmation}
			required
		/>
		<label for="confirmPassword" class="form-label">Confirm password</label>
	</div>
	<!-- <div class="text-row">
		<p>I want to<button class="sign-out-button" on:click={signOut}>change password</button></p>
	</div> -->
	<div class="buttons-row">
		<button class="action-button" on:click={goBack}>Go back</button>
		<button class="action-button" on:click={editAcc}>Save changes </button>
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

	input:not(:placeholder-shown):invalid {
		background-color: #ffe9ec;
	}

	.text-row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: -20px;
	}

	.buttons-row {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.sign-out-button {
		background-color: transparent;
		border-width: 0px;
		color: #ff3e00;
	}

	.sign-out-button:hover {
		cursor: pointer;
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
