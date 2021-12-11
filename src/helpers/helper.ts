import {Position} from '../components/main';
type DM = {

}
export const DIRECTION_MAP = {'N':{ L: 'W', R: 'E'}, 'E':{L: 'N', R: 'S'}, 'S':{L: 'E', R: 'W'}, 'W':{L: 'S', R: 'N'}};

const IsTurnCommand = (cmd: string) => ['R', 'L'].includes(cmd);
const IsForwardCommand = (cmd: string) => cmd === 'F';

const finalPosition = (size, iniPosition:Position, orientation: 'N'|'E'|'S'|'W', commands: ('L'|'R')[]) => {
    let curDirection = orientation;
    let curLocation = {X: iniPosition.X, Y: iniPosition.Y};

    for (let cmd of commands) {
        if (IsTurnCommand(cmd)) {
            curDirection = DIRECTION_MAP[curDirection][cmd];
        } else if (IsForwardCommand(cmd)) {
            switch (curDirection) {
                case 'N': if (curLocation.Y < size.D - 1) curLocation.Y++;
                    break;
                case 'E': if (curLocation.X < size.W - 1) curLocation.X++;
                    break;
                case 'S': if (curLocation.Y > 0) curLocation.Y--;
                    break;
                case 'W': if (curLocation.X > 0) curLocation.X--;
                    break;
            }
        } else {
            return 'command is wrong';
        }
    }
    return [curLocation.X, curLocation.Y, curDirection];
};