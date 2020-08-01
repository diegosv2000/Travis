// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC5DOEZPsjhh8Xd4oIam8i_aWw9Jpz_2U0",
    authDomain: "travis-cb0f3.firebaseapp.com",
    databaseURL: "https://travis-cb0f3.firebaseio.com",
    projectId: "travis-cb0f3",
    storageBucket: "travis-cb0f3.appspot.com",
    messagingSenderId: "824237698457",
    appId: "1:824237698457:web:0373e88162c0132309f708",
    measurementId: "G-W3TV01JE6L"
});
var db = firebase.firestore();

function Home(){
    document.getElementById("container").innerHTML=' <h1>CORONAVIRUS(COVID-19)</h1><div class="data"><div class="infected">Casos Totales <h2>333867</h2> </div><div class="active">Casos Activos <h2>98377</h2>  </div><div class="recovered">Recuperados <h2>223261</h2> </div><div class="deceased">Fallecidos <h2>12156</h2> </div><div class="discarded">Descartados <h2>1630054</h2> </div></div><div class="graphics"><div><p>CasosTotales vs CasosActivos vs Fallecidos</p><canvas id="stat1"></canvas></div><div><p>CasosPositivos vs PruebasDescartadas</p><canvas id="stat2"></canvas></div></div><div class="covInfo"><h2>CORONAVIRUS</h2><p>La COVID‑19 es la enfermedad infecciosa causada por el coronavirus que se ha descubierto más recientemente. Tanto este nuevo virus como la enfermedad que provoca eran desconocidos antes de que estallara el brote en Wuhan (China) en diciembre de 2019. Actualmente la COVID‑19 es una pandemia que afecta a muchos países de todo el mundo. <br>Recomendaciones:<ul><li>Lávese las manos con frecuencia. Use agua y jabón o un desinfectante de manos a base de alcohol.</li><li>Manténgase a una distancia segura de cualquier persona que tosa o estornude.</li><li>No se toque los ojos, la nariz o la boca.</li><li>Cuando tosa o estornude, cúbrase la nariz y la boca con el codo flexionado o con un pañuelo.</li><li>Quédese en casa si se siente mal.</li><li>Si tiene fiebre, tos y dificultad para respirar, solicite atención médica. Llame con antelación.</li></ul></p></div> ';

    var ctx= document.getElementById("stat1").getContext("2d");
    var myChart= new Chart(ctx,{
    type:"pie",
    data:{
        labels:['Casos Totales','Recuperados','Fallecidos'],
        datasets:[{
                label:'Num datos',
                data:[333867,223261,12156],
                backgroundColor:[
                    'rgba(247, 212, 205)',
                    'rgba(197, 232, 215)',
                    'rgba(145, 145, 145 )'
                ],
        }]
    },
    options: {
        responsive: false,
        pointLabels:{
            fontSize:500
        }
    }

});

    var ctx= document.getElementById("stat2").getContext("2d");
    var myChart= new Chart(ctx,{
    type:"pie",
    data:{
        labels:['Casos Positivos','Pruebas Descartadas'],
        datasets:[{
                label:'Num datos',
                data:[333867,1630054],
                backgroundColor:[
                    'rgba(247, 212, 205)',
                    'rgba(235, 205, 247)'
                ],
        }]
    },
    options: {
        responsive: false,
        pointLabels:{
            fontSize:500
        }
    }

    });
    }

