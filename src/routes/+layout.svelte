<script>
	import Header from './Header.svelte';
	import './styles.css';
	import { storedUser } from '$lib/stores/user';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		{#if $storedUser.token.includes('Empty')}
			<p>click <a href="/loginForm">here</a> to sign and use the app</p>
		{:else}
			<p>logged in as <a href="/editAccountForm">{$storedUser.username}</a></p>
			<!-- <p>go to <a href="/about">about</a> to learn about this app</p> -->
		{/if}
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
