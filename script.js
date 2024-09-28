
function showSection(sectionId) 
        {
            var sections = document.getElementsByClassName('section');
            for (var i = 0; i < sections.length; i++) {
                sections[i].classList.remove('active');
            }
            document.getElementById(sectionId).classList.add('active');
        }
function removesection()
{
  var sections = document.getElementsByClassName('section');
  for (var i = 0; i < sections.length; i++) {
      sections[i].classList.remove('active');
}
}
/*function sendData() 
{
    var mqttBroker = document.getElementById("mqttBroker").value;
    var mqttopic = document.getElementById("mqttopic").value;
    var baudrate = document.getElementById("baudrate").value;
    var bit = document.getElementById("bit").value;
    var parity = document.getElementById("parity").value;
    var apn = document.getElementById("apn").value;
    var slaveid = document.getElementById("slaveid").value;
    var command = document.getElementById("command").value;
    var startaddr = document.getElementById("startaddr").value;
    var noreg = document.getElementById("noreg").value;
    var writedata = document.getElementById("writedata").value;

    // Prepare the JSON data
    var data = {
      mqttbroker: mqttBroker ,
      mqtttopic:mqttopic,
      baudrate: baudrate,
      bit: bit,
      parity: parity,
      apn: apn,
      slaveid: slaveid,
      command: command,
      startaddr: startaddr,
      noreg: noreg,
      writedata: writedata
    };

    // Connect to the MQTT broker
    const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');

    client.on('connect', function () {
      console.log('Connected to MQTT broker');
      client.publish('VFDSETT', JSON.stringify(data), function (err) {
        if (err) {
          document.getElementById("response").innerHTML = "Error publishing: " + err;
        } else {
          document.getElementById("response").innerHTML = "Data published successfully!";
          client.end();
        }
      });
    });

    // Handle connection errors
    client.on('error', function (err) {
      console.log('Connection error:', err);
      document.getElementById("response").innerHTML = "MQTT connection error: " + err;
    });
}*/




function Save_setting()
{
    var mqttBroker = document.getElementById("mqttBroker").value;
    var mqttopic = document.getElementById("mqttopic").value;
    var baudrate = document.getElementById("baudrate").value;
    var bit = document.getElementById("bit").value;
    var parity = document.getElementById("parity").value;
    var apn = document.getElementById("apn").value;

    // Prepare the JSON data
    var data1 = {
      mqttbroker: mqttBroker ,
      mqtttopic:mqttopic,
      baudrate: baudrate,
      bit: bit,
      parity: parity,
      apn: apn,
    };

    // Connect to the MQTT broker
    const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');

    client.on('connect', function () {
      console.log('Connected to MQTT broker');
      client.publish('VFDSETT', JSON.stringify(data1), function (err) {
        if (err) {
          document.getElementById("response").innerHTML = "Error publishing: " + err;
        } else {
          document.getElementById("response").innerHTML = "Communication Parameters published successfully! throgh VFDSETT";
          client.end();
        }
      });
    });

    // Handle connection errors
    client.on('error', function (err) {
      console.log('Connection error:', err);
      document.getElementById("response").innerHTML = "MQTT connection error: " + err;
    });
}
function Set_IOT()
{

  const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');
  
  client.on('connect', function () {
  console.log('Connected to MQTT broker');
  client.publish('VFDCNTRL', JSON.stringify({ command: 'WREE' }), function (err) {
    if (err) {
      console.log("Error on publishing command off");
    } else {
      console.log("Publisehd command off successfully");
      document.getElementById("response").innerHTML = "Command WREE published successfully!Through VFDCNTRL";
      client.end();
    }
  });
  });
  
}


function publish_reg()
{
  var slaveid = document.getElementById("slaveid").value;
  var command = document.getElementById("command").value;
  var startaddr = document.getElementById("startaddr").value;
  var noreg = document.getElementById("noreg").value;
  var writedata = document.getElementById("writedata").value;

  // Prepare the JSON data
  var data2 = {
    slaveid: slaveid,
    command: command,
    startaddr: startaddr,
    noreg: noreg,
    writedata: writedata
  };

  // Connect to the MQTT broker
  const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');

  client.on('connect', function () {
    console.log('Connected to MQTT broker');
    client.publish('VFDSETT', JSON.stringify(data2), function (err) {
      if (err) {
        document.getElementById("response").innerHTML = "Error publishing: " + err;
      } else {
        document.getElementById("response").innerHTML = "Register Data published successfully! through VFDSETT";
        client.end();
      }
    });
  });

  // Handle connection errors
  client.on('error', function (err) {
    console.log('Connection error:', err);
    document.getElementById("response").innerHTML = "MQTT connection error: " + err;
  });
}

