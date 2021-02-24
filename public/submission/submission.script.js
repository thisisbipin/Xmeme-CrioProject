let flag = false;
async function submitmemetrigger() {
    if (flag == true) {
        alert('Already Submitted. Please refresh the browser to submit another meme.');
        return;
    }
    const name = document.getElementById('name').value;
    const url = document.getElementById('url').value;
    const caption = document.getElementById('caption').value;

    if (checkifNULL(name, url, caption) == true)
        return;
    const meme = {
        name: name,
        url: url,
        caption: caption
    }

    const wasSaved = await postMeme(meme);
    if (wasSaved == true) {
        const submitButton = document.getElementById("subbuttonid");
        submitButton.value = 'Submitted';
        flag = true;
    }
}
async function postMeme(meme) {
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(meme)
    };
    let result = await fetch('/memes', options);
    console.log(result.status);
    console.log(meme);
    if (result.status == 409) {
        result = await result.json();
        console.log(result);
        alert(result.state);
        return false;
    }
    return true;
}
function checkifNULL(name, url, caption) {
    if (!name) { alert('Please fill out the Name field.'); return true; }
    else if (!url) { alert('Please fill out the Image URL field.'); return true; }
    else if (!caption) { alert('Please fill out the Caption field.'); return true; }
    return false;
}