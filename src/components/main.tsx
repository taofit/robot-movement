import React, {ChangeEvent, FormEvent, useState} from 'react';
import {RoomSize, Position, Error, Result} from '../helpers/types';
import {finalPosition, isCommand, isOrientation, isPosition, isSize} from '../helpers/helper';

const MIN_WIDTH = 1;
const MIN_DEPTH = 1;
const MIN_X = 0;
const MIN_Y = 0;
const INIT_ERROR = {command: '', orientation: '', position: '', size: ''};

const OPTIONS = ['E', 'N', 'S', 'W'];

const Main = () => {
    const [size, setSize] = useState<RoomSize>({W: 5, D: 5});
    const [initPosition, setInitPosition] = useState<Position>({X: 0, Y: 0});
    const [orientation, setOrientation] = useState<string>('E');
    const [command, setCommand] = useState<string>('');
    const [error, setError] = useState<Error>({...INIT_ERROR});
    const [result, setResult] = useState<Result>({finalLocation:{...initPosition}, finalOrientation: orientation});

    const setWidth = (e: ChangeEvent<HTMLInputElement>) => {
        setSize({...size, W: Number(e.target.value)})
    };

    const setDepth = (e: ChangeEvent<HTMLInputElement>) => {
        setSize({...size, D: Number(e.target.value)})
    };

    const setInitalPositionX = (e: ChangeEvent<HTMLInputElement>) => {
        setInitPosition({...initPosition, X: Number(e.target.value)});
    };
    const setInitalPositionY = (e: ChangeEvent<HTMLInputElement>) => {
        setInitPosition({...initPosition, Y: Number(e.target.value)});
    };

    const setOrientationValue = (e: ChangeEvent<HTMLSelectElement>) => {
        setOrientation(e.target.value.toUpperCase());
    }
    const setCommandValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCommand(e.target.value.trim().toUpperCase());
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let curError = {...INIT_ERROR};

        if (!isCommand(command)) {
            curError.command = 'wrong command characters';
        }
        if (!isOrientation(orientation)) {
            curError.orientation = 'wrong orientation characters';
        }
        if (!isSize(size)) {
            curError.size = 'wrong size';
        }
        if (!isPosition(initPosition)) {
            curError.position = 'wrong position';
        }
        setError(curError);
        if (Object.values(curError).every((error) => error === '')) {
            const result = finalPosition(size, initPosition, orientation, command);
            setResult(result);
        }
    }
    const fetchResult = () => <div className="result-show">
        Final location: ({result.finalLocation.X}, {result.finalLocation.Y}),
        Final orientation: {result.finalOrientation}
    </div>;

    return <>
        <h3>Robot movement</h3>
        <form onSubmit={handleSubmit}>
            <div>
                <label className="main-field">Room size:</label>
                <label htmlFor="width">Room width:</label>
                <input name="width" type="number" value={size.W} min={MIN_WIDTH} onChange={setWidth} />
                <label htmlFor="depth">Room depth:</label>
                <input name="depth" type="number" value={size.D} min={MIN_DEPTH} onChange={setDepth} />
                {error?.size && <span>{error.size}</span>}
            </div>
            <div>
                <label className="main-field">Initial position:</label>
                <label htmlFor="positionX">Position X:</label>
                <input name="positionX" type="number" value={initPosition.X} min={MIN_X} max={size.W - 1} onChange={setInitalPositionX} />
                <label htmlFor="positionY">Position Y:</label>
                <input name="positionY" type="number" value={initPosition.Y} min={MIN_Y} max={size.D - 1} onChange={setInitalPositionY} />
                {error?.position && <span>{error.position}</span>}
            </div>
            <div>
                <label className="main-field" htmlFor="orientation">Initial orientation:</label>
                <select value={orientation} name="orientation" onChange={setOrientationValue}>
                    {OPTIONS.map((option) => (
                        <option value={option} key={option}>{option}</option>
                    ))}
                </select>
                {error?.orientation && <span>{error.orientation}</span>}
            </div>
            <div>
                <label className="main-field" htmlFor="command">Command:</label>
                <textarea name="command" className="command" rows={4} cols={60} value={command} onChange={setCommandValue} />
                {error?.command && <span>{error.command}</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
        {fetchResult()}
    </>
};

export default Main;