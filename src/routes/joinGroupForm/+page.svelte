<svelte:head>
	<title>Form</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script>
// @ts-nocheck
import { page } from '$app/stores';
import { onMount } from "svelte";

	var name = $page.url.searchParams.get('name');
  var reference = "" + $page.url.searchParams.get('reference')
	var result = null
  let searchTerm = ""
  let groups = new Array()
  
  $: filteredList = groups.filter(group => group.name.toUpperCase().includes((searchTerm.length > 0 ? searchTerm.toUpperCase() : "xyz")))

onMount(async () => {

fetch('https://api-wan-kenobi.ovh/api/UserGroup/GetAllGroups')
  .then((response) => response.json())
  .then((group) => {
    groups = group
  })
})

  async function goHome() {
    window.location.href="/"
  	}

  async function addMember(group) {

		const res = await fetch('https://api-wan-kenobi.ovh/api/UserGroup/JoinExistingGroup', {
			method: 'POST',
      headers: {"Content-type": "application/json"},
			body: JSON.stringify({
        groupID: group, userId : 7
			})
		})
		
		const json = await res.json()
		result = JSON.stringify(json)

    await goHome()
	}
</script>

<div class="text-column">
<h1>Join group</h1>
	<form class="search-form">
	<input bind:value={searchTerm} placeholder="Search groups" class="search-input">
	</form>
    <div>
      <div class="chip-row">
        {#each filteredList as group}
          <button class="chip" on:click={addMember(group.groupId)}>
            <span>{group.name}</span>
          </button>
        {/each}
      </div>
    </div>
		<div class="buttons-row">
			<button class="action-button" on:click={goHome}>Go back</button>
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

.chip-row {
  margin-bottom: 15px;
  width: 350px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}

.chip {
  display: inline-flex;
  padding: 0 10px;
  margin: 5px;
  height: 25px;
  font-size: 12px;
  font-weight: 600;
  line-height: 25px;
  border-radius: 25px;
  border-width: 0px;
  background-color: #147efb;
  /* background-color: #007AFF; */
  color: #f5f5f4
}

.chip:hover span {
  display: none
}

.chip:hover {
  background-color: #53d769;
  cursor: pointer;
}

.chip:hover:before {
  content: "Join group";
}

.buttons-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.action-button {
  display: inline-block;
  margin: 5px;  
  padding: 1.3em 3em;
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
