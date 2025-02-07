import { page } from '$app/state'

export const pageScroll = (_) => {
    let anchor = page.url.hash

    if (anchor) {
        anchor = anchor.substring(1)
    } else {
        return
    }

    const selectorEl = document.querySelector(`writer[name=${anchor}]`)

    if (selectorEl) {
        const closestBlockEl = selectorEl.closest('section')

        if (closestBlockEl) {
            closestBlockEl.scrollIntoView({
                block: 'nearest'
            })
        }
    }
}