function publish_reg_wr()
{
  var slaveid = document.getElementById("slaveid").value;
  var command = document.getElementById("command").value;
  var startaddr = document.getElementById("startaddr").value;
  var noreg = document.getElementById("noreg").value;
  var writedata = document.getElementById("writedata").value;

  // Prepare the JSON data
  var data2 = {
    slaveid: slaveid,
    command: command,
    startaddr: startaddr,
    noreg: noreg,
    writedata: writedata,
    command:'wreg'
  };

  // Connect to the MQTT broker
  const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');

  client.on('connect', function () {
    console.log('Connected to MQTT broker');
    client.publish('VFDSETT', JSON.stringify(data2), function (err) {
      if (err) {
        document.getElementById("response").innerHTML = "Error publishing: " + err;
      } else {
        document.getElementById("response").innerHTML = "Register data with 'wreg' command published successfully! through VFDSETT";
        client.end();
      }
    });
  });

  // Handle connection errors
  client.on('error', function (err) {
    console.log('Connection error:', err);
    document.getElementById("response").innerHTML = "MQTT connection error: " + err;
  });
}








function fetchmq() 
{
    // Connect to the MQTT broker
    const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');

    // Define the onConnect callback
    client.on('connect', function () {
      console.log("Connected to MQTT broker");
      client.subscribe('VFDTEST', function (err) {
        if (!err) {
          console.log("Subscribed to topic: VFDTEST");
        } else {
          console.error("Failed to subscribe:", err);
        }
      });
    });

    // Handle incoming messages
    client.on('message', function (topic, message) {
      console.log("Message received:", message.toString());

      // Parse the JSON message
      const data = JSON.parse(message.toString());

      // Update the gauges with the respective data
    document.getElementById('freq').setAttribute('data-value', data.freq);
    document.getElementById('amp').setAttribute('data-value', data.cur);
    document.getElementById('spd').setAttribute('data-value', data.spd);
    document.getElementById('temp').setAttribute('data-value', data.temp);
    document.getElementById('vlt').setAttribute('data-value', data.volt);
    document.getElementById('strvlt').setAttribute('data-value', data.svolt);

      // Update the motor status
      var status = data.stat;
      if (status === 1) {
       //updateMotorStatus('on', 'off', ' ');
        updateIndicator(1);
      } if (status === 2) {
       // updateMotorStatus(' ', 'off', ' ');
        updateIndicator(2);
      } if (status === 3) 
        {
       // updateMotorStatus(' ', ' ', 'error');
        updateIndicator(3);
      }
    });

    // Handle connection errors
    client.on('error', function (err) {
      console.error("Connection error:", err);
    });

    // Handle client disconnect
    client.on('close', function () {
      console.log("Disconnected from MQTT broker");
    });





}
  // Call fetchmq to start the MQTT client
fetchmq();

// Publish functions for Start and Stop buttons
function publishStart() 
{
const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');

client.on('connect', function () {
console.log('Connected to MQTT broker');
client.publish('VFDCNTRL', JSON.stringify({ command: 'on' }), function (err) {
  if (err) {
    console.log("Error on publishing command");
  } else {
    console.log("Publisehd command successfully");
    client.end();
  }
});
});

}

function publishStop()
{
const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');

client.on('connect', function () {
console.log('Connected to MQTT broker');
client.publish('VFDCNTRL', JSON.stringify({ command: 'off' }), function (err) {
  if (err) {
    console.log("Error on publishing command off");
  } else {
    console.log("Publisehd command off successfully");
    client.end();
  }
});
});

}

// Attach these publish functions to your buttons
document.getElementById('startbtn').addEventListener('click', publishStart);
document.getElementById('startbtn').addEventListener('click', togglestrt);
document.getElementById('stopbtn').addEventListener('click', publishStop);
document.getElementById('stopbtn').addEventListener('click', togglestp);

/*function toggleButton(activeButtonId) 
    {
// Get all buttons
var buttons = document.querySelectorAll('.button');
// Iterate over all buttons and set the active class based on the clicked button
buttons.forEach(button => {
    if (button.id === activeButtonId) {
        button.classList.add('active');
    } else {
        button.classList.remove('active');
    }               
    });
    } */

//function setLEDStatus(ledElement, status) 
 //   {
  //      ledElement.classList.remove('red', 'green', 'blink');
