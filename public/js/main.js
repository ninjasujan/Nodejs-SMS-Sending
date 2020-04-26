const numberInput = document.getElementById('number'),
  textInput = document.getElementById('msg'),
  button = document.getElementById('button'),
  response = document.querySelector('.response');

function send() {
  const number = numberInput.value;
  const text = textInput.value;
  console.log('mainjs');
  fetch('/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ number: number, text: text }),
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

button.addEventListener('click', send, false);

socket.on('smsStatus', function (data) {
  response.innerHTML = '<h5> text message sent To: ' + data.number + ' </h5?';
});
