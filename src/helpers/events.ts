export const onPressEnter = (e: KeyboardEvent, callback: () => void) => { 
    if (e.key === 'Enter') {
        callback()
    }
}