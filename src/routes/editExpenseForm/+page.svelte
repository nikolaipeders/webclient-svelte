<svelte:head>
	<title>Form</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script>
  import { page } from '$app/stores'
	var name = "" + $page.url.searchParams.get('name')
	var description = "" + $page.url.searchParams.get('des')
  var amount = "" + $page.url.searchParams.get('amount')
  var reference = "" + $page.url.searchParams.get('reference')
	var result = null

	function goBack() {
		history.back()
	}

  async function goHome() {
    window.location.href="/"
  	}

  async function postGroup () {
		const res = await fetch('https://api-wan-kenobi.ovh/api/UserGroup/EditAnExpense', {
			method: 'PUT',
      headers: {"Content-type": "application/json"},
			body: JSON.stringify({
        expenseId: reference, name : name, description : description, amount: amount, userId: "7"
			})
		})
		
		const json = await res.json()
		result = JSON.stringify(json)

    await goHome()
	}
</script>

<div class="text-column">
<h1>Edit an expense</h1>
	<form class="search-form">
	<input bind:value={name} placeholder="Name" class="search-input">
	</form>
	<form class="search-form">
		<input bind:value={description} placeholder="Description" class="search-input">
		</form>
    <form class="search-form">
      <input bind:value={amount} placeholder="Amount" class="search-input">
      </form>
		<div class="buttons-row">
			<button class="action-button" on:click={goBack}>Go back</button>
			<button class="action-button" on:click={postGroup}>Confirm </button>
		</div>
</div>

<style>

.search-form {
position: relative;
margin-top: 20px;
  top: 50%;
  left: 50%;
  width: 350px;
  height: 40px;
  border-radius: 40px;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  transform: translate(-50%, -50%);
  background: #fff;
  transition: all 0.3s ease;
}

.search-form:active {
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
}

.search-input {
  position: absolute;
  top: 10px;
  left: 38px;
  font-size: 14px;
  background: none;
  color: #5a6674;
  width: 280px;
  height: 20px;
  border: none;
  appearance: none;
  outline: none;
}

.buttons-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.action-button {
  display: inline-block;
  margin: 5px;  
  padding: 1.0em 3em;
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
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  color: #fff;
  transform: scale(1.05); 
  /* transform: translateY(-7px); */
}

</style>
