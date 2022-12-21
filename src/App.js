import './App.css';
import Game from './Game.js';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Test Your Intelligence</h1>
                <Game/>
                <ul className="App__Instructions">
                    <li>Start by removing any peg</li>
                    <li>Take one peg and move it over an adjacent one to an empty hole on the oher side</li>
                    <li>Repeat until you can't make any more moves</li>
                    <li>The number of pegs remaining will determine your intelligence</li>
                </ul>
            </header>
        </div>
    );
}

export default App;
