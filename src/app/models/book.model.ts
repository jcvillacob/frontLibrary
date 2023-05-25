export class Category {
    constructor(
        public _id: string,
        public name: string
    ) { }
}

export class Editorial {
    constructor(
        public _id: string,
        public name: string
    ) { }
}

export class Book {
    constructor(
        public _id: string,
        public title: string,
        public author: string,
        public publisher: string,
        public publicationYear: number,
        public ISBN: string,
        public category: Category,
        public editorial: Editorial,
        public available: boolean,
        public loan: any,
        public barcode: string,
        public coverImage: string
    ) { }
}
