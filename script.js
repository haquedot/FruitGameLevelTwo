// Function to allow dropping
function dragF() {
    allowDrop(ev);
    drag(ev);
    drop(ev);
}

function allowDrop(ev) {
    ev.preventDefault();
}

// Function to handle the drag event
function drag(ev) {
    ev.dataTransfer.setData("text/plain", ev.target.id);
}

// Function to handle the drop event
function drop(ev) {
    ev.preventDefault();
    // const drag = document.getElementById("dropTarget");
    const dragItem = document.getElementsByClassName("drag");
    var data = ev.dataTransfer.getData("text/plain");
    var draggedElement = document.getElementById(data);
    var dropTarget = document.getElementById("dropTarget");

    var spanElements = dropTarget.getElementsByClassName("mark");
    console.log(draggedElement);
    dropTarget.appendChild(draggedElement);
    document.getElementById("dragText").style.display = "none"; // Hide the drag text

    // Check if the dropped item is a fruit
    if (draggedElement.classList.contains("fruit")) {
        spanElements[0].style.display = 'block';
        document.getElementById("mark").innerHTML = "&#10003;"; // Add a tick mark
        document.getElementById("mark").style.color = "green"; // Set color to green
        document.getElementById("awesomeSound").play(); // Play the awesome sound
        updateScore(1); // Increment the score by 1
    } else {
        spanElements[0].style.display = 'block';
        document.getElementById("mark").innerHTML = "&#10007;"; // Add a cross mark
        document.getElementById("mark").style.color = "red"; // Set color to red
        document.getElementById("yuckySound").play(); // Play the yucky sound
        updateScore(-1); // Decrement the score by 1
    }
    if (dropTarget.hasChildNodes) {
        // console.log('hello');
        // draggedElement.draggable = false; // Exit the function if the dragged element is already in the dropTarget
        for (var i = 0; i < dragItem.length; i++) {
            dragItem[i].draggable = false;
        }
    }
}

// Get the "Next" button
const nextButton = document.querySelector(".button-1");

// Add click event listener to the "Next" button
nextButton.addEventListener("click", function() {
    addRandomItems();
    clearDropTarget();

});

// Function to add random items to the items div
function addRandomItems() {
    // Get the items div
    const itemsDiv = document.getElementById("items");

    // Remove existing items
    while (itemsDiv.firstChild) {
        itemsDiv.removeChild(itemsDiv.firstChild);
    }

    // Array of available item images
    const itemImages = [
        "random/corn.svg",
        "random/redChilli.svg",
        "random/brinjal.svg",
        "random/cucumber.svg",
        "random/pea.svg",
        "random/tomato.svg",
        "random/bucket.svg",
        "random/football.svg",
        "random/toy-train.svg",
        "random/rubiks-cube.svg",
        "random/rocker.svg",

    ];

    const fruits = [
        "fruits/apple.svg",
        "fruits/orange.svg",
        "fruits/bananas.svg",
        "fruits/mango.svg",
        "fruits/grapes.svg",
        "fruits/watermelon.svg",
        "fruits/strawberry.svg",
        "fruits/pineapple.svg"




    ];

    // Randomly select a position index for the fruit item
    const fruitPositionIndex = Math.floor(Math.random() * 5);

    // Create additional random items (non-fruit)
    for (let i = 0; i < 5; i++) {
        let itemImage;
        let itemAlt;

        if (i === fruitPositionIndex) {
            // Randomly select a fruit image from the fruits array
            const randomFruitIndex = Math.floor(Math.random() * fruits.length);
            itemImage = fruits[randomFruitIndex];
            itemAlt = "Fruit";
            fruits.splice(randomFruitIndex, 1); // Remove the selected fruit from the array
        } else {
            // Randomly select an item image from the itemImages array
            const randomItemIndex = Math.floor(Math.random() * itemImages.length);
            itemImage = itemImages[randomItemIndex];
            itemAlt = "Item";
            itemImages.splice(randomItemIndex, 1); // Remove the selected item from the array
        }

        // Create a div element for the item
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        // Create an img element for the item
        const itemImg = document.createElement("img");
        itemImg.src = itemImage;
        itemImg.alt = itemAlt;
        itemImg.draggable = true;
        itemImg.id = 'drag' + (i + 1);
        itemImg.classList.add('drag');
        console.log(itemImage.substring(0, 6));
        if (itemImage.substring(0, 6) == 'fruits') {
            itemImg.classList.add('fruit');
        }
        itemImg.addEventListener("dragstart", drag);


        // Append the item to the items div
        itemDiv.appendChild(itemImg);
        itemsDiv.appendChild(itemDiv);
    }
}
// Function to clear the drop target
// function clearDropTarget() {
//     console.log('hello');
//     while (dropTarget.firstChild) {
//         dropTarget.removeChild(dropTarget.firstChild);
//     }
// }
function clearDropTarget() {
    const dropTarget = document.getElementById("dropTarget");

    // Remove any existing img elements
    const imgElements = dropTarget.getElementsByTagName("img");
    while (imgElements.length > 0) {
        imgElements[0].parentNode.removeChild(imgElements[0]);
    }

    // Remove any existing span elements
    const spanElements = dropTarget.getElementsByClassName("mark");
    console.log(spanElements);
    // while (spanElements.length > 0) {
    //     spanElements[0].parentNode.removeChild(spanElements[0]);
    // }
    spanElements[0].style.display = 'none';
    const dragText = document.getElementById("dragText");
    dragText.style.display = "flex";

    // document.getElementById("dragText").style.display = "none"; // Hide the drag text


}
// Function to update the score
function updateScore(scoreChange) {
    const scoreElement = document.getElementById("score");
    const currentScore = parseInt(scoreElement.textContent.split(":")[1]);
    const newScore = currentScore + scoreChange;
    scoreElement.textContent = "Score: " + newScore;
}

theme = document.getElementById("theme");
theme.onclick = function() {
    document.body.classList.toggle("dark-theme");
}