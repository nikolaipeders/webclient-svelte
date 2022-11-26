<script>
// @ts-nocheck

import { onMount } from "svelte";

let groups = new Array()
let expenses = new Array()
let userGroups = new Array()
let signedId = 7;
var totalExpenses = 0;

const formatter = new Intl.NumberFormat('da-DK', {
  style: 'currency',
  currency: 'DKK',
})

async function removeMember (group, user) {
		const res = await fetch('https://api-wan-kenobi.ovh/api/UserGroup/RemoveMemberFromGroup', {
			method: 'DELETE',
      headers: {"Content-type": "application/json"},
			body: JSON.stringify({
        groupId: group,
        userId: user
			})
		})

    const json = await res.json()
		result = JSON.stringify(json)
	}

  $: fetch('https://api-wan-kenobi.ovh/api/UserGroup/GetAllUserGroups')
		.then((response) => response.json())
		.then((userGroup) => {
			userGroups = userGroup
      userGroups = userGroups
		})

onMount(async () => {

	fetch('https://api-wan-kenobi.ovh/api/UserGroup/GetAllGroups')
		.then((response) => response.json())
		.then((group) => {
			groups = group
		})

    fetch('https://api-wan-kenobi.ovh/api/UserGroup/GetAllExpenses')
		.then((response) => response.json())
		.then((expense) => {
			expenses = expense
    })
  })

</script>

<div class="main-body">

  <div class="add-button-div">
    <a class="add-button" href="/addGroupForm" > Add group </a>
    <a class="add-button" href="/joinGroupForm" > Join group </a>
  </div>

		{#each groups as group}
    <div class="cards">
      <div class="card card-1"><div>
        <div class="card-title-row">
        <div class="card-title">{group.name}</div>
        <!-- <button class="burger-button">&ctdot</button> -->
        </div>
        <h3 class="card-subtitle">{group.description}</h3>
      </div>
        <div class="chip-row">
          {#each userGroups.filter(data => data.groupId == group.groupId).map(data => data.user) as member}
            <button class="chip" on:click={removeMember(group.groupId, member.userId )}>
              <span>{member.firstName}</span>
            </button>
          {/each}
        </div>
        <ul class="expenses-list">
          {#each expenses.filter(data => data.groupId == group.groupId) as expense}
          <div class="expense-item">
            <a class="expense-link" href="/editExpenseForm?reference={expense.expenseId}&name={expense.expenseName}&des={expense.expenseDescription}&amount={expense.amount}">{expense.firstName + ": " + expense.expenseName}
            </a>
            <in>{formatter.format(expense.amount)}</in>
        </div>
        {/each}
        </ul>
        <div class="action-buttons-row">
          <div class="burger-drop">
            <div class="nav">
              <input type="checkbox">
                <span></span>
                <span></span>
                <div class="menu">
                  <li><a href="/addExpenseForm?reference={group.groupId}">Add expense</a></li>
                  <li><a href="/editGroupForm?reference={group.groupId}&name={group.name}&des={group.description}">Configure</a></li>
                  <li><a href="/membersForm?reference={group.groupId}&name={group.name}">Members</a></li>
                  <li><a href="/cssTester">Details</a></li>
                </div>
            </div>
            </div>
      </div>
      <div class="sum-row">
        <strong> Total: {formatter.format(expenses.filter(data => data.groupId == group.groupId).map(data => data.amount).reduce((partialSum, a) => partialSum + a, 0))}</strong>
      </div>
      </div>
    </div>
		{/each}
</div>

<style>
  
.main-body {
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.add-button-div {
    width: 100%;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 0px;
}

.add-button {
  display: inline-block;  
  padding: 1.0em 3em; 
  font-size: 12px;
  margin: 5px;
  text-transform: uppercase;
  text-decoration: none;
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

.add-button:hover {
  background-color: #147efb;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.25);
  color: #fff;
  transform: scale(1.05); 
}

.add-button:active {
  transform: translateY(-1px);
}

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
  grid-template-rows: auto auto auto auto auto;
  grid-template-columns: 2fr 1fr;
  border-radius: 10px;
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
  color:rgba(0, 0, 0, 0.25);
  margin-top: 0px;
  letter-spacing: 0.75px;
  font-weight: 400;
}

.burger-button {
  margin: 0px;
  font-size: 1.75rem;
  background-color: transparent;
  border-width: 0px;
  vertical-align: center;
}

.burger-button:hover {
  cursor: pointer;
  background-color: #F3F4F6;
  border-radius: 90px;
  text-decoration: none;
  transition-duration: 0.1s;
}

.card-1 {
  background: #ffffff;
}

.chip-row {
  grid-column: 1/5;
  grid-row: 2/5;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}

.chip {
  display: inline-flex;
  padding: 0 10px;
  margin: 2px;
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
  background-color: #fc3c44;
  cursor: pointer;
}

.chip:hover:before {
  content: "Remove";
}

.expenses-list {
  grid-column: 1/2;
  column-span: all;
  margin-top: 50px;
  grid-row: 3/5;
  width: 600px;
  padding: 0;
}

.expense-item {
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
}

.expense-item::after {
  position: absolute;
  top: 22px;
  left: 0;
  content: "";
  width: 0%;
  height: 2px;
  background-color: #242526;
  transition: all 0.5s;
}

.expense-item:hover::after {
  width: 100%;
}

.expense-link {
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: #242526;
}

.sum-row {
  grid-column: 1/5;
  grid-row: 4/5;
  margin-top: 20px;
  margin-right: 5px;
  margin-left: auto; 
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.action-buttons-row {
  grid-column: 1/5;
  grid-row: 5/5;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 5px;
  margin-right: 5px;
}

.burger-drop, .nav, .menu {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto
}

.nav {
    position: relative;
    background-color: #fff;
    padding: 10px;
    transition: 0.5s;
    border-radius: 50px;
    overflow: hidden;
    box-shadow: 0 8px 15px rgba(0,0,0,.2);
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
