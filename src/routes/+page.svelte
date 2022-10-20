<script lang="ts">
  import type { PageData, ActionData } from "./$types";

  export let data: PageData;
  export let form: ActionData;

  let userInput = "";
  let userInputError: undefined | string = "";
</script>

<div class="w-screen h-screen grid place-items-center">
  <div>
    <h1 class="text-7xl">Write something</h1>

    {#if form?.userInput}
      <section>Your submission was received.</section>
    {/if}

    <section>
      Someone else said:<br />{data.userInput}
    </section>

    <form method="post">
      <section class="grid">
        <div class="text-3xl text-center text-rose-600">{userInputError ?? ""}</div>
        <input
          type="text"
          name="userInput"
          bind:value={userInput}
          class="text-3xl text-center px-7 py-3 mt-3 border-2 rounded-full ring-1"
        />

        <button
          class="mt-2 font-semibold bg-black text-white text-xl rounded-full ring-1 border-1 border-black hover:bg-white hover:text-black"
        >
          submit to the ether
        </button>
      </section>
    </form>
  </div>
</div>
