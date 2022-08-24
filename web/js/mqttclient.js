/*################################################################################################*/
/*####################################### CLIENTE MQTT ###########################################*/
/*################################################################################################*/

//var wsbroker = "192.168.0.3";  //mqtt websocket enabled broker
//var wsbroker = "localhost";
var wsbroker = "broker.hivemq.com";

//var wsport = 8083 // port for above
var wsport = 1883; // port for above

var client = new Paho.MQTT.Client(
	wsbroker,
	Number(8000),
	"myclientid_" + parseInt(Math.random() * 100, 10)
);

client.onConnectionLost = function (responseObject) {
	console.log("connection lost: " + responseObject.errorMessage);
};

/*################################################################################################*/
/*####################################### LLEGA EL MENSAJE########################################*/
/*################################################################################################*/

client.onMessageArrived = function (message) {
	let destination = message.destinationName;
	if (destination === "/test_utn_alert") {
		let response = JSON.parse(message.payloadString);
		dataSistolica = response.data[0];
		dataDiastolica = response.data[1];
		switch (dataSistolica.class) {
			case 0:
				document.getElementById("validate").style.display = "block";
				document.getElementById("validate").style.backgroundColor = "green";
				document.getElementById("validate").style.fontSize = "40px";
				document.getElementById("msg_pass").innerHTML =
					"Presión Sistólica normal";
				break;

			case 1:
				document.getElementById("validate").style.display = "block";
				document.getElementById("validate").style.backgroundColor = "#fff507";
				document.getElementById("msg_pass").innerHTML =
					"Presión Sistólica elevada";
				document.getElementById("validate").style.fontSize = "40px";
				break;

			case 2:
				document.getElementById("validate").style.display = "block";
				document.getElementById("validate").style.backgroundColor = "#ffa507";
				document.getElementById("msg_pass").innerHTML =
					"Presión Sistólica alta (hipertensión) de etapa 1";
				document.getElementById("validate").style.fontSize = "40px";
				break;

			case 3:
				document.getElementById("validate").style.display = "block";
				document.getElementById("validate").style.backgroundColor = "#ff0000";
				document.getElementById("msg_pass").innerHTML =
					"Presión Sistólica alta (hipertensión) de etapa 2";
				document.getElementById("validate").style.fontSize = "40px";
				break;
		}

		switch (dataDiastolica.class) {
			case 0:
				document.getElementById("validate2").style.display = "block";
				document.getElementById("validate2").style.backgroundColor = "green";
				document.getElementById("validate2").style.fontSize = "40px";
				document.getElementById("msg_pass2").innerHTML =
					"Presión Diastólica normal";
				break;

			case 1:
				document.getElementById("validate2").style.display = "block";
				document.getElementById("validate2").style.backgroundColor = "#fff507";
				document.getElementById("msg_pass2").innerHTML =
					"Presión Diastólica elevada";
				document.getElementById("validate2").style.fontSize = "40px";
				break;

			case 2:
				document.getElementById("validate2").style.display = "block";
				document.getElementById("validate2").style.backgroundColor = "#ffa507";
				document.getElementById("msg_pass2").innerHTML =
					"Presión Diastólica alta (hipertensión) de etapa 1";
				document.getElementById("validate2").style.fontSize = "40px";
				break;

			case 3:
				document.getElementById("validate2").style.display = "block";
				document.getElementById("validate2").style.backgroundColor = "#ff0000";
				document.getElementById("msg_pass2").innerHTML =
					"Presión Diastólica alta (hipertensión) de etapa 2";
				document.getElementById("validate2").style.fontSize = "40px";
				break;
		}

		/* addData(myChart, parseFloat(data.value)); */
		console.log(parseFloat(dataSistolica.value));
		console.log(parseFloat(dataDiastolica.value));
		addData(
			myChart,
			parseFloat(dataSistolica.value),
			parseFloat(dataDiastolica.value)
		);
	}
};

var options = {
	timeout: 3,
	onSuccess: function () {
		console.log("mqtt connected");
		// Connection succeeded; subscribe to our topic, you can add multile lines of these
		client.subscribe("/test_utn", { qos: 1 });
		client.subscribe("/test_utn_alert", { qos: 1 });

		//use the below if you want to publish to a topic on connect
		//message = new Paho.MQTT.Message("Hello");
		//message.destinationName = "/test_utn";
		//client.send(message);
	},
	onFailure: function (message) {
		console.log("Connection failed: " + message.errorMessage);
	},
};

function init() {
	client.connect(options);
}
