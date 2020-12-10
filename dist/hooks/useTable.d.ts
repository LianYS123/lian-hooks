import { UseRequestParamsType } from './useRequest';
import { TableRowSelection } from 'antd/lib/table/interface';
export interface UseTableParamsType extends UseRequestParamsType {
    defaultPageSize?: number;
    getAllKeys?(): Promise<any>;
    rowSelection?: boolean | TableRowSelection<any>;
    formatter?(data: any): {
        total: number;
        dataSource: any[];
    };
}
/**
 * @description: 封装方便antd table使用的hooks
 * @param defaultPageSize 默认分页大小, 不传默认为10
 * @param defaultParams 默认请求参数
 * @param necessaryParams 必要请求参数
 * @param method 请求方法
 * @param formatter 请求结果数据转换函数
 * @param rowSelection 选项框属性，为true时展示默认选项框
 * @param getAllKeys 用于勾选所有数据操作时获取 selectedRowKeys
 */
declare const useTable: (options: UseTableParamsType) => {
    loading: boolean;
    data: any;
    reload: () => void;
    search: (_params?: any) => void;
    pagination: {
        current: number;
        pageSize: number;
        total: any;
        onChange: (current: number, pageSize: number) => void;
        onShowSizeChange: (current: number, pageSize: number) => void;
    };
    tableProps: {
        dataSource: any;
        loading: boolean;
        pagination: {
            current: number;
            pageSize: number;
            total: any;
            onChange: (current: number, pageSize: number) => void;
            onShowSizeChange: (current: number, pageSize: number) => void;
        };
        rowSelection: TableRowSelection<any> | undefined;
    };
};
export { useTable };
