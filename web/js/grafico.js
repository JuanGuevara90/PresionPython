/*################################################################################################*/
/*####################################### DESPLIEGUE DEL GRAFICO #################################*/
/*################################################################################################*/

const ctx = document.getElementById("myChart").getContext("2d");
let labels_n = [];
let data_n = [];
let data_n2 = [];
let data_n3 = [];
let data_n4 = [];
let myChart = new Chart(ctx, {
	type: "line",
	data: {
		labels: labels_n,
		datasets: [
			{
				label: "Presión Sistólica Actual",
				data: data_n,
				backgroundColor: ["rgba(255, 99, 132, 0.2)"],
				borderColor: ["rgba(255, 99, 132, 1)"],
				borderWidth: 1,
			},
			{
				label: "Presión Sistólica normal",
				data: data_n2,
				backgroundColor: ["rgba(54, 162, 235, 0.2)"],
				borderColor: ["rgba(0, 250, 50, 1)"],
				borderWidth: 1,
			},
			{
				label: "Presión Diastólica Actual",
				data: data_n3,
				backgroundColor: ["rgba(255, 99, 132, 0.2)"],
				borderColor: ["rgba(255, 45, 100, 1)"],
				borderWidth: 1,
			},
			{
				label: "Presión Diastólica normal",
				data: data_n4,
				backgroundColor: ["rgba(54, 162, 235, 0.2)"],
				borderColor: ["rgba(54, 162, 235, 1)"],
				borderWidth: 1,
			},
		],
	},
	options: {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	},
});

function addData(chart, dataS, dataD) {
	let presion_Sistolica_normal = 119;
	let presion_Diastolica_normal = 79;
	let today = new Date();
	let date =
		today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	// Datos recolectados del sensor
	chart.data.labels.push(date);
	chart.data.datasets[0].data.push(dataS);
	chart.data.datasets[1].data.push(presion_Sistolica_normal);
	chart.data.datasets[2].data.push(dataD);
	chart.data.datasets[3].data.push(presion_Diastolica_normal);
	chart.update();
}
