window.onload = run;

function run() {
  document.querySelector("#stepOneButton").addEventListener("click", fetchText);


 /****** PART A:: FETCH */  
 async function fetchText() {
    console.log("in fetch");
    try {
      const response = await fetch("../files/rainbow.txt");
      const raw_rainbow_text = await response.text();

      document.querySelector('#stepOneButton').style.display = 'none';
      document.querySelector('#inputDiv').style.display = 'block';
      document.querySelector('#rainbow_text').textContent = raw_rainbow_text;


      document.querySelector("#resetButton").addEventListener("click", resetPoem);
      runPartB(raw_rainbow_text);
    } catch (e) {console.log(e)}
  }

  /****** PART B:: TEXT PROCESSING  */
  function runPartB(originalRainBowText) {
    document
      .querySelector("#produce-poem")
      .addEventListener("click", producePoem);

   /* FILL IN HERE */
    function producePoem() {
      try{
      console.log(originalRainBowText)
      const phrase = document.querySelector("#phrase").value;
      const newDelimiter = /[.?! |\n]/

      const splitSentences =  phrase.split(newDelimiter);
      const phrase_as_array = splitSentences.filter((x) => {return !(x == "")});


      const dirty_rainbow_tokens = originalRainBowText.split(newDelimiter);
      const rainbow_tokens = dirty_rainbow_tokens.filter((x) => {return !(x == "")});
      
      //SR
      runPartC(rainbow_tokens, phrase_as_array);
      } catch(e){console.log(e)}
    }
  }


  /****** PART C:: POEM CREATION  */
  function runPartC(rainbow_words, seed_phrase_array) {
    try{
    console.log(rainbow_words);
    console.log(seed_phrase_array);
    
    let poem_sentence = "";
    let nextChar = "";

    for (let i = 0; i < seed_phrase_array.length; i++) { // each word in phrase array
      nextChar = seed_phrase_array[i];
      for (let index = 0; index < nextChar.length; index++){ // each character in word
        let currentChar = nextChar[index];
        for(let word of rainbow_words){ // each word in input/rainbow text
          if (word[index] == currentChar){
            poem_sentence += `${word} `;
            break;
          }
        }
      }
    }
    
    poem_sentence = poem_sentence.substring(0, poem_sentence.length - 1);

    //to next stage
    runPartD(poem_sentence);
    } catch(e){console.log(e)}
  }

  
   /****** PART D:: VISUALIZE  */
  function runPartD(new_sentence){
    try{
    document.querySelector("#output").style.display = "flex";
    let output = document.querySelector("#output");
    output.attributes.style.value = "width: 100%; flex-wrap: wrap; justify-content: flex-start; align-content: flex-start; flex-basis: 0;";
    output.style.display = "flex";
    output.addEventListener("mouseover", ()=>{
      console.log("hovered");
      const charList = document.querySelectorAll("p");
      for (let char of charList){
        char.moveToRandom();
      }
      
    })

    let character_list = [];

    class Character {
      constructor(char){
        this.char = char;
        this.color = colorGenerator();
        this.randomPos = [Math.random(), Math.random()];
        this.reference;
      }
 
      moveToRandom(){
        try{
        if (this.reference === undefined){
          return
        };

        this.initialPos = this.reference.getBoundingClientRect();

        this.reference.style.position = "absolute";

        
        while (this.reference.getBoundingClientRect().top != this.randomPos[0] && this.reference.getBoundingClientRect().left != this.randomPos[1]){
          if (this.reference.getBoundingClientRect().top < this.randomPos[0]){
            this.reference.style.top = `${this.reference.getBoundingClientRect().top + 1}px`;
          } else if (this.reference.getBoundingClientRect().top > this.randomPos[0]){
            this.reference.style.top = `${this.reference.getBoundingClientRect().top - 1}px`;
          }
        }

        } catch(e){console.log(e)}
          
      
        
      }
        
    }

    for (let i = 0; i < new_sentence.length; i++){
      const newCharacter = new Character(new_sentence[i], [Math.random(), Math.random()]);
      character_list.push(newCharacter);
      addCharacter(newCharacter);

    }

    
    function addCharacter(character){
      const newElement = document.createElement("div");
      // newElement.style.position = "absolute";
      const elementIndex = character_list.indexOf(character);
      // newElement.style.top = `${elementIndex}%`;
      // newElement.style.left = `${elementIndex * 10}%`;
      character.reference = newElement;

      newElement.innerHTML = character.char;
      newElement.style.color = `rgb(${character.color[0]},${character.color[1]},${character.color[2]})`
      
      output.appendChild(newElement);
    }
    

    function colorGenerator(){
      try{
      const green = ((Math.random() * 127.5) * 2);        
      const blue = ((Math.random() * 127.5) * 2);
      return [255,green,blue];
      }catch(e){console.log(e)}
    }

  }catch(e){console.log(e)}
  }



  /****** PART E:: RESET  */
  function resetPoem() {
  /*** TO FILL IN */
  const outputID = document.querySelector("#output");
  outputID.innerHTML = "";
  outputID.style.display = "none";
  
  
  document.querySelector("#phrase").value = "";
  }
} //window onload


