import { faker } from "@faker-js/faker";

const NUM_ITEMS = 4;

type Item = {
  name: string;
  price: number;
};

type Coin = {
  name: string;
  value: number;
};

const availableCoins = [
  { name: "50p", value: 50 },
  { name: "£1", value: 100 },
  { name: "£2", value: 200 },
] satisfies Coin[];

class InferSumProblem {
  #person = faker.person.firstName();

  #items: Item[] = [];
  #chosenItems = new Set<Item>();

  #coin: Coin;

  constructor() {
    do {
      this.setup();
    } while (!this.hasUniqueSolution);

    do {
      this.#coin = availableCoins.at(
        ~~(availableCoins.length * Math.random()),
      )!;
    } while (this.coin.value < this.total);
  }

  private setup() {
    const items = new Set<string>();
    const prices = new Set<number>();

    while (Array.from(items).length < NUM_ITEMS) items.add(faker.food.fruit());
    while (Array.from(prices).length < NUM_ITEMS)
      prices.add(Number(faker.finance.amount({ min: 0.01, max: 0.99 })));

    const arrItems = Array.from(items);
    const arrPrices = Array.from(prices);

    this.#items = arrItems.map((name, idx) => ({
      name,
      price: arrPrices.at(idx)!,
    }));

    while (Array.from(this.#chosenItems).length < 2) {
      const randomItem = this.#items.at(~~NUM_ITEMS * Math.random());
      if (randomItem) this.#chosenItems.add(randomItem);
    }
  }

  get hasUniqueSolution() {
    const totalPrice = Array.from(this.#chosenItems).reduce(
      (acc, item) => acc + item.price,
      0,
    );

    const otherPairs = this.#items.flatMap((item, i) =>
      this.#items
        .slice(i + 1)
        .map((otherItem) => [item, otherItem])
        .filter(
          ([itemA, itemB]) =>
            !this.#chosenItems.has(itemA) && !this.#chosenItems.has(itemB),
        ),
    );

    return !otherPairs.some(
      (pair) => pair.reduce((acc, item) => acc + item.price, 0) === totalPrice,
    );
  }

  get person() {
    return this.#person;
  }

  get items() {
    return this.#items;
  }

  get chosenItems() {
    return this.#chosenItems;
  }

  get total() {
    return Array.from(this.#chosenItems).reduce(
      (acc, item) => acc + item.price,
      0,
    );
  }

  get coin() {
    return this.#coin;
  }

  get change() {
    return this.coin.value - this.total;
  }
}

export default InferSumProblem;
