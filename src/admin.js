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
var trackConfirm = false;


function Users(){
    document.getElementById("container").innerHTML=`
    <h1>Usuarios Registrados</h1>
    <div id="sContainer" class="sContainer">
        <i class="fas fa-search"></i>

        <input type="number" placeholder="Ingresa el DNI" id="dni">

        <button onclick="searchUser()" class="search" >Buscar</button>
    </div>
    `;


    document.getElementById("writeHistory").innerHTML=`
    <div id="table">
        <table>
            <thead>
                <th>DNI</th> <th>Email</th> <th>N° de Celular</th> <th>Dirección</th>
            </thead>
            <tbody id="tbody">
            </tbody>
        </table>
    </div>
    `;
    document.getElementById("tbody").innerHTML="";
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            

                document.getElementById("tbody").innerHTML+=`
                <tr>
                    <td>${doc.data().DNI}</td> <td>${doc.data().Email}</td> <td>${doc.data().Phone}</td> <td>${doc.data().Adress}</td> <td> <button class="buttonHistory" onclick="dataUser('${doc.data().Email}')" >Historial</button></td> 
                </tr> 
                `;
            

        });
    });

}

function searchUser(){
    var dni = document.getElementById("dni").value;

    document.getElementById("writeHistory").innerHTML=`
    <div id="table">
        <table>
            <thead>
                <th>DNI</th> <th>Email</th> <th>N° de Celular</th> <th>Dirección</th>
            </thead>
            <tbody id="tbody">
            </tbody>
        </table>
    </div>
    `;
    document.getElementById("tbody").innerHTML="";
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            

            if( dni == doc.data().DNI ){
                document.getElementById("tbody").innerHTML+=`
                <tr>
                    <td>${doc.data().DNI}</td> <td>${doc.data().Email}</td> <td>${doc.data().Phone}</td> <td>${doc.data().Adress}</td> <td> <button class="buttonHistory" onclick="dataUser('${doc.data().Email}')" >Historial</button></td> 
                </tr> 
                `;
            }
            

        });
    });

}


