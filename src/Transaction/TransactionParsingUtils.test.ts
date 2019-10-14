import { parseDate } from "./TransactionParsingUtils";

test("Tets parseDate for format from RBC", () => {
    // From RBC
    let date = parseDate("9/22/2019");
    expect(date.getDate()).toBe(22);
    expect(date.getMonth()).toBe(8);
    expect(date.getFullYear()).toBe(2019);

    date = parseDate("12/1/2019");
    expect(date.getDate()).toBe(1);
    expect(date.getMonth()).toBe(11);
    expect(date.getFullYear()).toBe(2019);

    date = parseDate("12/22/2019");
    expect(date.getDate()).toBe(22);
    expect(date.getMonth()).toBe(11);
    expect(date.getFullYear()).toBe(2019);

    date = parseDate("9/1/2019");
    expect(date.getDate()).toBe(1);
    expect(date.getMonth()).toBe(8);
    expect(date.getFullYear()).toBe(2019);

    date = parseDate("1/2/2019");
    expect(date.getDate()).toBe(2);
    expect(date.getMonth()).toBe(0);
    expect(date.getFullYear()).toBe(2019);
});
