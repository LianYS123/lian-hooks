export interface UsePollingParamType {
    method(...params: any[]): Promise<any>;
    onReceive?(data?: any): boolean;
    interval?: number;
    errorRetryCount?: number;
    autoStart?: boolean;
    pollingWhenHidden?: boolean;
}
/**
 * @description: 处理轮询状态的hooks
 * @param method 请求方法
 * @param onReceive 当接收到数据时调用的函数, 返回true不再继续请求
 * @param interval 请求间隔
 * @param errorRetryCount 发生错误后继续请求次数
 * @param autoStart 是否自动触发
 * @param pollingWhenHidden 页面隐藏时是否继续请求
 * @return 轮询状态和操作函数
 */
export declare const usePolling: ({ method, onReceive, interval, errorRetryCount, autoStart, pollingWhenHidden, }: UsePollingParamType) => {
    start: () => void;
    cancel: () => void;
    loading: boolean;
    data: any;
    polling: boolean;
};
