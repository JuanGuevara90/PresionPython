var database = firebase.database();
const presionContainer =document.getElementById("tbody");

let ref = database.ref("presiones");

ref.on("value", gotData, errData);

function gotData(data){
/*     presionContainer.innerHTML=``; */
    x = data.val();
    count=1;
    value=true;
    for (n in x){
        dato= x[n]
        presionContainer.innerHTML+=`<tr>
            <td >${count}</td>
            <td >${dato.fecha}</td>
            <td >${dato.hora}</td>
            <td > ${dato.presion}</td>
        </tr>`
        count+=1;
    }
}
function errData(err){
    console.log("Error");
    console.log(err);
}