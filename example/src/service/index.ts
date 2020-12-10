const delay: (t: number) => Promise<unknown> = (t: number) => {
  return new Promise(resolve => setTimeout(resolve, t));
};
let times = 0;
export const fakeRequest = async ({
  page = 1,
  page_size = 10,
  keyword,
}: any = {}) => {
  if (times > 5) {
    times = 0;
  }
  console.log(page, page_size, keyword);
  await delay(500);
  const records: any[] = [];
  for (let i = (page - 1) * page_size + 1; i < page * page_size + 1; i++) {
    records.push({
      id: i,
      title: `t${i}`,
      message: `keyword: ${keyword}`,
    });
  }
  return {
    content: {
      records,
      total_records: 1000,
    },
    times: ++times,
  };
};

export const getAll = async () => {
  const { content } = await fakeRequest({ page: 1, page_size: 1000 });
  return content.records;
};
