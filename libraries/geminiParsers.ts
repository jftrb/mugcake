import { IngredientSection } from "@/types/geminiTypes";

type TimeUnit = '' | 'sec' | 'min' | 'h'

export class Duration {
  time: number = 0;
  unit: TimeUnit = '';
  constructor(time: number, unit: TimeUnit) {
    this.time = time;
    this.unit = unit;
  }

  toString() {
    return this.unit === '' ? `${this.time}` : `${this.time} ${this.unit}`
  }
}

export function parseTime(time: string | null) {
  const timeValue = Number(time?.match(/\d+/)?.[0]);
  
  let unit: TimeUnit = "";

  // Case : Seconds
  const seconds = time?.match(/(sec|s)/i);
  if (seconds?.[0] as string !== undefined) {
    unit = "sec";
  }

  // Case : minutes
  const minutes = time?.match(/(min|m)/i);
  if (minutes?.[0] as string !== undefined) {
    unit = "min";
  }

  // Case : hours
  const hours = time?.match(/(hour|h)/i);
  if (hours?.[0] as string !== undefined) {
    unit = "h";
  }

  // Case : hours and minutes
  const hoursAndMin = time?.match(/(?<hours>\d+).*?(h).*?(?<mins>\d+).*?(m)/i)
  if (hoursAndMin !== null) { 
    const hours = Number(hoursAndMin?.groups?.hours as string)
    const mins = Number(hoursAndMin?.groups?.mins as string)
    return new Duration(hours * 60 + mins, 'min')
  }
  

  return !Number.isNaN(timeValue) ? new Duration(timeValue, unit) : new Duration(0, '');
}

export function addTimes(time1: Duration, time2: Duration) {
  if (time1.unit === time2.unit) {
    return new Duration(time1.time + time2.time, time1.unit)
  } else {
    const timeArray = [time1, time2]
    const timeInMins = timeArray.filter(t => t.unit === 'min')
    const timeInHours = timeArray.filter(t => t.unit === 'h')

    const totalMins = timeInMins.reduce((prev: number, current: Duration) => prev + current.time, 0)
    const totalHours = timeInHours.reduce((prev: number, current: Duration) => prev + current.time, 0)
    return new Duration(totalMins + totalHours * 60, 'min')
  }
}

export function parseIngredientSection(section: IngredientSection) {
  return {
    header: isHeaderInvalid(section.header) ? "" : section.header,
    ingredients: section.ingredients.map((i) => {
      return {
        quantity: parseQuantity(i.quantity),
        unit: i.unit === null ? '' : i.unit,
        ingredient: i.name,
        other: i.other,
      };
    }),
  };
}

export function parseQuantity(quantity: string): number {
  const americanQuantity = quantity.replace(",", ".")
  if (americanQuantity === "¾") return 0.75
  if (americanQuantity === "½") return 0.5
  if (americanQuantity === "¼") return 0.25
  if (americanQuantity === "") return 0
  
  const fraction = americanQuantity.match(/(?<numerator>\d+(\.\d+)?)\/(?<denominator>\d+(\.\d+)?)/)
  if (fraction) { 
    const numerator = Number(fraction?.groups?.numerator)
    const denominator = Number(fraction?.groups?.denominator)
    return round(numerator/denominator, 2)
  }
  const out = Number(americanQuantity)
  if (!out) {
    throw Error(`Unable to parse quantity provided : "${quantity}"`)
  }
  return out
}

export function parseTag(tag: string): string {
  const words = tag.split(" ")
  const capitalizedWords = words.map(w => {
    if (w.length > 0){
      return w[0].toUpperCase() + w.slice(1).toLowerCase()
    }
  });
  return capitalizedWords.join(" ")
}

function round(num: number, fractionDigits: number): number {
  return Number(num.toFixed(fractionDigits));
}

function isHeaderInvalid(header: string | null) {
  return header === "Ingredients" || header === "Ingrédients" || header === null
}
