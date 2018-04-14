import * as React from 'react';
import { Provider } from 'mobx-react';

import { CategoryStory, ICategory } from '../stores';
import { CategoryListTable } from './CategoryListTable';

const categories: ICategory[] = [
    { categoryId: 1, name: 'Test 1', orderBy: 1 },
    { categoryId: 2, name: 'Test 2', orderBy: 2 },
    { categoryId: 3, name: 'Test 3', orderBy: 3 }
];

const rootStore = CategoryStory.fromJS(categories);
interface AppProps {
    message: string;
}

export const App: React.SFC<AppProps> = props => {
    return (
        <Provider store={rootStore}>
            <React.Fragment>
                <h1>message</h1>
                <CategoryListTable />
            </React.Fragment>
        </Provider>
    );
};
