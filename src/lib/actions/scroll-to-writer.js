
export const scrollToWriter = (_) => {
    let writerId = window.location.hash

    if (writerId) {
        writerId = writerId.substring(1)
    } else {
        return
    }

    const writerEl = document.querySelector(`writer[name=${writerId}]`)

    if (writerEl) {
        const sectionEl = writerEl.closest('section')

        if (sectionEl) {
            sectionEl.scrollIntoView({
                block: 'nearest'
            })

            // const y = sectionEl.getBoundingClientRect().top + window.scrollY
            // window.scroll({ top: y - 20 })
        }
    }
}
