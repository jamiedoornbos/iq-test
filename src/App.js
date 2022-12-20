import './App.css';
import Board from './Board.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board pegs={[1]}/>
        <Board pegs={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}/>
      </header>
    </div>
  );
}

export default App;
