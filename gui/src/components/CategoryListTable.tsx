import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { observable, toJS } from 'mobx';

import { Input, Icon, Table } from 'antd';

import { CategoryStory, ICategory } from '../stores';

type EditableCellProps = {
    id: number;
    value?: string;
    onChange?(id: number, value: string): void;
};

@observer
class EditableCell extends React.Component<EditableCellProps> {
    id: number = this.props.id;
    @observable value = this.props.value;
    @observable editable = false;

    handleChange = e => {
        this.value = e.target.value;
    };

    edit = () => {
        this.editable = true;
    };

    done = () => {
        this.editable = false;
        if (this.props.onChange) {
            this.props.onChange(this.id, this.value);
        }
    };

    render() {
        const value = this.value;
        const editable = this.editable;

        return (
            <div className="editable-cell">
                {editable ? (
                    <div className="editable-cell-input-wrapper">
                        <Input
                            value={value}
                            onChange={this.handleChange}
                            onPressEnter={this.done}
                        />
                        <Icon
                            type="check"
                            className="editable-cell-icon-check"
                            onClick={this.done}
                        />
                    </div>
                ) : (
                    <div className="editable-cell-text-wrapper">
                        {value || ' '}
                        <Icon
                            type="edit"
                            className="editable-cell-icon"
                            onClick={this.edit}
                        />
                    </div>
                )}
            </div>
        );
    }
}

type CategoryListTableProps = {
    store?: CategoryStory;
};

@inject('store')
@observer
export class CategoryListTable extends React.Component<CategoryListTableProps> {
    columns;

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'categoryId'
            },
            {
                title: 'Jméno',
                dataIndex: 'name'
            },
            {
                title: 'Pořadí',
                dataIndex: 'orderBy',
                render: (text, record) => (
                    <EditableCell
                        id={record.categoryId}
                        value={text}
                        onChange={this.onCellChange}
                    />
                )
            }
        ];
    }

    onCellChange = (id: number, value: string) => {
        this.props.store.changeOrderBy(id, value);
    };

    render() {
        const categories = toJS(this.props.store.categories);
        const columns = this.columns;
        return (
            <div>
                <Table
                    dataSource={categories}
                    columns={columns}
                    rowKey="categoryId"
                />
            </div>
        );
    }
}
