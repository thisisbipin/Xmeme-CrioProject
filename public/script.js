
function injectCard(currmeme) {
    const container = document.getElementById('container');
    let card = document.createElement('div');
    card.className = 'card';

    let cardName = document.createElement('p');
    cardName.className = 'cardName';
    cardName.textContent = 'Name: ' + currmeme.name;

    let cardCaption = document.createElement('p');
    cardCaption.className = 'cardCaption';
    cardCaption.textContent = 'Caption: ' + currmeme.caption;

    let image = document.createElement('img');
    image.className = 'image';
    image.src = currmeme.url;

    card.appendChild(cardName);
    card.appendChild(cardCaption);
    card.appendChild(image);
    container.appendChild(card);

}
async function getMeme() {
    let meme = await fetch('/memes');
    meme = await meme.json();
    let memeCount = meme.length;
    meme.sort((a, b) => a.date - b.date);
    console.log(meme);
    console.log(memeCount);
    for (let i = memeCount - 1; i >= 0; i--)
        injectCard(meme[i]);
}
getMeme();
