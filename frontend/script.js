async function loadData() {
    try {
        const res = await fetch("http://127.0.0.1:5000/status");
        const data = await res.json();

        const container = document.getElementById("container");
        container.innerHTML = "";

        data.forEach(api => {
            const div = document.createElement("div");
            div.className = "card";

            div.innerHTML = `
                <p><b>${api.api}</b></p>
                <p style="color:${api.status === 'UP' ? 'green' : 'red'}">
                    Status: ${api.status}
                </p>
                <p>${api.response_time} ms</p>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        console.error(error);
        alert("Backend not running!");
    }
}


async function addAPI() {
    const url = document.getElementById("apiInput").value;

    if (!url) {
        alert("Enter API URL!");
        return;
    }

    try {
        await fetch("http://127.0.0.1:5000/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: url })
        });

        alert("API added!");
        document.getElementById("apiInput").value = "";

    } catch (error) {
        console.error(error);
    }
}