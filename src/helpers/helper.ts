import {Position, RoomSize, OrientationToOrientation} from './types';

export const ORIENTATION_MAP: OrientationToOrientation = {N:{ L: 'W', R: 'E'}, E:{L: 'N', R: 'S'}, S:{L: 'E', R: 'W'}, W:{L: 'S', R: 'N'}};

const IsTurnCommand = (cmd: string) => ['R', 'L'].includes(cmd);
const IsForwardCommand = (cmd: string) => cmd === 'F';
export const isCommand = (command: string) => command.toUpperCase().match(/^[LRF]+$/);
export const isOrientation = (orientation: string) => orientation.toUpperCase().match(/^[NESW]$/);
export const isSize = (size: RoomSize) => size.W > 0 && size.D > 0;
export const isInRoom = (size: RoomSize, position: Position) => {
    return position.X >= 0 && position.X < size.W  && position.Y >= 0 && position.Y < size.D;
}

export const validate = (size: RoomSize, iniPosition: Position, orientation: string, command: string) => {
    if (!isSize(size)) return false;
    if (!isInRoom(size, iniPosition)) return false;
    if (!isOrientation(orientation)) return false;
    if (!isCommand(command)) return false;

    return true;
};

export const finalPosition = (size: RoomSize, iniPosition: Position, orientation: string, command: string) => {
    orientation = orientation.toUpperCase();
    command = command.toUpperCase();

    let curOrientation = orientation;
    let curLocation:Position = {X: iniPosition.X, Y: iniPosition.Y};

    for (let cmd of command) {
        if (IsTurnCommand(cmd)) {
            curOrientation = ORIENTATION_MAP[curOrientation][cmd];
        } else if (IsForwardCommand(cmd)) {
            switch (curOrientation) {
                case 'N': if (curLocation.Y < size.D - 1) curLocation.Y++;
                    break;
                case 'E': if (curLocation.X < size.W - 1) curLocation.X++;
                    break;
                case 'S': if (curLocation.Y > 0) curLocation.Y--;
                    break;
                case 'W': if (curLocation.X > 0) curLocation.X--;
                    break;
            }
        }
    }

    return {finalLocation: {X:curLocation.X, Y:curLocation.Y}, finalOrientation: curOrientation};
};

export const finalPositionWithValidation = (size: RoomSize, iniPosition: Position, orientation: string, command: string) => {
    if (!validate(size, iniPosition, orientation, command)) {
        return false;
    }

    return finalPosition(size, iniPosition, orientation, command);
}