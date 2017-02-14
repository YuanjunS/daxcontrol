/**
 * Created by User on 14.02.2017.
 */
var socket = io();

/*$(document).on('click', function(event){
    socket.emit('welcome', {message:'welcome',id: event.target});
});*/
$(document).off('click','#pie_reset').on('click','#pie_reset',function(e){
    console.log('click');

    socket.emit('pie_reset1',{message:'pie chart reset.'});
});
socket.on('pie_reset2', function(data) {
    piereset();

    //$(data.id).trigger('click');
    //$('button1').click(addMessage(data.message));
    // Respond with a message including this clients' id sent from the server
    socket.emit('i am client', {data: 'foo!', id: data.id});
});
/*socket.on('time', function(data) {
    addMessage(data.time);
});
socket.on('error', console.error.bind(console));
socket.on('message', console.log.bind(console));

function addMessage(message) {
    var text = document.createTextNode(message),
        el = document.createElement('li'),
        messages = document.getElementById('messages');

    el.appendChild(text);
    messages.appendChild(el);
}*/
