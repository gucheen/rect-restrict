const test = require('ava');
const { RectRestrict } = require('../')

test('check() should return the postion of target if it is already in one of the areas', t => {
  const rectRestrict = new RectRestrict({
    areas: [
      {
        id: 1,
        top: 50,
        left: 50,
        width: 200,
        height: 200,
      },
    ],
  })
  const target = {
    top: 60,
    left: 60,
    width: 20,
    height: 20,
  }
  const pos = rectRestrict.check(target);
  t.is(pos.y, target.top);
  t.is(pos.x, target.left);
	t.pass();
});

test('check() should return the closest position of the closest area if the target is outside of all areas', t => {
  const areas = [
    {
      id: 1,
      top: 50,
      left: 50,
      width: 50,
      height: 50,
    },
    {
      id: 2,
      top: 380,
      left: 380,
      width: 200,
      height: 200,
    },
  ];
  const rectRestrict = new RectRestrict({
    areas,
  })
  const target = {
    top: 100,
    left: 100,
    width: 20,
    height: 20,
  }
  const pos = rectRestrict.check(target);
  t.is(pos.id, areas[0].id);
	t.pass();
});

test('check() should return null if none area cound match the target', t => {
  const areas = [
    {
      id: 1,
      top: 50,
      left: 50,
      width: 50,
      height: 50,
    },
    {
      id: 2,
      top: 380,
      left: 380,
      width: 200,
      height: 200,
    },
  ];
  const rectRestrict = new RectRestrict({
    areas,
  })
  const target = {
    top: 100,
    left: 100,
    width: 300,
    height: 300,
  }
  const pos = rectRestrict.check(target);
  t.is(pos, null);
  rectRestrict.setAreas([]);
  const pos2 = rectRestrict.check(target);
  t.is(pos2, null);
	t.pass();
});

test('getPosInArea()', t => {
  const areas = [
    {
      id: 1,
      top: 50,
      left: 50,
      width: 100,
      height: 100,
    },
    {
      id: 2,
      top: 380,
      left: 380,
      width: 200,
      height: 200,
    },
  ];
  const rectRestrict = new RectRestrict({
    areas,
  })
  const target = {
    top: 100,
    left: 100,
    width: 20,
    height: 20,
  }
  const area = rectRestrict.getPosInArea(target);
  t.is(area.id, areas[0].id);
	t.pass();
});

test('throw error if uncorrect Area(rect) was given', t => {
  t.throws(() => {
    new RectRestrict({
      areas: [
        {
          top: 1,
          width: 1,
        },
      ],
    })
  });
  t.throws(() => {
    new RectRestrict({
    areas: [
      {
        left: 1,
        width: 1,
      },
    ],
  })
  });
  t.throws(() => {
    new RectRestrict({
    areas: [
      {
        left: 1,
        top: 1,
      },
    ],
  })
  });
  t.throws(() => {
    new RectRestrict({
      areas: [
        {
          left: 1,
          top: 1,
          width: 1,
        },
      ],
    })
  });
  const rectRestrict = new RectRestrict([])
  const target = {
    top: 100,
    left: 100,
    width: 20,
  }
  t.throws(() => {
    rectRestrict.check(target);
  });
});
