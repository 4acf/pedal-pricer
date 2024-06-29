describe("deleting", () => {

    it("can delete a pedal from the canvas", () => {
        cy.viewport(1920,1080);
        cy.visit("/");
        cy.openSidebar();
        cy.findByText("Pedals").click();
        cy.selectItem("BOSS GE-7 Graphic Equalizer");
        cy.findByRole("button", {name : "Add Pedal"}).click();
        cy.get("div.p").click();
        cy.get(".options > svg").last().click();
        cy.get("div.p").should("not.be.visible");
    })

    it("can delete a pedalboard from the canvas", () => {
        cy.viewport(1920,1080);
        cy.visit("/");
        cy.openSidebar();
        cy.findByText("Pedalboards").click();
        cy.selectItem("Pedaltrain Metro 16");
        cy.findByRole("button", {name : "Add Pedalboard"}).click();
        cy.get("div.pb").click();
        cy.get(".options > svg").last().click();
        cy.get("div.pb").should("not.be.visible");
    })

    it("can delete a power supply from the canvas", () => {
        cy.viewport(1920,1080);
        cy.visit("/");
        cy.openSidebar();
        cy.findByText("Power Supplies").click();
        cy.selectItem("Strymon Ojai");
        cy.findByRole("button", {name : "Add Power Supply"}).click();
        cy.get("div.ps").click();
        cy.get(".options > svg").last().click();
        cy.get("div.ps").should("not.be.visible");
    })

    it("can clear all items from the canvas", () => {
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
        cy.findByText("Pedals").click();
        cy.findByText("Pedalboards").click();
        cy.findByText("Power Supplies").click();
        cy.findByText("Clear Canvas").click();
        cy.get("div.p").should("not.exist");
        cy.get("div.pb").should("not.exist");
        cy.get("div.ps").should("not.exist");
    })

})