describe("adding", () => {

    it("adds a pedal to the canvas", () => {
        cy.visit("/");
        cy.openSidebar();
        cy.findByText("Pedals").click();
        cy.selectItem("BOSS GE-7 Graphic Equalizer");
        cy.findByRole("button", {name : "Add Pedal"}).click();
        cy.get("div.p").should("exist");
    })

    it("adds multiple pedals at the same time", () => {
        cy.visit("/");
        cy.openSidebar();
        cy.findByText("Pedals").click();
        cy.selectItem("BOSS GE-7 Graphic Equalizer");
        cy.selectItem("EarthQuaker Pyramids");
        cy.findByRole("button", {name : "Add Pedal"}).click();
        cy.get("div.p").should("have.length", 2);
    })

    it("adds a pedalboard to the canvas", () => {
        cy.visit("/");
        cy.openSidebar();
        cy.findByText("Pedalboards").click();
        cy.selectItem("Pedaltrain Classic 1");
        cy.findByRole("button", {name : "Add Pedalboard"}).click();
        cy.get("div.pb").should("exist");
    })

    it("adds multiple pedalboards to the canvas", () => {
        cy.visit("/");
        cy.openSidebar();
        cy.findByText("Pedalboards").click();
        cy.selectItem("Pedaltrain Classic 1");
        cy.selectItem("Pedaltrain Classic 2");
        cy.findByRole("button", {name : "Add Pedalboard"}).click();
        cy.get("div.pb").should("have.length", 2);
    })

    it("adds a power supply to the canvas", () => {
        cy.visit("/");
        cy.openSidebar();
        cy.findByText("Power Supplies").click();
        cy.selectItem("Strymon Ojai");
        cy.findByRole("button", {name : "Add Power Supply"}).click();
        cy.get("div.ps").should("exist");
    })

    it("adds multiple power supplies to the canvas", () => {
        cy.visit("/");
        cy.openSidebar();
        cy.findByText("Power Supplies").click();
        cy.selectItem("Strymon Ojai");
        cy.selectItem("Strymon Zuma");
        cy.selectItem("Voodoo Lab Pedal Power Digital");
        cy.findByRole("button", {name : "Add Power Supply"}).click();
        cy.get("div.ps").should("have.length", 3);
    })

    it("adds at least one of each item to the canvas", () => {
        cy.viewport(1920,1080);
        cy.visit("/");
        cy.openSidebar();
        cy.findByText("Pedals").click();
        cy.findByText("Pedalboards").click();
        cy.findByText("Power Supplies").click();
        cy.get("#react-select-2-input").type("DOD Gonkulator Ringmod");
        cy.findByText("DOD Gonkulator Ringmod").click();
        cy.findByRole("button", {name : "Add Pedal"}).click();
        cy.get("#react-select-3-input").type("Pedaltrain Classic 3");
        cy.findByText("Pedaltrain Classic 3").click();
        cy.findByRole("button", {name : "Add Pedalboard"}).click();
        cy.get("#react-select-4-input").type("Mooer Micro Power");
        cy.findByText("Mooer Micro Power").click();
        cy.findByRole("button", {name : "Add Power Supply"}).click();
        cy.get("div.p").should("exist");
        cy.get("div.pb").should("exist");
        cy.get("div.ps").should("exist");
    })

    it("doesn't let you add an item twice at the same time", () => {
        cy.visit("/");
        cy.openSidebar();
        cy.findByText("Pedals").click();
        cy.selectItem("Electro-Harmonix Knockout");
        cy.get("input").type("Electro-Harmonix Knockout");
        cy.findByText("Electro-Harmonix Knockout").should("have.length", 1);
    })

    it("can remove selections", () => {
        cy.visit("/");
        cy.openSidebar();
        cy.findByText("Pedals").click();
        cy.selectItem("Electro-Harmonix Knockout");
        cy.get("div.css-v7duua").click();
        cy.findByRole("button", {name : "Add Pedal"}).click();
        cy.get("div.p").should("have.length", 0);

    })

})