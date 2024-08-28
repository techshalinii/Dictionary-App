const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
    });

const getWordInfo = async (word)=>{

    try {
        
   const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
   const data = await response.json();
    let definitions = data[0].meanings[0].definitions[0];
   resultDiv.innerHTML =
    `<div class="word"><h2><strong>Word:</strong> ${data[0].word}</h2>
    <p>${data[0].meanings[0].partOfSpeech}</p></div>
    <div class="info">
    <div class="card"><p><strong>Meaning: </strong><br><br>${definitions.definition === undefined ? "Not Found" : definitions.definition}</p></div>
    <div class="card"><p><strong>Example:</strong><br><br>${definitions.example === undefined ? "Not Found" : definitions.example}</p></div>
    <div class="card"><p><strong>Antonyms:</strong><br><br>${definitions.antonyms.length === 0 ? "Not Found" : definitions.antonyms }</p></div></div>
    `;
    resultDiv.innerHTML+= `<div class="read"><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;

}
 catch (error) {
      resultDiv.innerHTML= `<p>Sorry, the Word could not be found</p>` 
}
}