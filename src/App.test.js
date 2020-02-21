import React from 'react';
import {shallow, mount} from 'enzyme'
import App from './components/App';
import Board from "./components/Board";
import Player from "./components/Player";

it('app renders without crashing', () => {
    shallow(<App/>)
});

it('app includes board', () => {
    const app = shallow(<App/>);
    expect(app.containsMatchingElement(<Board/>)).toEqual(true)
});

it('app includes players table', () => {
    const app = shallow(<App/>);
    expect(app.containsMatchingElement(<Player/>)).toEqual(true)
});

describe("renders proper player table", () => {
    it('renders correct captured table rows', () => {
        const captured = {pawns: 0, knight: 0, bishop: 0, rook: 0, queen: 0};
        const wrapper = shallow(<Player captured={captured} isWhite={true}/>);
        const tableHeaders = wrapper.find("th");
        const tableRows = wrapper.find("td");
        expect(tableHeaders).toHaveLength(5);
        expect(tableRows).toHaveLength(5);
    });

    it('renders correct images in captured pieces table', () => {
        const captured = {pawns: 0, knight: 0, bishop: 0, rook: 0, queen: 0};
        const wrapper = shallow(<Player name="Janek" captured={captured} isWhite={true}/>);
        const images = wrapper.find("img");
        expect(images.get(0).props.src).toEqual("https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png")
    });

    it('renders correct piece data in captured pieces table', () => {
        const captured = {pawn: 0, knight: 1, bishop: 2, rook: 3, queen: 2};
        const wrapper = shallow(<Player name="Janek" captured={captured} isWhite={true}/>);
        const pieces = wrapper.find("td");
        expect(pieces.get(0).props.children).toEqual(0);
        expect(pieces.get(1).props.children).toEqual(1);
        expect(pieces.get(2).props.children).toEqual(2);
        expect(pieces.get(3).props.children).toEqual(3);
        expect(pieces.get(4).props.children).toEqual(2);
    });
});

describe("renders proper board with right colors", () => {
    it("renders board with 64 squares", () => {
        const wrapper = shallow(<Board pieces={[]}/>);
        const squares = wrapper.find("Square");
        expect(squares).toHaveLength(64)
    });

    it("renders squares with proper colors", () => {
        const wrapper = shallow(<Board pieces={[]}/>);
        const squares = wrapper.find("Square");
        expect(squares.get(0).props.color).toEqual("white-square");
        expect(squares.get(1).props.color).toEqual("black-square");
        expect(squares.get(28).props.color).toEqual("black-square");
        expect(squares.get(29).props.color).toEqual("white-square");
        expect(squares.get(62).props.color).toEqual("black-square");
        expect(squares.get(63).props.color).toEqual("white-square");
    });

    it("renders highlighted square after clicking on it", () => {
        const wrapper = mount(<Board pieces={[]}/>);
        expect(wrapper.find({id: 62}).prop("color")).toEqual("black-square");
        wrapper.find({id: 62}).simulate('click');
        expect(wrapper.find({id: 62}).prop("color")).toEqual("clicked");
    });
});


describe("clicking on king renders possible moves and captures", () => {
    const mockBoardState = [
        {squareId: 27, name: "pawn", player: 1},
        {squareId: 28, name: "pawn", player: 1},
        {squareId: 35, name: "king", player: 1},
        {squareId: 36, name: "pawn", player: 2},
        {squareId: 42, name: "pawn", player: 2},
        {squareId: 43, name: "pawn", player: 2},
        {squareId: 44, name: "pawn", player: 2},
    ];
    const wrapper = mount(<Board pieces={mockBoardState}/>);
    wrapper.find({id: 35}).simulate("click");

    it("renders possible captures", () => {
        expect(wrapper.find({id: 36}).prop("color")).toEqual("to-capture");
        expect(wrapper.find({id: 42}).prop("color")).toEqual("to-capture");
        expect(wrapper.find({id: 43}).prop("color")).toEqual("to-capture");
        expect(wrapper.find({id: 44}).prop("color")).toEqual("to-capture");
    });

    it("doesn't highlight friendly pieces", () => {
        expect(wrapper.find({id: 27}).prop("color")).not.toEqual("to-capture");
        expect(wrapper.find({id: 28}).prop("color")).not.toEqual("to-capture");
        expect(wrapper.find({id: 27}).prop("color")).not.toEqual("highlighted");
        expect(wrapper.find({id: 28}).prop("color")).not.toEqual("highlighted");
    });

    it("highlights possible moves", () => {
        expect(wrapper.find({id: 34}).prop("color")).toEqual("highlighted");
        expect(wrapper.find({id: 26}).prop("color")).toEqual("highlighted");
    })
});


describe("clicking on a piece renders possible moves and captures", () => {
    const mockBoardState = [
        {squareId: 8, name: "pawn", player: 1},
        {squareId: 25, name: "pawn", player: 1},
        {squareId: 32, name: "rook", player: 2},
        {squareId: 34, name: "rook", player: 2},
    ];
    const wrapper = mount(<Board pieces={mockBoardState}/>);


    it("clicking on piece that didn't move renders proper moves", () => {
        wrapper.find({id: 8}).simulate("click");
        expect(wrapper.find({id: 16}).prop("color")).toEqual("highlighted");
        expect(wrapper.find({id: 24}).prop("color")).toEqual("highlighted");
        expect(wrapper.find({id:32}).prop("color")).not.toEqual("highlighted");
    });

    it("clicking on piece that moved renders proper moves", () => {
        wrapper.find({id: 25}).simulate("click");
        expect(wrapper.find({id: 33}).prop("color")).toEqual("highlighted");
        expect(wrapper.find({id: 41}).prop("color")).not.toEqual("highlighted");
        expect(wrapper.find({id: 41}).prop("color")).not.toEqual("to-capture");
        }
    );

    it("clicking on a piece renders possible captures", () => {
        wrapper.find({id: 25}).simulate("click");
        expect(wrapper.find({id: 34}).prop("color")).toEqual("to-capture");
        expect(wrapper.find({id: 32}).prop("color")).toEqual("to-capture");
    })
});


