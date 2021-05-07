"use strict";
import { postsArr } from "./posts.js";

// selectoriai
const mainArticle = document.querySelector("#article");
const mainArticleDiv = document.createElement("div");
const modalContents = document.querySelector(".modal-content");
const modalMain = document.querySelector("#myModal");
const inputPosts = document.getElementById("inputPosts");
const inputBtn = document.getElementById("btnPosts");
const filterBtnOne = document.getElementById("btn-id__one");
const filterBtnTwo = document.getElementById("btn-id__two");
// add elements
mainArticleDiv.classList.add("article--div");
mainArticle.append(mainArticleDiv);

// create elements
(function generateHtml() {
  let allPosts = "";
  postsArr.forEach((el) => {
    allPosts += `<div class="posts"><h1>${el.title}</h1>
            <p class="hide--text">${el.body}</p>
            <button class="btn--more">Read More</button></div>`;
  });
  mainArticleDiv.innerHTML = allPosts;
})();

// type how many to show
function howManyToPrint() {
  let allPosts = "";
  postsArr.forEach((el, index) => {
    if (index + 1 <= inputPosts.value) {
      allPosts += `<div class="posts"><h1>${el.title}</h1>
                   <p class="hide--text">${el.body}</p>
                   <button class="btn--more">Read More</button></div>`;
    }
  });
  inputPosts.value = "";
  mainArticleDiv.innerHTML = allPosts;
}

// checker
function printChecker() {
  const isNotANum = isNaN(inputPosts.value);

  if (inputPosts.value <= 0 || inputPosts.value > postsArr.length) {
    inputPosts.value = "";
    alert("The number is negative, or exceeds posts amount");
    return;
  }
  if (isNotANum === true) {
    inputPosts.value = "";
    alert("Please input a number");
    return;
  } else howManyToPrint();
}

inputBtn.addEventListener("click", printChecker);

// filter posts by ID.
//////////
function filterById(arg) {
  let allPosts = "";
  postsArr.forEach((el) => {
    if (arg == el.userId) {
      allPosts += `<div class="posts"><h1>${el.title}</h1>
      <p class="hide--text">${el.body}</p>
      <button class="btn--more">Read More</button></div>`;
    }
  });
  mainArticleDiv.innerHTML = allPosts;
}

// button one
filterBtnOne.addEventListener("click", function (e) {
  const className = e.target.classList;
  filterById(className);
});
// button two
filterBtnTwo.addEventListener("click", function (e) {
  const className = e.target.classList;
  filterById(className);
});

// Read more --> Open Modal
mainArticle.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn--more")) {
    // jeigu pasiekt h1
    //     console.log(pText.previousElementSibling);

    const pText = e.target.previousElementSibling.textContent;
    modalContents.innerHTML = `
      <p>${pText}
      </p><button id="close--btn">Close</button> `;
    modalMain.style.display = "block";
  }

  // Close modal
  document.querySelector("#close--btn").addEventListener("click", function () {
    modalMain.style.display = "none";
  });
});

// close if clicked outside the box
modalMain.addEventListener("click", function (e) {
  if (e.target.matches("#myModal")) {
    modalMain.style.display = "none";
  }
});
