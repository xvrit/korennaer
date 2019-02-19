export const formatDate = (date: Date): string => {
  // date must be a string
  const inputDate: Date = new Date(date);
  let dd: number | string = inputDate.getDate();
  let mm: number | string = inputDate.getMonth() + 1; // January is 0!
  const yyyy: number | string = inputDate.getFullYear();

  if (dd < 10) dd = `0` + dd;

  if (mm < 10) mm = `0` + mm;

  return `${dd}-${mm}-${yyyy}`;
};

export const formatDateWithTime = (date: Date): string => {
  // date must be a string
  const inputDate = new Date(date);
  const H = inputDate.getHours() > 10 ? inputDate.getHours() : `0` + inputDate.getHours();
  const i = inputDate.getMinutes() > 10 ? inputDate.getMinutes() : `0` + inputDate.getMinutes();
  let dd: string | number = inputDate.getDate();
  let mm: string | number = inputDate.getMonth() + 1; // January is 0!
  const yyyy: string | number = inputDate.getFullYear();

  if (dd < 10) dd = `0` + dd;
  if (mm < 10) mm = `0` + mm;

  return `${dd}-${mm}-${yyyy} ${H}:${i}`;
};

export const formatDateTextual = (date: Date): string => {
  const dayNames = [ `Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat` ];
  const monthNames = [ `Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sept`, `Oct`, `Nov`, `Dec` ];

  // date must be a string
  const inputDate = new Date(date);
  const H = inputDate.getHours() > 10 ? inputDate.getHours() : `0` + inputDate.getHours();
  const i = inputDate.getMinutes() > 10 ? inputDate.getMinutes() : `0` + inputDate.getMinutes();
  const DDD: string | number = dayNames[inputDate.getDay()];
  let dd: string | number = inputDate.getDate();
  const MMM: string | number = monthNames[inputDate.getMonth()];
  const yyyy: string | number = inputDate.getFullYear();

  if (dd < 10) dd = `0` + dd;

  return `${DDD} ${MMM} ${dd} ${yyyy} ${H}:${i}`;
};

export const formatNamedDate = (date: Date): string => {
  const monthNames = [
    `Januari`,
    `Februari`,
    `Maart`,
    `April`,
    `Mei`,
    `Juni`,
    `July`,
    `Augustus`,
    `September`,
    `Oktober`,
    `November`,
    `December`
  ];

  // date must be a string
  const inputDate = new Date(date);
  const dd = inputDate.getDate();
  const mm = inputDate.getMonth() + 1; // January is 0!

  return `${dd} ${monthNames[mm]}`;
};

export const dayRemap = (day: number): number => (day === 0 ? 6 : day - 1);

export const formatDateReversed = (date: Date): string => {
  // date must be a string
  const inputDate = new Date(date);
  let dd: string | number = inputDate.getDate();
  let mm: string | number = inputDate.getMonth() + 1; // January is 0!
  const yyyy: string | number = inputDate.getFullYear();

  if (dd < 10) dd = `0` + dd;

  if (mm < 10) mm = `0` + mm;

  return `${yyyy}-${mm}-${dd}`;
};

export const millisToDays = (millis: number): number => millis / 1000 / 60 / 60 / 24;

export const formatAmount = (amount: string): string => parseFloat(amount).toLocaleString().replace(/,/g, `.`);

export const formatMoneyString = (string: string): string => parseFloat(string).toFixed(2).replace(`.`, `,`);

export const parserData = (data: any): string => {
  if (data === 0) return String(data);
  else {
    data = parseFloat(data);
    let dec = ``;
    if (data % 1 === 0) dec = `.00`;

    let num = data.toLocaleString();

    num = `${num}${dec}`;

    const array = num.split(/[,]/);
    let result = `${array[0]}`;

    for (let i = 1; i < array.length; i++) result = `${result}.${array[i]}`;

    const arr = result.split(/[.]/);
    const decimal = arr.pop();
    result = arr.join(`.`);

    if (decimal.length === 1) result = `${result},${decimal}0`;
    else if (decimal.length >= 3) result = `${result},${decimal.substring(0, 2)}`;
    else result = `${result},${decimal}`;

    return result;
  }
};

export const isValidDate = (date: string): boolean => {
  const matches = /^[0-9]{4}(-|\/)[0-3]{1}[0-9]{1}(-|\/)[0-3]{1}[0-9]{1} [0-9]{2}:[0-9]{2}:[0-9]{2}$/.exec(date);
  if (matches === null) return false;
  else return true;
};

export const isValidCreditCard = (cardNumber: string): boolean => {
  const matches = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/.exec(cardNumber);
  if (matches === null) return false;
  else return true;
};

export const isValidPassword = (password: string): boolean => {
  const matches = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.exec(password);
  if (matches === null) return false;
  else return true;
};

export const isValidateEmail = (email: string): boolean => {
  const matches = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.exec(
    email
  );
  if (matches === null) return false;
  else return true;
};

export const isValidNumber = (number: any): boolean => {
  const matches = /-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?/.exec(number);
  if (matches === null) return false;
  else return true;
};

export const handleShowModal = (modal: string, environment: any) => {
  const {[modal]: modalState} = environment.state;
  environment.setState({[modal]: !modalState});
  document.querySelector(`html`).classList.toggle(`no-scroll`);
};

export const handleHideModalAnywhere = ({target}: any, modal: string, modalContainer: string, environment: any) =>
  target === modalContainer && handleShowModal(modal, environment);

// @ts-ignore
String.prototype.capitalize = (): string => this.charAt(0).toUpperCase() + this.slice(1);

interface Hash<T> {
  [key: string]: T;
}

export class HashMap<T> {
  public _hashMap: Hash<T>;

  constructor() {
    this._hashMap = {};
  }

  public set(key: string, val: T) {
    this._hashMap[key] = val;
  }

  public get(key: string): T {
    return this._hashMap[key];
  }

  public delete(key: string) {
    delete this._hashMap[key];
  }

  public clear() {
    this._hashMap = {};
  }
}
