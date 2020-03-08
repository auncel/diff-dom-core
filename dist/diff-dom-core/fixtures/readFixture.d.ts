export interface IFixtureData {
    name: string;
    description: string;
    similarity: number;
    type: string;
    fragment: string;
    stylesheet: string;
}
export interface IFixture {
    title: string;
    question: IFixtureData;
    answers: IFixtureData[];
}
export declare function readFixture(filepath: any): IFixtureData;
export declare function readFixtures(dirpath: any): IFixture;
export declare function readAllFixtures(): Map<string, IFixture>;
