import "./App.css";
import Tabs from "./components/tabs/Tabs";
import Rooms from "./components/rooms/Rooms";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Rooms />
      </div>
      <Tabs /> 
    </div>
  );
}

export default App;
