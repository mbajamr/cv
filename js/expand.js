
    function toggleItem(header) {
        const item = header.parentElement;
        const button = header.querySelector(".toggle");

        item.classList.toggle("open");

        if (item.classList.contains("open")) {
            button.textContent = "−";
            button.setAttribute("aria-label", "Collapse");
        } else {
            button.textContent = "+";
            button.setAttribute("aria-label", "Expand");
        }
    }