let name = prompt("enter your name: ").trim(); //this line is for aks the user name and remove spaces with a funtion 
let age = (prompt("enter your age:"));//here request the age


//valid here if age is a number, if age is a number this enter in conditional if, else print in the screen a error menssage
if (age !==null && age == false){ //if 
     let age_valid = Number(age);

}else{
    console.error("you didn't enter valid value, try again please.");
}

if (age_valid >= 18){
    console.error("Hi ${name}, you're under 18. Keep learning and enjoying coding!");
}else{
    console.log("Hello ${name}, you are of legal age. Get ready for great opportunities in the world of programming!")
}
