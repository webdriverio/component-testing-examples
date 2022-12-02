import { onCleanup } from "solid-js";

console.log('GOT IMPORTED');

export default function clickOutside(el: any, accessor: Function) {
  const onClick = (e: Event) => !el.contains(e.target) && accessor()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}
