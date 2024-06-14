const questions = [
    {
        'que': 'What do you want?',
        'a': 'Sukh',
        'b': 'Shanti',
        'c': 'Sukoon',
        'd': 'all of the above',
        'correct': 'd'
    },

    {
        'que': 'What is your Branch?',
        'a': 'CSE',
        'b': 'AIML',
        'c': 'ECE',
        'd': 'DS',
        'correct': 'a'

    },

    {
        'que': 'Which semester',
        'a': 'II',
        'b': 'III',
        'c': 'IV',
        'd': 'V',
        'correct': 'c'
    }
]

let index=0;
let total=questions.length;
let right=0,wrong=0;

const quesBox=document.getElementById("quesBox");
const optionInputs=document.querySelectorAll('.options')
function loadQuestion(){

    if(index===total){
        return endQuiz();
    }
    reset();

    const data=questions[index];
    //console.log(data);
    quesBox.innerText=`${index+1}) ${data.que}`;
    //nextSiblingelement = label
    optionInputs[0].nextElementSibling.innerHTML=data.a;
    optionInputs[1].nextElementSibling.innerHTML=data.b;
    optionInputs[2].nextElementSibling.innerHTML=data.c;
    optionInputs[3].nextElementSibling.innerHTML=data.d;
}


function submitQuiz(){
    const data=questions[index];
    const ans=getAnswer();
    console.log(ans,data.correct);
    if(ans === data.correct){
        right++;
    }else{
        wrong++;
    }
    index++;
    loadQuestion();
    return;
}

const getAnswer=()=>{
    let answer;
    optionInputs.forEach(
        (input) => {
            if(input.checked){
                //console.log("yes")
                answer=input.value;
                //console.log(input.value) 
            }
        }
    )
    return answer;
}

function reset(){
    optionInputs.forEach(
        (input) =>{
            input.checked = false;
        }
    )
}

function endQuiz(){
    document.getElementById("box").innerHTML = `
        <h3> Quiz Ended </h3>
        <br></br>
        <h2> Score: ${right} / ${total} </h2>
    `
}

//initial call
loadQuestion();