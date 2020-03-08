import { readFixture, IFixtureData, readFixtures, readAllFixtures } from './readFixture';


describe('readFixture', () => {
  test('readFixture work will', () => {
   const simpleFixture: IFixtureData = readFixture(__dirname + '/elements/div/simple/simple.question.html');
   expect(simpleFixture.name).toBe('question: elements -> div -> simple -> simple');
   expect(simpleFixture.description).toBe('最简单的 div，只有宽高');
   expect(simpleFixture.fragment).toBe('<div></div>');
   expect(simpleFixture.stylesheet).toBe('div {\n    width: 100px;\n    height: 100px;\n    background-color: red;\n  }');
  });
});

describe('readFixtures', () => {
  test('readFixtures work will', () => {
    const fixture = readFixtures(__dirname + '/elements/div/simple');
    expect(fixture.question.fragment).toBe(fixture.answers[0].fragment);
    expect(fixture.question.stylesheet).toBe(fixture.answers[0].stylesheet);
    expect(fixture.question.fragment).toBe(fixture.answers[1].fragment);
    expect(fixture.question.stylesheet).not.toBe(fixture.answers[1].stylesheet);
  });
});

describe('readAllFixtures', () => {
  test('readAllFixtures work will', () => {
    const fixtureMap = readAllFixtures();
    expect(fixtureMap.size).not.toBe(0);
    expect(fixtureMap.get('elements -> div -> simple').title).not.toBeNull();
  });
});
