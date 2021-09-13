import { useContext } from 'react';
import { BandAdd } from '../components/BandAdd/BandAdd';
import { BandChart } from '../components/BandChart/BandChart';
import { BandList } from '../components/BandList/BandList';
import { SocketContext } from '../context/SocketContext';

// const connectSocketServer = () => {
//   const socket = io.connect('http://localhost:8080/', {
//     transports: ['websocket']
//   });
//   return socket;
// }

function HomePage() {

  // const [bands, setBands] = useState([]);
  const {online}=useContext(SocketContext);
  // const [socket] = useState(connectSocketServer());
  // const [online, setOnline] = useState(false);

  // useEffect(() => {
  //   socket.on('current-bands', (bands) => {
  //     setBands(bands);
  //   })
  // }, [socket])

  // const votar=(id)=>{
  //   // console.log('votar-app',id);
  //   socket.emit('votar-banda',id);
  // }
  // const borrar=(id)=>{
  //   // console.log('votar-app',id);
  //   socket.emit('borrar-banda',id);
  // }

  // const cambiarNombre=(id,nombre)=>{
  //   socket.emit('cambiar-nombre-banda',{id,nombre});
  // }

  // // crearBanda(nombre) 'nueva-banda'
  // const crearBanda=(nombre)=>{
  //   // console.log('votar-app',id);
  //   socket.emit('nueva-banda',nombre);
  // }

  return (
    <div className="App">
      <div className="container">
        <div className="alert">
          <p>Service Status:
            {
              online
                ? <span className="text-success"> Online</span>
                : <span className="text-danger"> Offline</span>
            }
          </p>
        </div>

        <h1>BandNames</h1>
        <hr />
        <div className="row">
          <div className="col-10">
            <BandChart/>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <BandList/>
          </div>
          <div className="col-4">
            <BandAdd 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
