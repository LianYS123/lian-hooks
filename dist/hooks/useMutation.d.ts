/**
 * @description: 异步方法的简单封装，处理请求的loading状态
 * @param {function} method 异步方法
 * @return {array} 异步方法和转
 */
export declare const useMutation: (method: (...params: any[]) => Promise<any>, initialData?: any) => [(...params: any) => void, {
    loading: boolean;
    error: Error | undefined;
    data: any;
}];
