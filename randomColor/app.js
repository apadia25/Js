// const getColor = () => {
//     // hex code
//     const randomNumber = Math.random();
//     console.log(randomNumber);
// }

function getColor(){
    const randomNumber = Math.floor(Math.random()*16777215);
  
    //  to get number which can become hexadecimal code

    const randomCode="#"+randomNumber.toString(16);
    //16=hexadecimal

    document.body.style.backgroundColor = randomCode;

    document.getElementById("color-code").innerText=randomCode;

    console.log(randomNumber,randomCode);

    //auto copy
    navigator.clipboard.writeText(randomCode);
}

//event call
document.getElementById("btn").addEventListener("click", getColor);


//initial call
getColor();
