let apiList = [];

function addApi() {
    const input = document.getElementById("apiInput");
    const url = input.value.trim();

    if (url === "") {
        alert("Please enter a valid URL");
        return;
    }

    apiList.push(url);
    input.value = "";

    displayApis();
}

function displayApis() {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<h3>Added APIs:</h3>";

    apiList.forEach(api => {
        resultDiv.innerHTML += `<p>${api}</p>`;
    });
}

async function checkApis() {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "<h3>Checking APIs...</h3>";

    for (let url of apiList) {
        try {
            const response = await fetch("http://localhost:5000/status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ url: url })
            });

            const data = await response.json();

            let statusText = data.status === "UP" ? "✅ UP" : "❌ DOWN";

            resultDiv.innerHTML += `
                <p>
                    ${url} → 
                    <strong>${statusText}</strong>, 
                    Time: ${data.response_time} sec
                </p>
            `;
        } catch (error) {
            resultDiv.innerHTML += `
                <p>
                    ${url} → 
                    <strong style="color:red;">❌ ERROR</strong>
                </p>
            `;
        }
    }
}