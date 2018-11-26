const data = axios.create({
  baseURL: 'https://www.gbm.com.mx/Mercados/ObtenerDatosGrafico?empresa=IPC'
});

data.get()
  .then(response => {
    printTheChart(response.data.resultObj)
  }).catch(err => console.log(err));





  
printTheChart = (ipc => {
  
  var fecha = ipc.map(e => {
    var ele = e.Fecha.split('T');
    var dia = ele[0];
    var hora = ele[1].substr(0, 5);
    var horario = [dia, hora]
    return horario
  });

  var precio = ipc.map(e => {
    return e.Precio;
  });
  
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: fecha,
          datasets: [{
              label: 'IPC',
              data: precio,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:false
                  }
              }]
          }
      }
  });

  var valor = document.getElementById('valor');
  var max = Math.max(...precio);

  valor.innerText = max
});



