const messages = [
    "Are you sure? The squirrels will be sad...",
    "Really sure?? The trees are crying...",
    "Don't leave me hanging like a leaf!",
    "Pookie please... think of the butterflies!",
    "I'll be lost in the woods without you!",
    "If you say no, I'll turn into a grumpy toad...",
    "My heart is wilting! 🥀",
    "I will be very very very sad...",
    "Ok fine, I'll go live in a cave...",
    "Just kidding, please say yes! 🌲✨"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    
    // Change text
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    
    // Grow the Yes button (standard logic)
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.4}px`;
    
    // Add a little wobble to the No button
    noButton.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
}

function handleYesClick() {
    window.location.href = "terms.html";
}
