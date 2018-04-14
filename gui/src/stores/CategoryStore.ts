import { observable, action, IObservableArray, toJS } from 'mobx';

export interface ICategory {
    categoryId: number;
    name: string;
    orderBy: number;
}

export class CategoryStory {
    @observable categories: IObservableArray<ICategory> = observable.array([]);

    @action
    changeOrderBy(categoryId: number, orderBy: string) {
        const category = this.categories.find(
            item => item.categoryId === categoryId
        );

        if (category) {
            category.orderBy = parseInt(orderBy);
        }
    }

    static fromJS(categories: ICategory[]) {
        const store = new CategoryStory();

        categories.forEach(category => {
            store.categories.push(category);
        });
        return store;
    }
}