function RegLoc(){
    document.getElementById("container").innerHTML=`
    <h1>Registrar Local</h1>
    <div class="form">
        <div id="form">
            <label for="telephone">Telefono</label>
            <div>
            <i class="fas fa-phone"></i><input type="number" placeholder="4168523" name="telephone" id="telephone" required>
            </div>
            
            
            <label for="name">Nombre</label>
            <div>
            <i class="fas fa-store"></i><input type="text" placeholder="Don pepe" name="name" id="name" required>
            </div>
            
            
            <label for="adress">Direccion</label>
            <div>
            <i class="fas fa-map-marker-alt"></i><input type="text" placeholder="Av. Brasil 157" name="adress" id="adress" required>
            </div>
            
            
            <button id="addLocal">Registrar</button>
        </div>
    </div>
    `;
    var addLocal = document.getElementById("addLocal");
    addLocal.addEventListener("click",SendLocalData)
}
function SendLocalData(){
    var telephone=document.getElementById("telephone").value;
    var name=document.getElementById("name").value;
    var adress=document.getElementById("adress").value;
    //Add New Local
    db.collection("local").add({
        Telephone:telephone,
        Name: name,
        Adress: adress,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    swal("Registered", "Successfully Registered Data", "success");

    document.getElementById("telephone").value="";
    document.getElementById("name").value="";
    document.getElementById("adress").value="";


}





function LogIn(){
    document.getElementById("container").innerHTML=`
    <h1>Iniciar Sesión</h1>
    <div class="form">
        <div id="form">            
            
            <label for="name">Email</label>
            <div>
            <i class="fas fa-user-secret"></i><input type="text" placeholder="example@gmail.com" name="email" id="email" required>
            </div>
            
            <label for="pass">Contraseña</label>
            <div>
            <i class="fas fa-lock"></i><input type="password" placeholder="********" name="pass" id="psw" required>
            </div>
            
            <a href="pages/user.html"><button id="userLogIn">Iniciar</button></a>
        </div>
    </div>
    `;
    var email = document.getElementById("email").value;
    var psw = document.getElementById("psw").value;5

    var user = document.getElementById("userLogIn");
    user.onclick=function(){
        firebase.auth().signInWithEmailAndPassword(email, psw).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }
}

function app(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("Iniciaste sesión");
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            // ...
        } else {
            console.log("No Iniciaste sesión registraste");
        }
    });
}
app();








function SignIn(){
    document.getElementById("container").innerHTML=`
    <h1>Crear Cuenta</h1>
    <div class="form">
        <div id="form">            
            
            <label for="name">Nombres</label>
            <div>
            <i class="fas fa-user"></i></i><input type="text" placeholder="Diego" name="name" id="name" required>
            </div>
            
            <label for="lname">Apellidos</label>
            <div>
            <i class="fas fa-user"></i></i><input type="text" placeholder="Salvador" name="lName" id="lName"  required>
            </div>

            <label for="email">Email</label>
            <div>
            <i class="fas fa-user-secret"></i><input type="text" placeholder="example@gmail.com" name="email" id="email" required>
            </div>
            
            <label for="pass">Contraseña</label>
            <div>
            <i class="fas fa-lock"></i><input type="password" placeholder="********" name="pass" id="psw" required>
            </div>
            
            <button id="addUser" >Guardar Datos</button>
        </div>
    </div>
    `;

    // Add User
    var addUser=document.getElementById("addUser");
    addUser.addEventListener("click",addNewUser)

}
function addNewUser(){
    var name = document.getElementById("name").value;
    var lName = document.getElementById("lName").value;
    var email = document.getElementById("email").value;
    var psw = document.getElementById("psw").value;
    db.collection("users").add({
        Name: name,
        LName: lName,
        Email: email,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    //Register user
    firebase.auth().createUserWithEmailAndPassword(email, psw).catch(function(error){
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });

    swal("Registered", "Successfully Registered Data", "success");
    document.getElementById("name").value = "";
    document.getElementById("lName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("psw").value = "";
}











function RegEn_Ex(){
    document.getElementById("container").innerHTML=`
        <h1>¡Registra tu visita!</h1>
        <div class="form">
            <div id="form">
                <label for="telephone">Ingresar Telefono</label>
                <div>
                    <i class="fas fa-phone"></i><input type="number" placeholder="4168523" name="telephone" required>
                </div>
                <button>Registrar Entrada</button>
            </div>
        </div>
    `;
}
function Hist(){
    document.getElementById("container").innerHTML=`

    `;
}
function SignOut(){
    firebase.auth().signOut().then(function(){
        console.log("Cerraste Sesión");
      }).catch(function (error){
        console.log(error)
    })
}
