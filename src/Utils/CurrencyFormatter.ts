export function formatValue(
    value: number,
    thousandsSeparator: string = ",",
    decimalSeperator: string = ".",
    decimalPlaces: number = 2,
    ): string {
        return value.toFixed(decimalPlaces)
            .replace(/\./, `${decimalSeperator}`)
            .replace(/\d(?=(\d{3})+\.)/g, `$&${thousandsSeparator}`);
}
