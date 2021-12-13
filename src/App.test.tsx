import React from 'react';
import { finalPositionWithValidation, validate, isSize, isInRoom, isOrientation, isCommand } from './helpers/helper';

test('test final location', () => {
  const initLocation = {X: 0, Y: 0};
  const initOrientation = 'E';
  const roomSize = {W: 5, D: 5};
  const command = 'FRLLLRFLFFLFLFRLRLRF';

  expect(finalPositionWithValidation(roomSize, initLocation, initOrientation, command)).toStrictEqual({
    finalLocation: {X: 1, Y: 0}, finalOrientation: 'S'});
});
test('test final location case 2', () => {
  const initLocation = {X: 2, Y: 2};
  const initOrientation = 'n';
  const roomSize = {W: 7, D: 7};
  const command = 'LFLRFRRLFLRFLFFRFRFF';

  expect(finalPositionWithValidation(roomSize, initLocation, initOrientation, command)).toStrictEqual({
    finalLocation: {X: 2, Y: 5}, finalOrientation: 'E'});
});
test('test final location case 3', () => {
  const initLocation = {X: 0, Y: 2};
  const initOrientation = 'N';
  const roomSize = {W: 7, D: 7};
  const command = 'LFLRFRRLFLRFLFFRFRFF';

  expect(finalPositionWithValidation(roomSize, initLocation, initOrientation, command)).toStrictEqual({
    finalLocation: {X: 2, Y: 5}, finalOrientation: 'E'});
});
test('test final location case 4', () => {
  const initLocation = {X: 0, Y: 2};
  const initOrientation = 'e';
  const roomSize = {W: 7, D: 7};
  const command = 'LFLRFRRLFLRFLFFRFRFF';

  expect(finalPositionWithValidation(roomSize, initLocation, initOrientation, command)).toStrictEqual({
    finalLocation: {X: 3, Y: 4}, finalOrientation: 'S'});
});
test('test final location case 5', () => {
  const initLocation = {X: 0, Y: 0};
  const initOrientation = 'W';
  const roomSize = {W: 10, D: 5};
  const command = 'FLRFRLFLFFLFFFLFFFFFRFF';

  expect(finalPositionWithValidation(roomSize, initLocation, initOrientation, command)).toStrictEqual({
    finalLocation: {X: 5, Y: 4}, finalOrientation: 'E'
  });
});

test('test final location case 6', () => {
  const initLocation = {X: 0, Y: 2};
  const initOrientation = 'E';
  const roomSize = {W: 7, D: 70};
  const command = 'LFLRFRRLFLRFLFFRFRFFFFLLRFLRLFRLFRLFLRFLRFLRLFLRFLFFLLFFFFFFFFFFFFFFF';

  expect(finalPositionWithValidation(
      roomSize,
      initLocation,
      initOrientation,
      command)).toStrictEqual({
    finalLocation: {X: 2, Y: 20}, finalOrientation: 'N'});
});

test('test final location case not equal', () => {
  const initLocation = {X: 5, Y: 32};
  const initOrientation = 'n';
  const roomSize = {W: 40, D: 50};
  const command = 'LFLRFRRLFLRFLFFRFRFFFFLLRFLRLFRLFRLFLRFLRFLRLFLRFLFFLLFFFFFFFFFFFFFFF';

  expect(finalPositionWithValidation(
      roomSize,
      initLocation,
      initOrientation,
      command)).not.toStrictEqual({
        finalLocation: {X: 2, Y: 20},
        finalOrientation: 'N'
      });
});

test('wrong room size, robot will not work', () => {
  const initLocation = {X: 0, Y: 0};
  const initOrientation = 'E';
  const roomSize = {W: 5, D: -5};
  const command = 'FRLLLRFLFFLFLFRLRLRF';

  expect(finalPositionWithValidation(roomSize, initLocation, initOrientation, command)).toBe(false);
});

test('wrong initial location, robot will not work', () => {
  const initLocation = {X: -3, Y: 0};
  const initOrientation = 'W';
  const roomSize = {W: 5, D: 15}
  const command = 'LFRFLFLFRLRLRF';

  expect(finalPositionWithValidation(roomSize, initLocation, initOrientation, command)).toBeFalsy();
});

