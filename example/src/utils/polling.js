class Polling {
    errorRetryCount = 0;
    interval = 1000;
    T;
    loading = false;
    polling = false;
    constructor({errorRetryCount, interval}){
        if(errorRetryCount) {
        this.errorRetryCount = errorRetryCount;
        }
    
        
    }
    // 开始
    start(){

    }
    // 停止
    stop(){

    }
    // 暂停
    pause(){

    }
}