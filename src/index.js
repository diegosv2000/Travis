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
var userEmail;

const dataV = {
    Total : 407492,
    Actives : 104556,
    Recovered : 283915,
    Deceased : 19021,
    Discarded : 1975196,
    Lethality: 4.85
}


function Present(){
    document.getElementById("container").innerHTML=` 
    
    <h1>CORONAVIRUS(COVID-19)</h1>
        <div class="data">

            
                <div class="infected">Casos Totales <h2>${dataV.Total}</h2> </div>
                <div class="active">Casos Activos <h2>${dataV.Actives}</h2>  </div>
                <div class="recovered">Recuperados <h2>${dataV.Recovered}</h2> </div>

                <div class="deceased">Fallecidos <h2>${dataV.Deceased}</h2> </div>
                <div class="discarded">Descartados <h2>${dataV.Discarded}</h2> </div>
                <div class="lethality">Letalidad <h2>${dataV.Lethality}%</h2> </div>     

        </div>
            <div class="graphics">
            <div>
            <p>CasosTotales vs CasosActivos vs Fallecidos</p>
            <canvas id="stat1"></canvas>
            </div>
            <div>
            <p>CasosPositivos vs PruebasDescartadas</p>
            <canvas id="stat2"></canvas>
            </div>
            </div>
            <div class="covInfo">
                <h2>CORONAVIRUS</h2>
                <p>
                La COVID‑19 es la enfermedad infecciosa causada por el coronavirus que se ha descubierto
                más recientemente. Tanto este nuevo virus como la enfermedad que provoca eran desconocidos
                antes de que estallara el brote en Wuhan (China) en diciembre de 2019. Actualmente la 
                COVID‑19 es una pandemia que afecta a muchos países de todo el mundo. <br>
                Recomendaciones:
                </p>
                <ul>
                    <li>Lávese las manos con frecuencia. Use agua y jabón o un desinfectante de manos a base de alcohol.</li>
                    <li>Manténgase a una distancia segura de cualquier persona que tosa o estornude.</li>
                    <li>No se toque los ojos, la nariz o la boca.</li>
                    <li>Cuando tosa o estornude, cúbrase la nariz y la boca con el codo flexionado o con un pañuelo.</li>
                    <li>Quédese en casa si se siente mal.</li>
                    <li>Si tiene fiebre, tos y dificultad para respirar, solicite atención médica. Llame con antelación.</li>
                </ul>
                
            </div>

    
    `;

    Statistics();
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
    swal("", "Local Registrado", "success");

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
            
            <button id="userLogIn">Iniciar</button>
        </div>
    </div>
    `;


    var user = document.getElementById("userLogIn");
    user.addEventListener("click",logInWithEmail);

}

function logInWithEmail(){
    var email = document.getElementById("email").value;
    var psw = document.getElementById("psw").value;
    firebase.auth().signInWithEmailAndPassword(email, psw).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    });
    console.log("Funciona");
    userEmail = email;
}

function app(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            document.getElementById("pushbarMenu").innerHTML=`
            

                <button class="buttonNav" onclick="Present()">Actual (Covid-19)</button>
                <button class="buttonNav" onclick="RegEn_Ex()">Registrar Visita</button>
                <button class="buttonNav" onclick="Hist()">Historial</button>
                <button class="buttonNav" onclick="SignOut()">Cerrar Sesión</button>
        
            
            `;
            document.getElementById("pageContainer").innerHTML=`
                <header>
                    <a href="#"><img src="../img/Logo.png" alt="Logo"></a>
                </header>
                <main>
                    <div id="container">
                    <h1>CORONAVIRUS(COVID-19)</h1>
                        <div class="data">
                            <div class="infected">Casos Totales <h2>${dataV.Total}</h2> </div>
                            <div class="active">Casos Activos <h2>${dataV.Actives}</h2>  </div>
                            <div class="recovered">Recuperados <h2>${dataV.Recovered}</h2> </div>

                            <div class="deceased">Fallecidos <h2>${dataV.Deceased}</h2> </div>
                            <div class="discarded">Descartados <h2>${dataV.Discarded}</h2> </div>
                            <div class="lethality">Letalidad <h2>${dataV.Lethality}%</h2> </div>          
                        </div>
                            <div class="graphics">
                            <div>
                            <p>CasosTotales vs CasosActivos vs Fallecidos</p>
                            <canvas id="stat1"></canvas>
                            </div>
                            <div>
                            <p>CasosPositivos vs PruebasDescartadas</p>
                            <canvas id="stat2"></canvas>
                            </div>
                            </div>
                            <div class="covInfo">
                                <h2>CORONAVIRUS</h2>
                                <p>
                                La COVID‑19 es la enfermedad infecciosa causada por el coronavirus que se ha descubierto
                                más recientemente. Tanto este nuevo virus como la enfermedad que provoca eran desconocidos
                                antes de que estallara el brote en Wuhan (China) en diciembre de 2019. Actualmente la 
                                COVID‑19 es una pandemia que afecta a muchos países de todo el mundo. <br>
                                Recomendaciones:
                                    <ul>
                                        <li>Lávese las manos con frecuencia. Use agua y jabón o un desinfectante de manos a base de alcohol.</li>
                                        <li>Manténgase a una distancia segura de cualquier persona que tosa o estornude.</li>
                                        <li>No se toque los ojos, la nariz o la boca.</li>
                                        <li>Cuando tosa o estornude, cúbrase la nariz y la boca con el codo flexionado o con un pañuelo.</li>
                                        <li>Quédese en casa si se siente mal.</li>
                                        <li>Si tiene fiebre, tos y dificultad para respirar, solicite atención médica. Llame con antelación.</li>
                                    </ul>
                                </p>
                            </div>
                    </div>
                </main>
            
            
            `;

//-----------------------------------------------------------------------------------------------------------
            Statistics();
//-----------------------------------------------------------------------------------------------------------
            
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            userEmail=email;
            // ...
        } else {
            document.getElementById("pushbarMenu").innerHTML=`
            
                <button class="buttonNav" onclick="Present()">Actual (Covid-19)</button>
                <button class="buttonNav" onclick="RegLoc()">Registrar Local</button>
                <button class="buttonNav" onclick="LogIn()">Iniciar Sesión</button>
                <button class="buttonNav" onclick="SignIn()">Crear Cuenta</button>

            `;
            document.getElementById("pageContainer").innerHTML=`
                <header>
                    <button ><img src="../img/Logo.png" alt="Logo"></button>
                </header>
                <main>
                    <div id="container">
                    <h1>CORONAVIRUS(COVID-19)</h1>
                        <div class="data">

                            
                                <div class="infected">Casos Totales <h2>${dataV.Total}</h2> </div>
                                <div class="active">Casos Activos <h2>${dataV.Actives}</h2>  </div>
                                <div class="recovered">Recuperados <h2>${dataV.Recovered}</h2> </div>

                                <div class="deceased">Fallecidos <h2>${dataV.Deceased}</h2> </div>
                                <div class="discarded">Descartados <h2>${dataV.Discarded}</h2> </div>
                                <div class="lethality">Letalidad <h2>${dataV.Lethality}%</h2> </div>     

                        </div>
                            <div class="graphics">
                            <div>
                            <p>CasosTotales vs CasosActivos vs Fallecidos</p>
                            <canvas id="stat1"></canvas>
                            </div>
                            <div>
                            <p>CasosPositivos vs PruebasDescartadas</p>
                            <canvas id="stat2"></canvas>
                            </div>
                            </div>
                            <div class="covInfo">
                                <h2>CORONAVIRUS</h2>
                                <p>
                                La COVID‑19 es la enfermedad infecciosa causada por el coronavirus que se ha descubierto
                                más recientemente. Tanto este nuevo virus como la enfermedad que provoca eran desconocidos
                                antes de que estallara el brote en Wuhan (China) en diciembre de 2019. Actualmente la 
                                COVID‑19 es una pandemia que afecta a muchos países de todo el mundo. <br>
                                Recomendaciones:
                                </p>
                                <ul>
                                    <li>Lávese las manos con frecuencia. Use agua y jabón o un desinfectante de manos a base de alcohol.</li>
                                    <li>Manténgase a una distancia segura de cualquier persona que tosa o estornude.</li>
                                    <li>No se toque los ojos, la nariz o la boca.</li>
                                    <li>Cuando tosa o estornude, cúbrase la nariz y la boca con el codo flexionado o con un pañuelo.</li>
                                    <li>Quédese en casa si se siente mal.</li>
                                    <li>Si tiene fiebre, tos y dificultad para respirar, solicite atención médica. Llame con antelación.</li>
                                </ul>
                                
                            </div>
                    </div>
                </main>
            `;
            Statistics();
        }
    });
}
app();


//------------------------------------------- Sign In ------------------------------------------------
function SignIn(){
    document.getElementById("container").innerHTML=`
    <h1>Crear Cuenta</h1>
    <div class="form">
        <div id="form">            
            
            <label for="dni">DNI</label>
            <div>
            <i class="fas fa-id-card"></i></i><input type="number" placeholder="72365298" name="dni" id="dni"  required>
            </div>

            <label for="phone">Celular</label>
            <div>
            <i class="fas fa-mobile"></i></i><input type="number" placeholder="963852741" name="phone" id="phone"  required>
            </div>
            
            <label for="adress">Dirección</label>
            <div>
            <i class="fas fa-map-marker-alt"></i></i><input type="text" placeholder="Av. Brasil 769-Referencia:..." name="adress" id="adress"  required>
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
//----------------------------------------- Add New User ---------------------------------------------
function addNewUser(){

    var dni=document.getElementById("dni").value;
    var adress=document.getElementById("adress").value;
    var phone=document.getElementById("phone").value;

    var email = document.getElementById("email").value;
    var psw = document.getElementById("psw").value;


    db.collection("users").add({
        DNI: dni,
        Phone: phone,
        Adress: adress,
        Email: email
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

    swal("", "Datos Registrados", "success");
    document.getElementById("name").value = "";
    document.getElementById("lName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("psw").value = "";
}


//------------------------------------ Check in and out ----------------------------------------------
function RegEn_Ex(){

    if( localStorage.getItem("entryDay") === null ){
        document.getElementById("container").innerHTML=`
            <h1>¡Registra tu visita!</h1>
            <div class="form">
                <div id="form">
                    <label for="telephone">Ingresar Telefono</label>
                    <div>
                        <i class="fas fa-phone"></i><input type="number" placeholder="4168523" name="telephone" id="phone" required>
                    </div>
                    <button id="recEntry">Registrar Entrada</button>
                </div>
            </div>
        `;
        var button=document.getElementById("recEntry");
        var entry;
        var departure;
        button.onclick = function (){
            
            var phone = document.getElementById("phone").value;
            
            entry = new Date();
            var entryDay,entryMonth,entryYear,entryHour,entryMinute;
            entryDay = entry.getDate();
            entryMonth = entry.getMonth();
            entryYear = entry.getFullYear();
            entryHour = entry.getHours();
            entryMinute = entry.getMinutes();

            //----We store the data in the local storage----
            localStorage.setItem("entryDay",entryDay);
            localStorage.setItem("entryMonth",entryMonth);
            localStorage.setItem("entryYear",entryYear);
            localStorage.setItem("entryHour",entryHour);
            localStorage.setItem("entryMinute",entryMinute);
            localStorage.setItem("phone",phone);

            document.getElementById("container").innerHTML=`
                <h1>¡Registra tu visita!</h1>
                <div class="form">
                    <div id="form">
                        <button id="recDeparture">Registrar Salida</button>
                    </div>
                </div>
            `;
            //----------------Registrar Salida-------------------
            var button2 = document.getElementById("recDeparture");
            button2.onclick = function (){
                
                departure = new Date();
                swal("", "Visita Registrada", "success");           
                //Add New Visit
                db.collection("visit").add({
                    Email : userEmail,
                    IDLocal : phone,
    
                    dateDay : entry.getDate(),
                    dateMonth : entry.getMonth(),
                    dateYear : entry.getFullYear(),
    
                    entryHours : entry.getHours(),
                    entryMinutes : entry.getMinutes(),
    
                    departureHours : departure.getHours(),
                    departureMinutes : departure.getMinutes()
                    
                })
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });

                localStorage.removeItem("entryDay");
                localStorage.removeItem("entryMonth");
                localStorage.removeItem("entryYear");
                localStorage.removeItem("entryHour");
                localStorage.removeItem("entryMinute");
                localStorage.removeItem("phone");

                RegEn_Ex();
            }
            
        }

    }else{
        document.getElementById("container").innerHTML=`
            <h1>¡Registra tu visita!</h1>
            <div class="form">
                <div id="form">
                    <button id="recDeparture">Registrar Salida</button>
                </div>
            </div>
        `;

        //---------------- Register Exit -------------------
        var button2 = document.getElementById("recDeparture");
        button2.onclick = function (){
            
            var day,month,year,hour,minute,phoneID;

            day = parseInt( localStorage.getItem("entryDay") );
            month = parseInt( localStorage.getItem("entryMonth") );
            year = parseInt( localStorage.getItem("entryYear") );
            hour = parseInt( localStorage.getItem("entryHour") );
            minute = parseInt( localStorage.getItem("entryMinute") );
            phoneID = parseInt( localStorage.getItem("phone") );

            departure = new Date();
            swal("", "Visita Registrada", "success");           
            //Add New Visit
            db.collection("visit").add({
                Email : userEmail,
                IDLocal : phoneID,

                dateDay : day,
                dateMonth : month,
                dateYear : year,

                entryHours : hour,
                entryMinutes : minute,

                departureHours : departure.getHours(),
                departureMinutes : departure.getMinutes()
                
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });

            localStorage.removeItem("entryDay");
            localStorage.removeItem("entryMonth");
            localStorage.removeItem("entryYear");
            localStorage.removeItem("entryHour");
            localStorage.removeItem("entryMinute");
            localStorage.removeItem("phone");

            RegEn_Ex();
        }
    }









}


//------------------------------------------ History -------------------------------------------------
function Hist(){
    document.getElementById("container").innerHTML=`
    <h1>Historial de Visitas</h1>
    <div id="table">
        <table>
            <thead>
                <th>ID Local</th> <th>Hora de entrada</th> <th>Hora de salida</th> <th>Fecha</th>
            </thead>
            <tbody id="tbody">
            </tbody>
        </table>
    </div>
    `;
    document.getElementById("tbody").innerHTML="";
    db.collection("visit").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            
            if(userEmail == doc.data().Email){
                document.getElementById("tbody").innerHTML+=`
                <tr>
                    <td>${doc.data().IDLocal}</td> <td>${doc.data().entryHours}:${doc.data().entryMinutes}</td> <td>${doc.data().departureHours}:${doc.data().departureMinutes}</td> <td>${doc.data().dateDay}/${doc.data().dateMonth +1}/${doc.data().dateYear} </td> 
                </tr> 
                `;
            }

        });
    });
}

function SignOut(){
    firebase.auth().signOut().then(function(){
        console.log("Cerraste Sesión");
      }).catch(function (error){
        console.log(error)
    })
}

function Statistics(){
    var ctx= document.getElementById("stat1").getContext("2d");
    var myChart= new Chart(ctx,{
    type:"pie",
    data:{
        labels:['Casos Totales','Recuperados','Fallecidos'],
        datasets:[{
                label:'Num datos',
                data:[dataV.Total,dataV.Recovered,dataV.Deceased],
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
                data:[dataV.Total,dataV.Discarded],
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