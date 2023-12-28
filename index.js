
function changeFont() {
    const fontFamily = document.getElementById("fontFamily").value;
    document.getElementById("textBox").style.fontFamily = fontFamily;
    document.getElementById("textarea").style.fontFamily=fontFamily;
}

function changeFontSize(){
    const fontSize=document.getElementById("fontSize").value;
    document.getElementById("textBox").style.fontSize=fontSize+"px";
    // document.getElementById("textarea").style.fontSize=fontSize+"px";
}

function changeFontColor() {
    const fontColor = document.getElementById("fontColor").value;
    document.getElementById("textBox").style.color = fontColor;
    document.getElementById("textarea").style.color = fontColor;
    
}


let counter = 0;
let originalCounter=0;
let undoStack = [];
let redoStack = [];
function addText(){
    const newText=document.getElementById('newText').value;
    document.getElementById("textBox").innerHTML+=newText;
    document.getElementById('newText').value='';

    if (newText.trim() !== '') {
        originalCounter = counter;
        counter++;
        undoStack.push({ counter, text: newText });
        document.getElementById('Counter').innerText = counter;
        console.log(counter);
    }

}

function undo(){
    // counter = Math.max(0, counter - 1);
    // document.getElementById('Counter').innerText = counter;
    if (counter > 0) {
        counter--;
        document.getElementById('Counter').innerText = counter;

        const removedText = undoStack.pop();
        if (removedText) {
            redoStack.push(removedText);
        }

        const textBox = document.getElementById("textBox");
        let textContent = textBox.innerText.trim();
        const lastWordIndex = textContent.lastIndexOf(' ');

        if (lastWordIndex !== -1) {
            textBox.innerText = textContent.substring(0, lastWordIndex);
        } else {
            textBox.innerText = '';
        }
    }
        
}
function redo() {
    const redoText = redoStack.pop();
    if (redoText) {
        counter++;
        document.getElementById('Counter').innerText = counter;
        document.getElementById("textBox").innerText += redoText.text;
        undoStack.push({ counter, text: redoText.text });
    }
}

document.getElementById("textBox").addEventListener("keydown", function (event) {
    event.preventDefault();
});

function handleUpper(){
       const textarea=document.getElementById('textarea')
       textarea.value=textarea.value.toUpperCase()
}
function handleLower(){
    const textarea=document.getElementById('textarea')
    textarea.value=textarea.value.toLowerCase()
}
function handleFirstUpper(){
    const textarea = document.getElementById('textarea');
    let words = textarea.value.split(' ');
    let updatedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    textarea.value = updatedWords.join(' ');
}

