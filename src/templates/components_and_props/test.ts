import { expect, findAll } from "@/lib/testing";

export default async function test() {
	const cards = findAll(".person-display-card");

	expect(cards.at(0).find("h2").text).toContain("Karla");
	expect(cards.at(0).find("p").text).toContain("Armadillo");

	expect(cards.at(1).find("h2").text).toContain("Alex");
	expect(cards.at(1).find("p").text).toContain("Bat");

	expect(cards.at(2).find("h2").text).toContain("Julia");
	expect(cards.at(2).find("p").text).toContain("Capybara");
}
