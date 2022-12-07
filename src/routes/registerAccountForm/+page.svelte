<script>
	// @ts-nocheck
	import toast, { Toaster } from 'svelte-french-toast';
	const regexExpMail =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
	let isReaden = false;
	let name = '';
	let lastName = '';
	let username = '';
	let mail = '';
	let password = '';
	let passwordConfirmation = '';
	let result = null;
	let users = new Array();

	function goBack() {
		history.back();
	}

	async function registerAcc() {
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
		} else if (users.some((user) => user.userName == username) == true) {
			toast.error('Username already taken', {
				position: 'bottom-center'
			});
		} else if (users.some((user) => user.email == username) == true) {
			toast.error('There is already a user with this email', {
				position: 'bottom-center'
			});
		} else if (password !== passwordConfirmation) {
			toast.error('Passwords not identical', {
				position: 'bottom-center'
			});
		} else if (isReaden == false) {
			toast.error('You need to accept the terms of service', {
				position: 'bottom-center'
			});
		} else {
			toast.success('Successfully added account', {
				position: 'bottom-center'
			});

			const res = await fetch('https://api-wan-kenobi.ovh/api/ShareUser/CreateUser', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify({
					firstName: name,
					lastName: lastName,
					userName: username,
					email: mail,
					password: password,
					isAdmin: false,
					isDisabled: false,
					isBlacklisted: false
				})
			});
			const json = await res.json();
			result = JSON.stringify(json);

			goBack();
		}
	}

	$: fetch('https://api-wan-kenobi.ovh/api/ShareUser/GetAllUsers/')
		.then((response) => response.json())
		.then((data) => {
			users = data;
			users = users;
			// user = users.find((u) => u.userId == $storedUser.id);
		});
</script>

<svelte:head>
	<title>Register</title>
	<meta name="register" content="register" />
</svelte:head>

<Toaster />

<div class="text-column">
	<h1>Register</h1>
	<div>
		<input type="text" placeholder="Name" id="name" class="form-input" bind:value={name} required />
		<label for="name" class="form-label">Name</label>
	</div>
	<div>
		<input
			type="text"
			placeholder="Last name"
			id="lastName"
			class="form-input"
			bind:value={lastName}
			required
		/>
		<label for="lastName" class="form-label">Last name</label>
	</div>
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
			type="email"
			placeholder="Mail"
			id="mail"
			class="form-input"
			bind:value={mail}
			required
		/>
		<label for="mail" class="form-label">Mail</label>
	</div>
	<div>
		<input
			type="password"
			placeholder="Password"
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
			placeholder="Confirm password"
			id="confirmPassword"
			class="form-input"
			bind:value={passwordConfirmation}
			required
		/>
		<label for="confirmPassword" class="form-label">Confirm password</label>
	</div>
	<div class="text-row">
		<div class="switch-box">
			<input type="checkbox" class="switch" bind:checked={isReaden} />
			<p>&nbsp I have read the <a href="/termsPage" target="_blank">terms and conditions</a></p>
		</div>
	</div>
	<div class="buttons-row">
		<button class="action-button" on:click={goBack}>Go back</button>
		<button class="action-button" on:click={registerAcc}>Confirm </button>
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

	.switch-box {
		display: flex;
		width: 350px;
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
