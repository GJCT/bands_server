const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band( 'Twenty one Pilos' ));
bands.addBand(new Band( 'Caramelos de Cianuro' ));
bands.addBand(new Band( 'Guns and Rose' ));
bands.addBand(new Band( 'Hombres G' ));

//console.log(bands);

//Sockets message
io.on('connection', client=> {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', ()=>{
        console.log('Cliente desconectado');
    });
    client.on('mensaje', (payload) =>{
        console.log('mensaje', payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });

    client.on('vote-bands', (payload) => {
        bands.voteBands(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-bands', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    // client.on('emitir-mensaje', (payload)=>{
    //     //console.log(payload);
    //     //io.emit('emitiendo-mensaje', payload); //Socket emite a todos los clientes
    //     client.broadcast.emit('nuevo-mensaje', payload); // emite a todos menos al cliente quien lo emite
    // });
});