//
   //     if (status === 'on') {
     //       ledElement.classList.add('red');
    //    } else if (status === 'off') {
    //        ledElement.classList.add('green');
    //    } else if (status === 'error') {
     //       ledElement.classList.add('red', 'blink');
    //    }
  //  }

//function updateMotorStatus(status1, status2, status3) 
//{
//        const led1 = document.getElementById('led1');
//        const led2 = document.getElementById('led2');
//        const led3 = document.getElementById('led3');
//
//        setLEDStatus(led1, status1);
//        setLEDStatus(led2, status2);
//        setLEDStatus(led3, status3);
//}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Simple hardcoded login logic
  if (username === 'admin' && password === 'password123') {
    // Store login status
    sessionStorage.setItem('loggedIn', true);
    // Show app content and hide login
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('home').classList.add('active');
    document.getElementById('app-content').classList.remove('hidden');

    
  } else {
    alert('Invalid credentials. Please try again.');
  }
}
function logout() {
  // Clear login status and redirect to login screen
  sessionStorage.removeItem('loggedIn');
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('app-content').classList.add('hidden');
  removesection();
}


window.onload = function() {
  if (sessionStorage.getItem('loggedIn'))  {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app-content').classList.remove('hidden');
  }
};
let isOn = false;
function toggleBreaker() 
{
  const breakerImage = document.getElementById('breakerImage');
  if (isOn) 
    {
      breakerImage.src = "CB_OFF.png";
      breakerImage.alt = "Circuit Breaker OFF";
      publishV_OFF();
  } 
  else 
  {
      breakerImage.src = "CB_ON.png";
      breakerImage.alt = "Circuit Breaker ON";
      publishV_ON();
  }
  isOn = !isOn;
}
function publishV_ON() 
{
const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');

client.on('connect', function () {
console.log('Connected to MQTT broker');
client.publish('VFDCNTRL', JSON.stringify({ command: 'VON' }), function (err) {
  if (err) {
    console.log("Error on publishing command");
  } else {
    console.log("Publisehd command successfully");
    client.end();
  }
});
});

}

function publishV_OFF()
{
const client = mqtt.connect('wss://test.mosquitto.org:8081/mqtt');

client.on('connect', function () {
console.log('Connected to MQTT broker');
client.publish('VFDCNTRL', JSON.stringify({ command: 'VOFF' }), function (err) {
  if (err) {
    console.log("Error on publishing command off");
  } else {
    console.log("Publisehd command off successfully");
    client.end();
  }
});
});

}

let isp = false;
function togglestrt() 
{
  const startImage = document.getElementById('strtimg');
  const stopImage = document.getElementById('stpimg');
  if (isp) 
    {
      //startImage.src = "strt_u.png";
      //startImage.alt = "start OFF";
      //stopImage.src = "stp.png";
  } 
  else 
  {
      startImage.src = "strt.png";
      startImage.alt = "start ON";
      stopImage.src = "stp_u.png";
      isp = !isp;
  }
  //isp = !isp;
}

//let ispf = false;
function togglestp() 
{
  const stopImage = document.getElementById('stpimg');
  const startImage = document.getElementById('strtimg');
  if (isp) 
    {
      //stopImage.src = "stp_u.png";
      //stopImage.alt = "stop OFF";
      //startImage.src = "strt.png";

      stopImage.src = "stp.png";
      stopImage.alt = "stop ON";
      startImage.src = "strt_u.png";
      isp = !isp;
  } 
  else 
  {
      //stopImage.src = "stp.png";
      //stopImage.alt = "stop ON";
      //startImage.src = "strt_u.png";

  }
  //isp = !isp;
} 

function updateIndicator(lt) 
{
      
  const vfdon = document.getElementById('PWR_ON');
  const pumpon = document.getElementById('PUMP_ON');
  const vfderr = document.getElementById('VFD_ERR');

      vfdon.src = "light_off.png";
      pumpon.src= "light_off.png";
      vfderr.src = "light_off.png";

  if(lt===1)
  {
    vfdon.src = "green_light.png";
    pumpon.src= "green_light.png";
    vfderr.src = "light_off.png"; 
  }

  if(lt===2)
    {
      vfdon.src = "green_light.png";
      pumpon.src= "light_off.png";
      vfderr.src = "light_off.png"; 
    }
    if(lt===3)
      {
        vfdon.src = "yellow_light.png";
        pumpon.src= "light_off.png";
        vfderr.src = "red_light.png"; 
      }

 
}
