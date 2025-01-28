window.onload = setup
function setup() {
    // console.log("running setup");
    // console.log(document.getElementById("one"));
    // console.log(document.querySelector("#one"));

    // console.log(document.querySelectorAll("div"));
    // console.log(document.querySelectorAll("div").length);
    // console.log(document.querySelectorAll("div")[0]);

    // console.log(document.getElementsByClassName("square_shape"));
    // console.log(document.getElementsByClassName("square_shape").length);
    // console.log(document.getElementsByClassName("square_shape")[0]);

    // console.log(document.querySelector(".square_shape"));

    // console.log(document.querySelectorAll(".square_shape"));
    // console.log(document.querySelectorAll(".square_shape").length);
    // console.log(document.querySelectorAll(".square_shape")[0]);

    // console.log(document.getElementById("two").innerHTML);

    // console.log(document.getElementById("two").textContent);

    // console.log(document.querySelector("#five").getAttribute("id"));
    // console.log(document.querySelector("#five").getAttribute("class"));

    // console.log(document.querySelector("#two").getAttribute("class"));
    // console.log(typeof (document.querySelector("#two").getAttribute("class")));

    // console.log(document.querySelector("#two").classList);

    // console.log(document.querySelector("#five").getAttributeNames());

    // console.log(document.querySelector("#one").style);
    // console.log(document.querySelector("#one").style.background);

    // console.log(document.querySelector("#six").style);
    // console.log(document.querySelector("#six").style.background);
    // console.log(document.querySelector("#six").style.width);

    // console.log(document.querySelectorAll("span")[0].parentElement)
    // console.log(document.querySelectorAll("span")[0].parentElement.parentElement)
    // console.log(document.querySelector(".wrapper_flex_box").children)
    // console.log(document.querySelector(".wrapper_flex_box").children[0])

    // document.querySelector("#two").children[0].innerHTML = "<h2> this is now a header</h2>";

    // //get the group
    // let allSquareShapes = document.querySelectorAll(".square_shape");
    // //go through each element
    // for (let singleSquareShape of allSquareShapes) {
    //     //get children
    //     if (singleSquareShape.querySelector("p span") !== null) {
    //         singleSquareShape.querySelector("p span").textContent += " other Content"
    //     }

    // }

    // document.querySelector(".square_shape").classList.remove("square_shape"); //first one only
    // document.querySelector("p span").classList.add("change_span");

    // document.querySelectorAll(".another_class")[0].setAttribute("id", "newTest")
    // console.log(document.querySelectorAll(".another_class")[0])

    // //second elements grandparent
    // let element = document.querySelectorAll("span")[1].parentElement.parentElement
    // element.removeAttribute("id")
    // console.log(element)

    // //add
    // document.querySelector("#four").style.background = "cornflowerBlue";
    // document.querySelector("#four").style.borderColor = "darkblue";
    // //modify
    // document.querySelector("#one").style.background = "pink";
    // document.querySelector("#one").style.borderColor = "darkblue";

    //new element
    let newDiv = document.createElement("div");
    newDiv.classList.add("square_shape");
    newDiv.innerHTML = "<p> NEW ELEMENT </p>";
    newDiv.style.backgroundColor = "purple";
    // access parent element
    let parentElement = document.querySelector(".wrapper_flex_box")
    parentElement.appendChild(newDiv)

    let newDivTwo = document.createElement("div");
    newDivTwo.classList.add("square_shape");
    newDivTwo.innerHTML = "<p> NEW ELEMENT TWO </p>";
    newDivTwo.style.backgroundColor = "yellow";
    newDivTwo.querySelector("p").style.color = "black"
    // access parent element
    let sibling = document.querySelector("#three")
    let parentElementAgain = document.querySelector(".wrapper_flex_box")
    parentElementAgain.insertBefore(newDivTwo, sibling);

    let parentElementToRemoveFrom = document.querySelector(".wrapper_flex_box")
    let toRemove = document.getElementById("six");
    parentElementToRemoveFrom.removeChild(toRemove);
}