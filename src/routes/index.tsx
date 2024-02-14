import { $, component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Button from "~/components/button/button";
import { getBasket, updateBasket } from "~/helpers/apis";
import { onPressEnter } from "~/helpers/events";
import bitrock from '~/media/bitrock.png'



export default component$(() => {
  const input = useSignal('')
  const state = useStore({
    basket: {} as Record<string, number>,
    isLoading: false
  })


  useTask$(async () => {
    state.isLoading = true
    state.basket = await getBasket()
    state.isLoading = false
  })


  const addToBasket = $(async () => {
    state.isLoading = true
    const existingQuantity = state.basket[input.value] ?? 0

    state.basket = await updateBasket({ 
        ...state.basket,
        [input.value]: existingQuantity + 1 
      })

    state.isLoading = false
  })



  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <img src={bitrock} width={50} height={50} />
        <h3>Shopping List</h3>
      </div>


      <input
        bind:value={input}
        onKeyPress$={(e) => onPressEnter(e, addToBasket)}
      />

      <Button onClick$={addToBasket} isLoading={state.isLoading}>
        Add
      </Button>

      {
        Object.entries(state.basket).map(([name, quantity], i) => (
          <div key={name + i}>
            {name} x {quantity}
          </div>
        )
        )
      }
    </>
  );
});

export const head: DocumentHead = {
  title: "Bitrock Shopping List",
  meta: [
    {
      name: "description",
      content: "Qwik demo for internal Bitrock use",
    },
  ],
};
