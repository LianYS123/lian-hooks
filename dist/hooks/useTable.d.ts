import { UseRequestParamsType } from './useRequest';
export interface UseTableParamsType extends UseRequestParamsType {
    defaultPageSize?: number;
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
    };
};
export { useTable };
