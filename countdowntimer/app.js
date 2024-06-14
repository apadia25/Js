const endDate="6 NOV 2024 12:00 AM";

document.getElementById("end-date").innerText=endDate;

const input=document.querySelectorAll("input")

function clock(){
    const end = new Date(endDate);
    const now = new Date();
    const diff=(end-now)/1000; //seconds  
    //console.log(diff);
    // console.log(end);
    // console.log(now);
     
    //CONVERT TO DAYS
    input[0].value=Math.floor(diff/3600/24);

    //CONVERT TO HOURS
    input[1].value=Math.floor(diff/3600)%24

    //CONVERT TO MINUTES
    input[2].value=Math.floor(diff/60)%60

    //CONVERT TO SECONDS
    input[3].value=Math.floor(diff)%60
}

//inital call
clock();

/*
1day=24hr
1hr=60min
60min=3600sec
1min=60sec */

setInterval(
    ()=>{
        clock();
    },
    1000
);