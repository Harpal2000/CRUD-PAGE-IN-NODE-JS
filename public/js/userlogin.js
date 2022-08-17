if (typeof window !== 'undefined') {

    let labels = new JSDOM(html).window.document.querySelectorAll("#fc label");

    labels.forEach((label) => {
        label.innerHTML = label.innerText.split("")
            .map(
                (letter, idx) =>
                    `<span  style = "transition-delay:${idx * 100}ms">${letter}</span>`
            )
            .join("");
    });
}