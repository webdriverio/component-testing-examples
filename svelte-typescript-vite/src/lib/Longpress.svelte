<script>
  let pressed = false;
  let duration = 2000;

  export function longpress(node, duration) {
    let timer;

    const handleMousedown = () => {
      timer = setTimeout(() => {
        node.dispatchEvent(new CustomEvent("longpress"));
      }, duration);
    };

    const handleMouseup = () => {
      clearTimeout(timer);
    };

    node.addEventListener("mousedown", handleMousedown);
    node.addEventListener("mouseup", handleMouseup);

    return {
      update(newDuration) {
        duration = newDuration;
      },
      destroy() {
        node.removeEventListener("mousedown", handleMousedown);
        node.removeEventListener("mouseup", handleMouseup);
      },
    };
  }
</script>

<label>
  <input type="range" bind:value={duration} max={2000} step={100} />
  {duration}ms
</label>

<button
  use:longpress={duration}
  on:longpress={() => (pressed = true)}
  on:mouseenter={() => (pressed = false)}>press and hold</button
>

{#if pressed}
  <p>congratulations, you pressed and held for {duration}ms</p>
{/if}
