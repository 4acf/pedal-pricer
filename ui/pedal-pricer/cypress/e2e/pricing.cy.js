describe("pricing", () => {
    
    it("correctly reflects price of items in canvas", () => {
        cy.visit("/");
        cy.openSidebar();
        cy.findByText("Pedalboards").click();
        cy.selectItem("Pedaltrain Metro 20");
        cy.findByRole("button", {name : "Add Pedalboard"}).click();
        cy.contains("Total: $0").should("not.exist");
    })

    it("correctly reflects prices when items are added", () => {
        cy.visit("/");
        cy.openSidebar();
        cy.findByText("Pedalboards").click();
        cy.selectItem("Pedaltrain Metro 20");
        cy.findByRole("button", {name : "Add Pedalboard"}).click();
        cy.contains("Total: $99.99").should("exist");
        cy.findByRole("button", {name : "Add Pedalboard"}).click();
        cy.contains("Total: $99.99").should("not.exist");
        cy.contains("Total: $199.98").should("exist");
        
    })

    it("correctly reflects prices after items are deleted", () => {
        cy.viewport(1920,1080);
        cy.visit("/");
        cy.openSidebar();
        cy.findByText("Pedalboards").click();
        cy.selectItem("Pedaltrain Metro 16");
        cy.findByRole("button", {name : "Add Pedalboard"}).click();
        cy.contains("Total: $89.99").should("exist");
        cy.get("div.pb").click();
        cy.get(".options > svg").last().click();
        cy.get("div.pb").should("not.be.visible");
        cy.contains("Total: $89.99").should("not.exist");
        cy.contains("Total: $0").should("exist");
    })

    it("correctly reflects override prices", () => {
        cy.viewport(1920,1080);
        cy.visit("/");
        cy.openSidebar();
        cy.findByText("Pedalboards").click();
        cy.selectItem("Pedaltrain Metro 16");
        cy.findByRole("button", {name : "Add Pedalboard"}).click();
        cy.contains("Total: $89.99").should("exist");
        cy.get("div.pedalboards").click();
        cy.findByPlaceholderText("Enter a custom price").type("50");
        cy.contains("Total: $89.99").should("not.exist");
        cy.contains("Total: $50.00").should("exist");
    })

})