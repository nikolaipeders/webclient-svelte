<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import person from '$lib/images/person.svg';
	import personoff from '$lib/images/personoff.svg';
	import { storedUser } from '$lib/stores/user';
</script>

<header>
	<div class="corner">
		<a href="/">
			<img src={logo} alt="SvelteKit" />
		</a>
	</div>

	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			{#if $storedUser.token.includes('Empty')}
				<li aria-current={$page.url.pathname === '/loginForm' ? 'page' : undefined}>
					<a href="/loginForm">Profile</a>
				</li>
			{:else}
				<li aria-current={$page.url.pathname === '/editAccountForm' ? 'page' : undefined}>
					<a href="/editAccountForm">Profile</a>
				</li>
			{/if}
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
		</ul>
	</nav>

	<div class="corner">
		<!-- {#if $storedUser.token.includes('Empty')}
			<a href="/loginForm">
				<img src={personoff} alt="account" />
			</a>
		{:else}
			<a href="/editAccountForm">
				<img src={person} alt="account" />
			</a>
		{/if} -->
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
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
		width: 16em;
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
