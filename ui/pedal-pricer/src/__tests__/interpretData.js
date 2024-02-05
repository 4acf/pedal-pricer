//this file contains unit tests for the interpretData function
//interpretData is a function used for generating the grouped selection of items contained in the sidebar
//note: these tests ensure that the data in the dropdowns is organized correctly. it does not verify that the data points to existing entries in the database

import { interpretData } from "../components/SubMenu";

test("interpretData returns empty array when passed no arguments", function() {
    expect(interpretData()).toStrictEqual([]);
})

test("interpretData returns empty array when passed an empty array but with a valid type", function() {
    expect(interpretData([], "Pedal")).toStrictEqual([]);
})

test("interpretData returns empty array when passed no type argument", function() {

    let itemData = [{
        pedalID: 1,
        pedalName: "Pedal",
        pedalBrand: "Brand"
    }];

    expect(interpretData(itemData)).toStrictEqual([]);
})

test("interpretData returns empty array when passed the wrong type", function() {

    let itemData = [{
        pedalID: 1,
        pedalName: "Pedal",
        pedalBrand: "Brand"
    }];

    expect(interpretData(itemData, "Pedalboard")).toStrictEqual([]);
})

test("interpretData lumps items of the same brand into one object", function() {

    let itemData = [
        {
            pedalID: 1,
            pedalName: "Pedal",
            pedalBrand: "Brand"
        },
        {
            pedalID: 2,
            pedalName: "Pedal2",
            pedalBrand: "Brand"
        }
    ];

    expect(interpretData(itemData, "Pedal").length).toStrictEqual(1);
})

test("interpretData separates items of different brands", function() {

    let itemData = [
        {
            pedalID: 1,
            pedalName: "Pedal",
            pedalBrand: "Brand"
        },
        {
            pedalID: 2,
            pedalName: "Pedal2",
            pedalBrand: "Brand2"
        }
    ];

    expect(interpretData(itemData, "Pedal").length).toStrictEqual(2);
})

test("interpretData skips any elements of the wrong type", function() {

    let itemData = [
        {
            pedalID: 1,
            pedalName: "Pedal",
            pedalBrand: "Brand"
        },
        {
            pedalID: 2,
            pedalName: "Pedal2",
            pedalBrand: "Brand2"
        },
        {
            pedalboardID: 3,
            pedalboardName: "Pedalboard",
            pedalboardBrand: "PedalboardBrand"
        }
    ];

    expect(interpretData(itemData, "Pedal").length).toStrictEqual(2);
})

test("interpretData skips any elements with ID of invalid type", function() {

    let itemData = [
        {
            pedalID: 1,
            pedalName: "Pedal",
            pedalBrand: "Brand"
        },
        {
            pedalID: "2",
            pedalName: "Pedal2",
            pedalBrand: "Brand2"
        }
    ];

    expect(interpretData(itemData, "Pedal").length).toStrictEqual(1);
})

test("interpretData skips any elements with undefined name", function() {

    let itemData = [
        {
            pedalID: 1,
            pedalName: "Pedal",
            pedalBrand: "Brand"
        },
        {
            pedalID: 2,
            pedalName: undefined,
            pedalBrand: "Brand2"
        }
    ];

    expect(interpretData(itemData, "Pedal").length).toStrictEqual(1);
})

test("interpretData skips any elements with undefined brand", function() {

    let itemData = [
        {
            pedalID: 1,
            pedalName: "Pedal",
            pedalBrand: "Brand"
        },
        {
            pedalID: 2,
            pedalName: "Pedal2",
            pedalBrand: undefined
        }
    ];

    expect(interpretData(itemData, "Pedal").length).toStrictEqual(1);
})

test("interpretData skips any elements with incorrect/missing data", function() {

    let itemData = [
        {
            pedalID: 1,
            pedalName: "Pedal",
            pedalBrand: "Brand"
        },
        {
            attribute: "test"
        },
        {
            pedalID: 2
        }
    ];

    expect(interpretData(itemData, "Pedal").length).toStrictEqual(1);
})

test("interpretData does not save data contained in extraneous attributes", function() {

    let itemData = [
        {
            pedalID: 1,
            pedalName: "Pedal",
            pedalBrand: "Brand",
            pedalWidth: 2.5
        }
    ];

    expect(interpretData(itemData, "Pedal")[0].options[0].width).toStrictEqual(undefined);
})

test("interpretData retains same behavior with pedalboard type", function() {

    let itemData = [
        {
            pedalboardID: 1,
            pedalboardName: "Pedalboard",
            pedalboardBrand: "Brand"
        },
        {
            pedalboardID: 2,
            pedalboardName: "Pedalboard2",
            pedalboardBrand: "Brand2"
        }
    ];

    expect(interpretData(itemData, "Pedalboard").length).toStrictEqual(2);
})

test("interpretData retains same behavior with power supply type", function() {

    let itemData = [
        {
            powerSupplyID: 1,
            powerSupplyName: "PS",
            powerSupplyBrand: "Brand"
        },
        {
            powerSupplyID: 2,
            powerSupplyName: "PS2",
            powerSupplyBrand: "Brand2"
        }
    ];

    expect(interpretData(itemData, "PowerSupply").length).toStrictEqual(2);
})