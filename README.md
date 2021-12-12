# Robot movement 

A robot is placed in a room size of width and depth(W,D). The instruction to robot has L: turn left, R: turn right, F: move forward.
The initial position of the robot in the room is in a location (X, Y) and its orientation(N,E,S,W) stands for north, east, south, and west, is where the robot is facing.
When robot is on the edge of the room and try to move against the wall. The robot will be obviously not able to move. After certain movements such as under a serial of instruction `FRLLLRFLFFLFLFRLRLRF`
the program should give the correct final location of the robot and which orientation it is facing.
When some wrong inputs are entered, the robot should not move, such as the room size has negative value, robot's initial location is not in the room, or the instruction contains the wrong command 
for example: `juyloedk` instead of command from `llfrffr`;
    
    Install the project:
1. first git clone: `https://github.com/taofit/robot-movement.git`
2. then under the project folder, enter command: `npm install`, 
3. last: run `yarn start`   
4. run test: either go to `src/App.test.tsx` run each individual function, or in the project folder, run command: `yarn test` and enter `a` to run all tests
    
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
