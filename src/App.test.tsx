import React from 'react';
import { render, screen } from '@testing-library/react';
import { finalPosition, validate, isSize, isInRoom } from './helpers/helper';
import App from './App';

test('renders robot title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Robot movement/i);
  expect(linkElement).toBeInTheDocument();
});

test('test final location', () => {
  expect(finalPosition({W: 5, D: 5}, {X: 0, Y: 0}, 'E', 'FRLLLRFLFFLFLFRLRLRF')).toStrictEqual({
    finalLocation: {X: 1, Y: 0}, finalOrientation: 'S'});
});
test('test final location case 2', () => {
  expect(finalPosition({W: 7, D: 7}, {X: 2, Y: 2}, 'N', 'LFLRFRRLFLRFLFFRFRFF')).toStrictEqual({
    finalLocation: {X: 2, Y: 5}, finalOrientation: 'E'});
});
test('test final location case 3', () => {
  expect(finalPosition({W: 7, D: 7}, {X: 0, Y: 2}, 'N', 'LFLRFRRLFLRFLFFRFRFF')).toStrictEqual({
    finalLocation: {X: 2, Y: 5}, finalOrientation: 'E'});
});
test('test final location case 4', () => {
  expect(finalPosition({W: 7, D: 7}, {X: 0, Y: 2}, 'E', 'LFLRFRRLFLRFLFFRFRFF')).toStrictEqual({
    finalLocation: {X: 3, Y: 4}, finalOrientation: 'S'});
});
test('test final location case 5', () => {
  expect(finalPosition({W: 10, D: 5}, {X: 0, Y: 0}, 'W', 'FLRFRLFLFFLFFFLFFFFFRFF')).toStrictEqual({
    finalLocation: {X: 5, Y: 4}, finalOrientation: 'E'});
});
test('test final location case 6', () => {
  expect(finalPosition({W: 7, D: 70}, {
    X: 0,
    Y: 2
  }, 'E', 'LFLRFRRLFLRFLFFRFRFFFFLLRFLRLFRLFRLFLRFLRFLRLFLRFLFFLLFFFFFFFFFFFFFFF')).toStrictEqual({
    finalLocation: {X: 2, Y: 20}, finalOrientation: 'N'});
});

test('wrong room size, robot will not work', () => {
  const initLocation = {X: 0, Y: 0};
  const initOrientation = 'E';

  expect(finalPosition({W: 5, D: -5}, initLocation, initOrientation, 'FRLLLRFLFFLFLFRLRLRF')).toStrictEqual({
    finalLocation: initLocation, finalOrientation: initOrientation});
});

test('wrong initial location, robot will not work', () => {
  const initLocation = {X: -3, Y: 0};
  const initOrientation = 'W';

  expect(finalPosition({W: 5, D: 15}, initLocation, initOrientation, 'LFRFLFLFRLRLRF')).toStrictEqual({
    finalLocation: initLocation, finalOrientation: initOrientation});
});

test('wrong room size, robot will not work case 2', () => {
  const initLocation = {X: 0, Y: 2};
  const initOrientation = 'E';

  expect(finalPosition({W: 7, D: -7}, initLocation, initOrientation, 'LFRLFLFLRFLFLRLFLRFRLFLRFLFFRFRFF')).toStrictEqual({
    finalLocation: initLocation, finalOrientation: initOrientation});
});

test('is it valid input? is location inside of room', () => {
  expect(validate({W: 5, D: 15}, {X: -3, Y: 0}, 'W', 'LFRFLFLFRLRLRF')).toBeFalsy();
});
test('is it valid input? is location inside of room case 2', () => {
  expect(validate({W: 5, D: 5}, {X: 6, Y: 0}, 'E', 'LFRFRLRLRF')).toBeFalsy();
});
test('is it valid input? is command correct', () => {
  expect(validate({W: 53, D: 5}, {X: 3, Y: 0}, 'E', 'LFRFsdf34LFRLRLRF')).toBeFalsy();
});
test('is it valid input? input is not correct', () => {
  expect(validate({W: -25, D: 45}, {X: 3, Y: 0}, 'E', 'LFLRLRFLLLFLRLRLRLFLLRLRLRLRLLLFRLRLL')).toBeFalsy();
});
test('is it valid input? room size is not correct', () => {
  const roomSize = {W: -25, D: 45};
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




