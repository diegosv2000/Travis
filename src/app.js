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