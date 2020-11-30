export interface UseRequestParamsType {
    [key: string]: any;
    method(params?: any, ...restArgs: any[]): Promise<any>;
    defaultParams?: any;
    necessaryParams?: any;
    autoLoad?: boolean;
}
/**
 * @description: 请求方法的简单封装，处理请求的loading状态
 * @param {*} defaultParams 默认参数
 * @param {*} necessaryParams 必要参数
 * @param {*} rest 请求方法额外参数, onError事件等options可以通过这个参数传递
 */
export declare const useRequest: ({ method, defaultParams, necessaryParams, autoLoad, ...rest }: UseRequestParamsType) => {
    loading: boolean;
    error: Error | undefined;
    data: any;
    search: (_params?: any) => void;
    reload: () => void;
};
