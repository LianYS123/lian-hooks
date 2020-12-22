export declare const fakeRequest: ({ page, page_size, keyword }?: any) => Promise<{
    content: {
        records: never[];
        total_records: number;
    };
    times: number;
}>;
