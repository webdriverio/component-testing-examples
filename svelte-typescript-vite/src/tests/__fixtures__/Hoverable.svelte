<script>
  import Hoverable from "../../lib/Hoverable.svelte";
</script>

<Hoverable let:hovering={active}>
  <div class:active>
    {#if active}
      <p>1st element is being hovered upon.</p>
    {:else}
      <p>Hover over me!</p>
    {/if}
  </div>
</Hoverable>

<Hoverable let:hovering={active}>
  <div class:active>
    {#if active}
      <p>2nd element is being hovered upon.</p>
    {:else}
      <p>Hover over me!</p>
    {/if}
  </div>
</Hoverable>

<Hoverable let:hovering={active}>
  <div class:active>
    {#if active}
      <p>3rd element is being hovered upon.</p>
    {:else}
      <p>Hover over me!</p>
    {/if}
  </div>
</Hoverable>

<style>
  div {
    padding: 1em;
    margin: 0 0 1em 0;
    background-color: #eee;
  }

  .active {
    background-color: #ff3e00;
    color: white;
  }

  p {
    pointer-events: none;
  }
</style>
