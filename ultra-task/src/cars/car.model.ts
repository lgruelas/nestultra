export class Car {
    constructor(
        public id: string,
        public manufacturer: any,
        public price: number,
        public firstRegistrationDate: Date,
        public owners: Array<any>
    ) {}
}