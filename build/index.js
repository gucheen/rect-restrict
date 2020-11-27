"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RectRestrict = void 0;
const isNumber = (value) => typeof value === 'number';
const validateCenterArr = (center) => {
    return Array.isArray(center) && isNumber(center[0]) && isNumber(center[1]);
};
class RectRestrict {
    constructor({ areas } = {}) {
        this.areas = [];
        if (Array.isArray(areas)) {
            this.setAreas(areas);
        }
    }
    static optimizeRect(area) {
        const top = area.top || area.y;
        const left = area.left || area.x;
        const width = area.width;
        const height = area.height;
        if (!isNumber(top)) {
            throw new Error('top or y should be a number');
        }
        if (!isNumber(left)) {
            throw new Error('left or x should be a number');
        }
        if (!isNumber(width)) {
            throw new Error('width should be a number');
        }
        if (!isNumber(height)) {
            throw new Error('height should be a number');
        }
        const right = area.right || left + width;
        const bottom = area.bottom || top + height;
        const center = (validateCenterArr(area.center)
            ? area.center
            : [left + width / 2, top + height / 2]);
        return {
            id: area.id,
            top,
            left,
            right,
            bottom,
            width,
            height,
            center,
        };
    }
    setAreas(areas) {
        this.areas = areas.map(area => {
            return RectRestrict.optimizeRect(area);
        });
    }
    check(target) {
        const { top, left, right, bottom, center, width, height, } = RectRestrict.optimizeRect(target);
        let min = Number.MAX_VALUE;
        let closest = null;
        const availableAreas = this.areas.filter(area => area.width >= width && area.height >= height);
        for (let i = 0; i < availableAreas.length; i++) {
            const area = availableAreas[i];
            if (left >= area.left &&
                top >= area.top &&
                right <= area.right &&
                bottom <= area.bottom) {
                return {
                    x: left,
                    left,
                    y: top,
                    top,
                    id: area.id,
                };
            }
            const distance = Math.sqrt(Math.pow(area.center[0] - center[0], 2) +
                Math.pow(area.center[1] - center[1], 2));
            if (distance < min) {
                min = distance;
                closest = area;
            }
        }
        if (closest === null) {
            return null;
        }
        let newLeft = left;
        let newTop = top;
        if (left < closest.left) {
            newLeft = closest.left;
        }
        else if (right > closest.right) {
            newLeft = closest.right - width;
        }
        if (top < closest.top) {
            newTop = closest.top;
        }
        else if (bottom > closest.bottom) {
            newTop = closest.bottom - height;
        }
        return {
            x: newLeft,
            y: newTop,
            left: newLeft,
            top: newTop,
            id: closest.id,
        };
    }
    getPosInArea(target) {
        const { top, left, right, bottom } = RectRestrict.optimizeRect(target);
        for (let i = 0; i < this.areas.length; i++) {
            const area = this.areas[i];
            if (left >= area.left &&
                top >= area.top &&
                right <= area.right &&
                bottom <= area.bottom) {
                return area;
            }
        }
        return null;
    }
}
exports.RectRestrict = RectRestrict;
//# sourceMappingURL=index.js.map