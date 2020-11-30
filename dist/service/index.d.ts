export declare const fakeRequest: ({ page, page_size, keyword }?: any) => Promise<{
    content: {
        records: {
            id: number;
            title: string;
            message: string;
        }[];
        total_records: number;
    };
    times: number;
}>;
