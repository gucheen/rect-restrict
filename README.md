# Rect Restrict

[![rect-restrict](https://badgen.net/npm/v/@gucheen/rect-restrict)](https://www.npmjs.com/package/@gucheen/rect-restrict)
[![Coverage Status](https://coveralls.io/repos/github/gucheen/rect-restrict/badge.svg?branch=main)](https://coveralls.io/github/gucheen/rect-restrict?branch=main)

RectRestrict is simple util to help you restrict your target to some areas(rectangle).

## Motivation

Recently in a project of mine, I need to restrict a user-draggable item to several areas.

Users can drag the item to anywhere on the web page, but the item finally needs to be in several areas when it was dropped.

So, I wrote this simple util.

## Usage

```
npm i @gucheen/rect-restrict
```

```ts
import { RectRestrict } from '@gucheen/rect-restrict';

const rectRestrict = new RectRestrict();

rectRestrict.setAreas([
  {
    id: 1,
    top: 50,
    left: 50,
    width: 200,
    heigth: 200,
  },
]);

const result = rectRestrict.check({
  top: 10,
  left: 10,
  width: 20,
  height: 20,
});

console.log(result);

/**
{x: 50, y: 50, left: 50, top: 50, id: 1}
* /
```

## Api

### Area

```ts
interface Area {
  id?: any;
  x?: number;
  top?: number;
  y?: number;
  left?: number;
  right?: number;
  bottom?: number;
  width: number;
  height: number;
  center?: [number, number];
}
// one of top and y should be provided
// one of left and x should be provided
// id will be returned in check() if it was provided
```

### class RectRestrict({areas}: {areas?: Area[]} = {})

### static RectRestrict.optimizeRect(area: Partial\<Area\>): OptimizeArea

```ts
interface OptimizeArea {
  id?: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
  center: [number, number];
}
```

This static method is used internally to deal with the areas' data.

You may also use it to get formatted data.

### RectRestrict.check(target: Area): RestrictPosition

```ts
interface RestrictPosition {
  top: number;
  left: number;
  x: number;
  y: number;
  id: any; // the id of area which this postion belongs to
}
```

Check if the target was in one of the areas.

Return the current position of the target if it is already in one of the areas.

Return the closest position of the closest area otherwise.

The closest position means that the restricted position will be one side or corner of the area.

### RectRestrict.getPosInArea(pos: Partial\<Area\>): Area

Return the area if the given position is in it.

## FAQ

1. Is it too simple to cover some more complex demands?

    This lib(util, well) is focused on the specific proposal - restrict a rectangle in others.

2. What if I need to deal with a polygon or circle?

    Refer to a physical engine or game engine to deal with complex problems.

## MIT License

Copyright (c) 2020 Cheng Gu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

