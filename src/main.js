//copied from https://stackoverflow.com/questions/52103492/
var medias = Array.prototype.slice.apply(document.querySelectorAll('audio,video'));
medias.forEach(function (media) {
    media.addEventListener('play', function (event) {
        medias.forEach(function (media) {
            if (event.target != media) media.pause();
        });
    });
});

let box = document.querySelector('.box')
box.addEventListener('wheel', (event) => {
    event.preventDefault()
    box.scrollLeft += event.deltaY
})

document.addEventListener("alpine:init", () => {
    Alpine.data("cardData", (card) => ({
        card: card,
        cardIsOpen: false,
        cardPage: "main",
        cardToggle(item) {
            if (!this.panelIsUp) this.panelIsUp = true
            this.nowCard = this.card
            this.cardIsOpen = true
            this.cardPage = item
        },
        cardOpen() {
            if (!this.panelIsUp) this.panelIsUp = true
            this.nowCard = this.card
            this.cardIsOpen = !this.cardIsOpen
        },
        cardClose() {
            if (!this.panelIsUp || this.card != this.nowCard) this.cardIsOpen = false
        },
        get cardSymbol() {
            return this.cardIsOpen ? "∧" : "∨"
        }
    })),
        Alpine.data("cardPages", (page) => ({
            page: page,
            cardIsShow() {
                return this.cardIsOpen && this.cardPage == this.page
            }
        }))
    Alpine.data("mask", () => ({
        open: true,
    }))
});
