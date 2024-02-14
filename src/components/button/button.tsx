import { Slot, type QRL, component$ } from "@builder.io/qwik"

type ButtonProps = {
    onClick$: QRL<() => void>,
    isLoading?: boolean
}

export default component$(({ onClick$, isLoading }: ButtonProps) => {

    return (
        <button onClick$={onClick$} style={{ opacity: isLoading ? .4 : 1 }} disabled={isLoading}>
            {
                isLoading ? '...' :
                    <>
                        <Slot name="start" />
                        <Slot />
                    </>}
        </button >
    )
})