<svelte:head>
	<title>Form</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script>

</script>

<div class="" style="text-align: center;margin-top:5%">
  <button class="expense-btn add-btn">
    <div class="add-icon"></div>
    <div class="btn-txt">This is a long text lol</div>
  </button>
</div>

<style>

.expense-btn {
  width: 100px;
  height: 50px;
  border: 1px solid #cdcdcd;
  background: white;
  border-radius: 25px;
  overflow: hidden;
  position: relative;
  transition: width 0.2s ease-in-out;
}

.add-btn:hover {
  width: 350px;
}

.expense-btn:focus {
  outline: none;
}
.btn-txt {
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
}
.add-btn:hover::before,
.add-btn:hover::after {
  width: 4px;
  border-radius: 2px;
}
.add-btn:hover .btn-txt {
  opacity: 1;
}

.add-btn:hover .add-icon::before {
  left: 15px;
  height: 4px;
  top: calc(50% - 2px);
}
.add-btn:hover .add-icon::after {
  right: 15px;
  height: 4px;
  top: calc(50% - 2px);
}


</style>
