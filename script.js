




// defining array to collect data of attandance
let cources  = [];
let presentar = [];
let toatl_classes = [];
let Absent_ar = [];
let sub_container = document.querySelector(".cources");




// console.log(sub_container);
sub_container.style.display = "none";
var list_crs ;




// taking semester information from user
let inpts = document.querySelectorAll(".inputs")
let btn = document.getElementById('entry');
let no_cources;
myfunction = () => {
    let f_name = document.getElementById("fname").value;
    let adm = document.getElementById("adm").value;
    let sem = document.getElementById("sem").value;
    let no_cources = document.getElementById("cources").value
    no_cources = Number(no_cources);
    list_crs = no_cources;
    

    // input validation
    if(!f_name || !adm || !sem || !no_cources){
        alert("plz fill all datail");
    }

    else{
    for(ele of inpts){
    ele.setAttribute('disabled' ,'');
    ele.style.color = "black"; ele.style.border = "none"; ele.style.background = "transparent";
    // ele.style.marginleft = "15px";
    ele.style.fontSize = "25px"
    ele.style.Color = "rgb(50,50,50)"
    ele.style.width = "max-content";
    }
    btn.style.display = "none";

    sub_container.style.display = "flex";
}
}



// array which collects cources name
let btn2 = document.getElementById("crs_sbmt");
let j=0;
btn2.addEventListener('click' , () =>{
    if(j < list_crs){
        cources.push(document.getElementById("cource").value);
        presentar.push(0);
        Absent_ar.push(0);
        toatl_classes.push(0);
        document.getElementById("crs_no").innerHTML = j+2;
        document.getElementById("cource").value = "";
    }
    if(j==list_crs-1){
        // btn2.removeEventListener();
        document.querySelector('.sample1').style.display = "none";
        document.querySelector('.cources');
        document.querySelector('.cources').style.display = "none";
        document.querySelector('.submit_today_attend').style.display = "flex"
        document.getElementById("heading").style.display ="block";
        addsubjects();
    }
    j++
})







// creating attandance sheet
let p = document.createElement("p");
p.classList.add("warning")
p.innerHTML = "You Are in Safe Zone";
document.getElementsByClassName("sample")[0].appendChild(p);
let attandance_sheet = document.getElementById("attandance");


addsubjects = () =>{
    cources.forEach(ele=>{
        let head = document.createElement("div");
        head.classList.add(`sample`);
        // head.classList.add(`${ele}`);
        head.innerHTML = `<h1>${ele}</h1>
        <div><p>Present : <span class = "${ele+1}">0</span></p>   <p>Absent : <span class = "${ele+2}">0</span></p></div>
        <div><p class="present_pres">%Present : <span class = "${ele+3}">100</span>%</p> <P>Total classes :<span class = "${ele+4}">0</span> </P></div>
        <div><label>Mark today Attandance -----</label>  <input type="checkbox" name="" class = "${ele+5}" id="today_attand"></div>
        <p class="warning    ${ele + 0}">You are in Safe Zone</p>`;



        attandance_sheet.appendChild(head);
    })
}




//--------setting date and time ---------
function settime(){
let dte = new Date();
let dd = dte.getDate();
let mm = dte.getMonth()+1;
let yyyy = dte.getFullYear();
let today_date = dd +'/' + mm +'/' + yyyy;
document.getElementById("date").innerHTML = today_date;
document.getElementById("time").innerHTML = dte.toLocaleTimeString('en-US');
}
setInterval(settime , 1000);





// updating attandance regulary BY users using ----SUBMIT BUTTON-------

document.getElementById('attnd_submit').addEventListener('click' ,() =>{
    let defaulterList=0;
    cources.forEach((ele ,idx) =>{
        let ans = document.querySelector(`.${ ele + 5 }`);
        ++toatl_classes[idx];

        console.log(ans.checked);
        if(ans.checked === true){
            ++presentar[idx]
            document.querySelector(`.${ele + 1}`).innerHTML = `${presentar[idx]}`;
        }
        else{
            ++Absent_ar[idx];
            document.querySelector(`.${ele + 2}`).innerHTML = `${Absent_ar[idx]}`;
        }
        let presentage_present = Math.floor(((presentar[idx]*100)/(toatl_classes[idx])));
        document.querySelector(`.${ele + 3}`).innerHTML = `${presentage_present}`;
        document.querySelector(`.${ele + 4}`).innerHTML = `${toatl_classes[idx]}`;

        let warn = document.querySelector(`.${ele + 0 }`);
        if(presentage_present < 80 ){
            let warn = document.querySelector(`.${ele + 0 }`);
            warn.innerHTML = "YOU ARE GOING TO DANGER ";}
        if(presentage_present < 75){
            warn.innerHTML = "YOU ARE IN DEFAULTER LIST ";
            defaulterList =1;
        }
        if(presentage_present > 80){
            warn.innerHTM = "You are in Safe Zone";
        }
    })
    if(defaulterList == 1) 
           { showDefaultNotify();}
})









// creating notification using   ------------------notification api ----------------
if(Notification.permission === "granted"){}
else if(Notification.permission !== "denied"){
    Notification.requestPermission().then(permisssion =>{
        if(Notification.permission !== "denied"){
        alert("we have notification")
        }
        else {alert("plz 🤞🤞 allow us to Notify.");}
    })
}


shownotification = () =>{
    let notify = new Notification("Mark Your Attandance " , {
        body : "mark Your Attandance If you Not ",
        icon: "favicon.png"
    });
}

showDefaultNotify = () =>{
    let DEFAULTERnoti = new Notification("ATTANDANCE SOLVER " , {
        body:"YOU ARE IN DEFAULTER REGION PLZ ATTEND CLASSES REGULARLY",
        icon: "favicon.png"
    });
}

setInterval(shownotification,300000);








