import { useEffect, useState } from 'react';

function getRandomGrid(width, height) {
    const grid = [];
    let initialAliveCount = 0; 
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            const alive = Math.random() < 0.05;
            // 5% chance of being alive: generates a random number between 0 and 1, 
            // it returns true if the generated number is less than 0.05
            grid.push({ id: `${row}-${col}`, alive, lastAlive: alive ? 0 : 10});
            if (alive) {initialAliveCount++;}
        }
    }
    return grid;
}

function Board() {
    const [width, setWidth] = useState(20);
    const [height, setHeight] = useState(20);
    const [grid, setGrid] = useState(getRandomGrid(width, height));
    const [error, setError] = useState('');

    let [generation, setGeneration] = useState(0);
    let [aliveCount, setAliveCount] = useState(0);
    const [displayMode, setDisplayMode] = useState('blackWhite');

    const calculateInitialAliveCount = (grid) => {
        return grid.filter(cell => cell.alive).length;
    };

    useEffect(() => {
        const newGrid = getRandomGrid(width, height);
        setGrid(newGrid);
        setAliveCount(calculateInitialAliveCount(newGrid));
    }, [width, height]);

    const handleChangeWidth = (e) => {
        const newWidth = parseInt(e.target.value);
        if (newWidth >= 3 && newWidth <= 40) {
            setWidth(newWidth);
            setError('');
        } else {
            setError('Width must be between 3 and 40');
        }
    };

    const handleChangeHeight = (e) => {
        const newHeight = parseInt(e.target.value);
        if (newHeight >= 3 && newHeight <= 40) {
            setHeight(newHeight);
            setError('');
        } else {
            setError('Height must be between 3 and 40');
        }
    };

    const handleSubmit = () => {
        if (!error) {
            const newGrid = getRandomGrid(width, height);
            setGrid(newGrid);
            setAliveCount(calculateInitialAliveCount(newGrid));
            setGeneration(0);
        }
    };

    const handleClickCell = (id) => {
        const newGrid = grid.map(cell => {
            if (cell.id === id) {
                // creates a new object identical to the existing cell object 
                // except that the alive property is flipped
                return { ...cell, alive : !cell.alive, deadCount: cell.alive ? cell.deadCount + 1 : cell.deadCount };
            }
            return cell;
        });
        setGrid(newGrid);
    };

    const handleNextGeneration = () => {
        let newAliveCount = 0;
        const nextGrid = grid.map((cell, index) => {
            const row = Math.floor(index / width);
            const col = index % width;
            const aliveNeighbors = countAliveNeighbors(grid, row, col, width, height);
    
            let alive = cell.alive;
            let lastAlive = cell.lastAlive;
            if (cell.alive) {
                alive = aliveNeighbors === 2 || aliveNeighbors === 3;
                lastAlive = 0;
            } else {
                alive = aliveNeighbors === 3;
                lastAlive = !alive && cell.lastAlive < 10 ? cell.lastAlive + 1 : cell.lastAlive;
            }
    
            if (alive) {
                newAliveCount++;
                lastAlive = 0;
            }

            return { ...cell, alive, lastAlive };
        });

        setGrid(nextGrid);
        setAliveCount(newAliveCount);
        setGeneration(prevGeneration => prevGeneration + 1)
    }

    function getColorForCell(lastAlive) {
        const colors = [
            [24, 53, 103],
            [46, 100, 158], 
            [23, 173, 203], 
            [0, 250, 250], 
        ];
        const segments = colors.length - 1;
        const segmentLength = 10 / segments;
        const segmentIndex = Math.min(Math.floor(lastAlive / segmentLength), segments - 1);
        const fraction = (lastAlive % segmentLength) / segmentLength; // Fraction through the current segment

        const startColor = colors[segmentIndex];
        const endColor = colors[segmentIndex + 1];

        const color = startColor.map((start, index) => 
            Math.round(start + (endColor[index] - start) * fraction)
        );
    
        return `rgb(${color.join(',')})`;
    }
    

    function countAliveNeighbors(grid, row, col, width, height) {
        let aliveNeighbors = 0;
        const directions = [
            [-1, -1], [-1, 0], [-1, 1], 
            [0, -1], [0, 1], 
            [1, -1], [1, 0], [1, 1]
        ];
    
        directions.forEach(([dRow, dCol]) => {
            const newRow = row + dRow, newCol = col + dCol;
            if (newRow >= 0 && newRow < height && newCol >= 0 && newCol < width) {
                const neighborIndex = newRow * width + newCol;
                if (grid[neighborIndex].alive) {
                    aliveNeighbors++;
                }
            }
        });
    
        return aliveNeighbors;
    }

    const handleReset = () => {
        setGrid(getRandomGrid(width, height));
        setGeneration(0);
        setAliveCount(0);
    }

    return (
        <div className="board-container">
            <div className='input-fields'>
                <label>
                    Width: 
                    <input 
                        id="width"
                        type="number"
                        min="3"
                        max="40"
                        value={width}
                        onChange={handleChangeWidth}
                    />
                </label>
                <label>
                    Height: 
                    <input 
                        id="height"
                        type="number"
                        min="3"
                        max="40"
                        value={height}
                        onChange={handleChangeHeight}
                    />
                </label>
                <button onClick={handleSubmit}>Submit</button>
                {error && <span className='error'>{error}</span>}
            </div>

            <div className="grid" style={{'--grid-width': width, '--grid-heigth': height}}>
                {grid.map(cell => (
                    <div
                        key={cell.id}
                        className={`cell ${cell.alive ? 'alive' : 'dead'}`}
                        onClick={() => {handleClickCell(cell.id)}}
                        style={{
                            backgroundColor: displayMode === 'heatmap' ? getColorForCell(cell.lastAlive) : (cell.alive ? 'black' : 'white'),
                        }}
                    ></div>
                ))}
            </div>

            <div className="buttons">
                <button onClick={handleNextGeneration}>
                    Next
                </button>
                
                <button onClick={handleReset}>
                    Reset
                </button>
            </div>

            <div className="mode-selection">
                <label>
                    Display Mode:
                    <select value={displayMode} onChange={(e) => setDisplayMode(e.target.value)}>
                        <option value="blackWhite">Black / White</option>
                        <option value="heatmap">Heatmap</option>
                    </select>
                </label>
            </div>

            <div className="data">
                <span className="generation">
                    Generation <b>{generation}</b>
                </span>
                <span className="alive-count">
                    Alive Cells <b>{aliveCount}</b>
                </span>
            </div>
        </div>
    );
}

export default Board;