# Challenges Faced
During the development of this application, a significant challenge was optimizing the logic for grid generation based on dynamic height and width inputs. Ensuring that the grid scaled efficiently and maintained performance across various device sizes required several modifications in css. 
Another challenge was managing the state of each cell within the grid, especially when implementing the rules of Conway's Game of Life where the state of each cell in the next generation depends on its neighbors. 

# Potential Enhancements
Given more time, I would implement an auto-play feature which should allow users to observe the evolution of the game without manual effort. 
Also, I want to provide a library of sample initial shapes which should lead to interesting changing patterns. 
From a design perspective, integrating a more responsive UI and incorporating interactive tutorials could greatly improve the user experience, making the game more enjoyable for a wider audience.

# Assumptions Made
While working on this assignment, I made a few assumptions to streamline the development process. One assumption was that users would be familiar with the basic premise of Conway's Game of Life, thus minimizing the need for extensive instructions within the app.
I also assumed that performance would not be significantly impacted on modern devices, even with larger grid sizes, based on the efficiency of the grid generation and state management logic implemented. 
Furthermore, I assumed that users would primarily interact with the app on devices with reasonable screen sizes. Thus when designing the responsive layout, I didn't take too much consideration on extremed scenarios.

# Completion Time
This assignment took 3 days to complete. On the first day, I revisited React hooks and state knowledge. On the second day, I learnt how to use Reac Router to implement the navbar and 3 basic pages. On the last day, I completed the gamePage logic.