test('wrong room size, robot will not work case 2', () => {
  const initLocation = {X: 0, Y: 2};
  const initOrientation = 'E';
  const roomSize = {W: 7, D: -7};
  const command = 'LFRLFLFLRFLFLRLFLRFRLFLRFLFFRFRFF';

  expect(finalPositionWithValidation(roomSize, initLocation, initOrientation, command)).toBeFalsy();
});

test('wrong orientation, robot will not work', () => {
  const initLocation = {X: 21, Y: 37};
  const initOrientation = 'p';
  const roomSize = {W: 7, D: 7};
  const command = 'LFRLFLFLRFLFLRLFLRFRLFLRFLFFRFRFF';

  expect(finalPositionWithValidation(roomSize, initLocation, initOrientation, command)).toBeFalsy();
});

test('room size wrong input key', () => {
  const initLocation = {X: 0, Y: 0};
  const initOrientation = 'W';
  const roomSize = {s: 10, D: 5};
  const command = 'FLRlfrlrlrlflflrflrlrllrflflrllrlrflrllFRFF';

  expect(finalPositionWithValidation(roomSize, initLocation, initOrientation, command)).toBeFalsy();
});
test('is it valid input? is location inside of room', () => {
  const initLocation = {X: -3, Y: 0};
  const initOrientation = 'W';
  const roomSize = {W: 5, D: 15};
  const command = 'LFRFLFLFRLRLRF';

  expect(validate(roomSize, initLocation, initOrientation, command)).toBeFalsy();
});
test('is it valid input? is location inside of room case 2', () => {
  const initLocation = {X: 6, Y: 0};
  const initOrientation = 'e';
  const roomSize = {W: 5, D: 5};
  const command = 'LFRFRLRLRF';

  expect(validate(roomSize, initLocation, initOrientation, command)).toBeFalsy();
});
test('is it valid input? is command correct', () => {
  const initLocation = {X: 3, Y: 0};
  const initOrientation = 'e';
  const roomSize = {W: 53, D: 5};
  const command = 'LFRFsdf34LFRLRLRF';

  expect(validate(roomSize, initLocation, initOrientation, command)).toBeFalsy();
});
test('is it valid input? input is not correct', () => {
  const initLocation = {X: 3, Y: 0};
  const initOrientation = 'e';
  const roomSize = {W: -25, D: 45};
  const command = 'LFLRLRFLLLFLRLRLRLFLLRLRLRLRLLLFRLRLL';

  expect(validate(roomSize, initLocation, initOrientation, command)).toBeFalsy();
});
test('is it valid input? room size is not correct, contains negative number', () => {
  const roomSize = {W: -25, D: 45};
  expect(isSize(roomSize)).toBeFalsy();
});
test('is it valid input? room size cannot be zero', () => {
  const roomSize = {W: 0, D: 0};
  expect(isSize(roomSize)).toBeFalsy();
});

test('is robot in room?', () => {
  const roomSize = {W: 25, D: 45};
  const position = {X: 3, Y: 40};
  expect(isInRoom(roomSize, position)).toBeTruthy();
});
test('is robot in room? case 2', () => {
  const roomSize = {W: 50, D: 59};
  const position = {X: 334, Y: 32};
  expect(isInRoom(roomSize, position)).toBeFalsy();
});

test('is robot in room? case 3, wrong position key', () => {
  const roomSize = {W: 500, D: 59};
  const position = {key: 334, Y: 32};
  expect(isInRoom(roomSize, position)).toBeFalsy();
});

test('test orientation case', () => {
  expect(isOrientation('e')).toBeTruthy();
});
test('test orientation case 2, wrong orientation', () => {
  expect(isOrientation('we')).toBeFalsy();
});

test('test command case', () => {
  expect(isCommand('lflrlflrlrfrflr')).toBeTruthy();
});

test('test command case 2, wrong command', () => {
  expect(isCommand('lflkwrlflrlrfrflr')).toBeFalsy();
});


