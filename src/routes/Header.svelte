<script>
	import { page } from '$app/stores';
	import { storedUser } from '$lib/stores/user';
	import toast, { Toaster } from 'svelte-french-toast';

	let invites = 0;

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

		window.location.href = '/loginForm';
	}
</script>

<header>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname === '/addGroupForm' ? 'page' : undefined}>
				<div class="dropdown">
					<a href="/" class="dropdown-button"> Groups </a>
					<div class="dropdown-content">
						<a href="/addGroupForm" class="dropdown-item">Add group</a>
						<a href="/joinGroupForm" class="dropdown-item">Join group</a>
					</div>
				</div>
			</li>
			<li aria-current={$page.url.pathname === '/editAccountForm' ? 'page' : undefined}>
				<div class="dropdown">
					<a href="/editAccountForm" class="dropdown-button"> Profile </a>
					<div class="dropdown-content">
						{#if $storedUser.token.includes('Empty')}
							<a href="/loginForm" class="dropdown-item">Sign in</a>
						{:else}
							<a href="/editAccountForm" class="dropdown-item">Settings</a>
							<a href="#" on:click={signOut} class="dropdown-item">Sign Out</a>
						{/if}
					</div>
				</div>
			</li>
			<li>
				<div class="dropdown">
					<button class="notification-button" />
					<div class="dropdown-content">
						<a href="/addGroupForm" class="dropdown-item">Invites ({invites})</a>
					</div>
				</div>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: center;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 10px;
		height: 3em;
		width: 26em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		border-radius: 8px;
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	.dropdown {
		position: relative;
		display: inline-block;
		height: 100%;
	}

	.dropdown-button {
		padding: 0;
		border: none;
		background-color: transparent;
		cursor: pointer;
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	.dropdown-content {
		display: none;
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1;
		background: var(--background);
		transition: all 0.4s ease-in-out;
		border-radius: 0px 0px 10px 10px;
	}

	.dropdown:hover .dropdown-content {
		display: block;
	}

	.dropdown-item {
		display: block;
		padding: 8px 16px;
		color: #657786;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-decoration: none;
	}

	.dropdown-item:hover {
		background-color: #f5f8fa;
		border-radius: 0px 0px 10px 10px;
	}

	.notification-button {
		position: relative;
		margin-left: 10px;
		width: 40px;
		height: 100%;
		line-height: 40px;
		border: none;
		border-radius: 5px;
		background-color: transparent;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.notification-button:hover {
		cursor: pointer;
	}

	.notifications:empty {
		filter: grayscale(100%);
	}

	/* Style the notification bell icon */
	.notification-button:before {
		content: '\1F514';
		font-family: 'Font Awesome 5 Brands';
		font-weight: 900;
		font-size: 24px;
		display: inline-block;
		vertical-align: middle;
	}
</style>
