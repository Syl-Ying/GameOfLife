import MainLayout from '../layout/MainLayout'
import './HomePage.css';

function HomePage() {
    return (
        <MainLayout>
            <div className="home-container">
                <div className='content'>
                    <h1>Conway's Game of Life</h1>
                    <p>
                        Conway's Game of Life is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
                        It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input.
                        One interacts with the Game of Life by creating an initial configuration and observing how it evolves.
                    </p>
                    <h2>Rules:</h2>
                    <ul>
                        <li>
                            Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                        </li>
                        <li>
                            Any live cell with two or three live neighbours lives on to the next generation.
                        </li>
                        <li>
                            Any live cell with more than three live neighbours dies, as if by overpopulation.
                        </li>
                        <li>
                            Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                        </li>
                    </ul>
                    <p>
                        The game is played on a grid, where each cell can be either alive or dead.
                        You can click on cells to toggle their state and observe how the game evolves based on the initial configuration and the rules above.
                    </p>
                    <p>Enjoy playing Conway's Game of Life!</p>
                </div>
            </div>
        </MainLayout>
    )
}

export default HomePage