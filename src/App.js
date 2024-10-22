import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import AdminRouter from './Routers';
import "./Assets/css/style.css";

import favIcon from "./Assets/images/fav-icon.png";

const link = document.createElement('link');
link.rel = 'icon';
link.href = favIcon;
document.head.appendChild(link);

function App() {
  return (
    <AdminRouter />
  );
}

export default App;
