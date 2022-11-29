<script>
	/** @type {import('./$types').PageData} */
	export let data;

	function goBack() {
		history.back();
	}
</script>

<div class="text-column">
	<div class="cards">
		<div class="card">
			<div>
				<div class="card-title-row">
					<div class="card-title">Terms of service</div>
				</div>
				<h3 class="card-subtitle">Last updated 28-11-2022</h3>
			</div>
			<div class="terms-section">
				<in>
					Please read these Terms and Conditions carefully before using this site. Your access to
					and use of the Service is conditioned on your acceptance of and compliance with these
					Terms. These Terms apply to all visitors, users and others who access or use the Service.
				</in>
			</div>
		</div>
	</div>
	<div class="buttons-row">
		<button class="action-button" on:click={goBack}>Go back</button>
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

	.terms-section {
		grid-column: 1/2;
		column-span: all;
		margin-top: 5px;
		grid-row: 3/4;
		width: 600px;
		padding: 0;
		color: black;
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
