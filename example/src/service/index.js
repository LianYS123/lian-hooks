import { delay } from 'utils'

let times = 0
// 
export const fakeRequest = async ({ page = 1, page_size = 10, keyword }) => {
  if (times > 5) {
    times = 0
  }
  console.log(page, page_size, keyword)
  await delay(500)
  const records = []
  for (let i = (page - 1) * page_size + 1; i < page * page_size + 1; i++) {
    records.push({
      id: i,
      title: `t${i}`,
      message: `keyword: ${keyword}`
    })
  }
  return {
    data: records,
    times: ++times
  }
}

export const getAll = async () => {
  return await fakeRequest({ page: 1, page_size: 1000 })
}
