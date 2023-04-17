import { createSignal, Show } from "solid-js";
import clickOutside from '../directives/click-outside.js';
import './modal.css';

export default function Modal () {
  const [show, setShow] = createSignal(false);
  console.log(clickOutside); // needed otherwise not imported (ReferenceError: clickOutside is not defined)

  return (
    <Show
      when={show()}
      fallback={<button onClick={(e) => setShow(true)}>Open Modal</button>}
    >
      <div class="modal" use:clickOutside={() => setShow(false)}>
        Some Modal
      </div>
    </Show>
  );
}
