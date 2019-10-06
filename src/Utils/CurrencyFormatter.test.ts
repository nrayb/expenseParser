import { formatValue } from "./CurrencyFormatter";

test("Test formatValue with default parameters", () => {
    expect(formatValue(100)).toBe("100.00");
    expect(formatValue(100.1)).toBe("100.10");
    expect(formatValue(100.10)).toBe("100.10");
    expect(formatValue(100.100)).toBe("100.10");
    expect(formatValue(1000)).toBe("1,000.00");
    expect(formatValue(1000000.00)).toBe("1,000,000.00");
});

test("Test formatValue with thousands separator", () => {
    expect(formatValue(1000, ".")).toBe("1.000.00");
    expect(formatValue(1000000.00, ".")).toBe("1.000.000.00");
});

test("Test formatValue with decimal separator", () => {
    expect(formatValue(100, undefined, "p")).toBe("100p00");
    expect(formatValue(100.1, undefined, "p")).toBe("100p10");
    expect(formatValue(100.10, undefined, "p")).toBe("100p10");
    expect(formatValue(100.100, undefined, "p")).toBe("100p10");
});

test("Test formatValue with decimal places", () => {
    expect(formatValue(100, undefined, undefined, 5)).toBe("100.00000");
    expect(formatValue(100.99999999, undefined, undefined, 7)).toBe("101.0000000");
    expect(formatValue(100.112314, undefined, undefined, 7)).toBe("100.1123140");
    expect(formatValue(100.10, undefined, undefined, 1)).toBe("100.1");
    expect(formatValue(100.190, undefined, undefined, 1)).toBe("100.2");
});