function dataUser(ID){
    document.getElementById("container").innerHTML=`
    <h1>Usuario ${ID}</h1>

    `;

    document.getElementById("writeHistory").innerHTML=`
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
            

            if(doc.data().Email == ID){
                document.getElementById("tbody").innerHTML+=`
                <tr>
                    <td>${doc.data().IDLocal}</td> <td>${doc.data().entryHours}:${doc.data().entryMinutes}</td> <td>${doc.data().departureHours}:${doc.data().departureMinutes}</td> <td>${doc.data().dateDay}/${doc.data().dateMonth +1}/${doc.data().dateYear} </td> 
                </tr> 
                `;
            }
            

        });
    });
}

function Tracking(){
    document.getElementById("container").innerHTML=`
        <h1>Propagación de Infección</h1>
        <div class="formT">
            <div class="content">
                <p>ID Local</p>
                <div id="userTr">
                    <i class="fas fa-id-card"></i>
                    <input type="number" id="IDLocal">
                </div>
                    

            </div>
            <div class="content">
                <p>Fecha</p>
                <div class="divForm">
                    
                    <div class="inputContent">
                        <label> Día </label>
                        <input type="number" id="day">
                    </div>
                    <div class="inputContent">
                        <label> Mes </label>
                        <input type="number" id="month">
                    </div>
                    <div class="inputContent">
                        <label> Año </label>
                        <input type="number" id="year">
                    </div>
                </div>
            </div>
            <div class="content">
                <p>Hora de Entrada</p>
                <div class="divForm">
                    
                    <div class="inputContent">
                        <label> Hora </label>
                        <input type="number"  id="eHours">
                    </div>
                    <div class="inputContent">
                        <label> Minutos </label>
                        <input type="number"  id="eMinutes">
                    </div>
                </div>
            </div>
            <div class="content">
                <p>Hora de Salida</p>
                <div class="divForm">
                    
                    <div class="inputContent">
                        <label> Hora </label>
                        <input type="number"  id="dHours">
                    </div>
                    <div class="inputContent">
                        <label> Minutos </label>
                        <input type="number" id="dMinutes">
                    </div>
                </div>
            </div>
            
            <button id="trackingB" >Rastrear</button>
        </div>
    `;

    document.getElementById("writeHistory").innerHTML=` `;





    var button = document.getElementById("trackingB");
    button.onclick = function(){
        var IDLocal = document.getElementById("IDLocal").value;

        var day = document.getElementById("day").value;
        var month = document.getElementById("month").value;
        month = month -1;
        var year = document.getElementById("year").value;

        var eHours = document.getElementById("eHours").value;
        var eMinutes = document.getElementById("eMinutes").value;

        var dHours = document.getElementById("dHours").value;
        var dMinutes = document.getElementById("dMinutes").value; 
        var dateEntry = new Date(year,month,day,eHours,eMinutes);
        var personEntry;
        var personDeparture;
        var dateDeparture = new Date(year,month,day,dHours,dMinutes);


        
        db.collection("visit").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                
                if( IDLocal == doc.data().IDLocal ){

                    db.collection("users").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc2) => {             

                            document.getElementById("writeHistory").innerHTML=`
                            <div id="table">
                                <table>
                                    <thead>
                                        <th> DNI </th> <th> Email </th> <th>Celular</th> <th>Dirección</th>
                                    </thead>
                                    <tbody id="tbody">
                                    </tbody>
                                </table>
                            </div>
                            `;

                            personEntry = new Date( doc.data().dateYear,doc.data().dateMonth,doc.data().dateDay,doc.data().entryHours,doc.data().entryMinutes);
                            personDeparture = new Date(doc.data().dateYear,doc.data().dateMonth,doc.data().dateDay,doc.data().entryHours,doc.data().entryMinutes);

                            console.log("dateEntry: ",dateEntry);
                            console.log("dateDeparture",dateDeparture);

                            console.log("infectedEntry",personEntry);
                            console.log("infectedDeparture", personDeparture);
                            console.log("===========================================================================================0");

// ===========================================================================================================================================
// ======================================= ANALYZE THE INTERVALS OF WHEN THEY DO NOT CROSS HERE ==============================================
// ===========================================================================================================================================

                            if( doc.data().Email == doc2.data().Email && (  
                                ( personEntry <= dateEntry && dateEntry <= personDeparture && personDeparture <= dateDeparture ) ||
                                ( dateEntry <= personEntry && personEntry <= dateDeparture && dateDeparture <= personDeparture ) ||
                                ( personEntry <= dateEntry &&  dateDeparture <= personDeparture ) ||
                                ( dateEntry <= personEntry && personDeparture <= dateDeparture )                                
                                )
                            ){
                                
// ===========================================================================================================================================
                                
                                document.getElementById("tbody").innerHTML+=`
                                <tr>
                                    <td>${doc2.data().DNI}</td> <td>${doc2.data().Email}</td> <td>${doc2.data().Phone}</td> <td>${doc2.data().Adress}</td>  
                                </tr> 
                                `;
                            }


                        });
                    });

                }
    
            });
        });


    }
}

function Places(){
    document.getElementById("container").innerHTML=`
    <h1>Locales Registrados</h1>
    <div id="sContainer" class="sContainer">
        <i class="fas fa-search"></i>

        <input type="number" placeholder="Ingresa el ID del local" id="id">

        <button class="search" onclick="searchPlace()" >Buscar</button>
    </div>

    


    `;

    document.getElementById("writeHistory").innerHTML=`
    <div id="table">
        <table>
            <thead>
                <th>ID Local</th> <th>Nombre</th> <th>Dirección</th>
            </thead>
            <tbody id="tbody">
            </tbody>
        </table>
    </div>
    `;
    document.getElementById("tbody").innerHTML="";
    db.collection("local").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            

                document.getElementById("tbody").innerHTML+=`
                <tr>
                    <td>${doc.data().Telephone}</td> <td>${doc.data().Name}</td><td>${doc.data().Adress}</td> 
                </tr> 
                `;
            

        });
    });

}

function searchPlace(){
    var id = document.getElementById("id").value;

    document.getElementById("writeHistory").innerHTML=`
    <div id="table">
        <table>
            <thead>
                <th>Telephone</th> <th>Nombre</th>  <th>Dirección</th>
            </thead>
            <tbody id="tbody">
            </tbody>
        </table>
    </div>
    `;
    document.getElementById("tbody").innerHTML="";
    db.collection("local").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            

            if( id == doc.data().Telephone ){
                document.getElementById("tbody").innerHTML+=`
                <tr>
                    <td>${doc.data().Telephone}</td> <td>${doc.data().Name}</td> <td>${doc.data().Adress}</td>
                </tr> 
                `;
            }
            

        });
    });
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
            

            <button class="buttonNav" onclick="Users()">Usuarios</button>
            <button class="buttonNav" onclick="Tracking()">Rastro</button>
            <button class="buttonNav" onclick="Places()">Lugares</button>
            <button class="buttonNav" onclick="SignOut()">Cerrar Sesión</button>
            
            `;
            document.getElementById("pageContainer").innerHTML=`
                <header>
                    <button  onclick="location.reload()"><img src="../../img/Logo.png" alt="Logo"></button>
                </header>
                <main>
                    <div id="container">
                        <h1>Usuarios Registrados</h1>
                        <div id="sContainer" class="sContainer">
                            <i class="fas fa-search"></i>
                    
                            <input type="number" placeholder="Ingresa el DNI" id="dni">
                    
                            <button class="search" onclick="searchUser()">Buscar</button>
                        </div>
                    </div>
                </main>
            
            
            `;


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
            



            `;
            document.getElementById("pageContainer").innerHTML=`
                <header>
                    <button  onclick="location.reload()"><img src="../../img/Logo.png" alt="Logo"></button>
                </header>
                <main>
                    <div id="container">
                    
                    <h1>Administrador</h1>
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
                            
                            <button id="userLogIn">Iniciar Sesión</button>
                        </div>
                        </div>
                    </div>
                    
                    </div>
                </main>
            `;
            var user = document.getElementById("userLogIn");
            user.addEventListener("click",logInWithEmail);
        }
    });
}
app();

function SignOut(){
    firebase.auth().signOut().then(function(){
        console.log("Cerraste Sesión");
      }).catch(function (error){
        console.log(error)
    })
}

//------------------------------------------- Sign In ------------------------------------------------
