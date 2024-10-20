/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios')
const fs = require('fs')

async function main() {
  const isLook = process.argv[2]
  const GOOGLE_SHEET_ID = '1qNT0yPIaGvo6dIOAR9I7qZoj98wmTiRMjXt30xCoHu8'
  try {
    const { data } = await axios({
      method: 'get',
      url: `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq`,
    })
    // 데이터 정제
    const refindSheetsData = (string) => {
      const firstSplit = string.split('google.visualization.Query.setResponse(')[1]
      const jsonData = JSON.parse(firstSplit.slice(0, firstSplit.length - 2))
      return jsonData.table
    }
    const { rows } = refindSheetsData(data)
    // 언어별로 나누기
    const valueArray = rows[0].c.filter((row) => row !== null).map((row) => row.v)

    // 언어별로 파일 생성
    for (let index = 0; index < valueArray.length - 1; index += 1) {
      const element = valueArray[index]
      const result = {}
      let localeIndex = 0
      rows.forEach((row) => {
        row.c.forEach((r, idxs) => {
          if (r !== null && r.v === element) {
            localeIndex = idxs
          }
        })
        const key = row.c[0]?.v
        const subKey = row.c[1]?.v
        if (key && subKey && row.c[localeIndex]?.v) {
          result[`${key}.${subKey}`] = row.c[localeIndex]?.v
        }
      })

      const resultString = `export default ${JSON.stringify(result, null, 2).replace(/\"/g, "'")} as const \n`
      fs.writeFileSync(`./src/locales/${element}.ts`, resultString)
      console.log(`${element} 파일 생성 완료`)
    }

    // eslint-disable-next-line @typescript-eslint/no-shadow
    // fs.readFile('./src/middleware.ts', 'utf8', (err, data) => {
    //   if (err) {
    //     console.error(err)
    //     return
    //   }
    //   console.log(isLook)
    //   let newData = ''
    //   // Add 'const text = 'testttttt';' after 'const session = await auth();'
    //   if (isLook === 'look') {
    //     newData = data.replace(
    //       'const session = await auth()',
    //       "const session = await auth()\nif (if (!request.nextUrl.pathname.includes('look') && !request.nextUrl.pathname.includes('notfound')) {request.nextUrl.pathname = `/notfound`return I18nMiddleware(request)})}",
    //     )
    //   } else {
    //     newData = data.replace(
    //       'const session = await auth()',
    //       "const session = await auth()\nif (if (request.nextUrl.pathname.includes('look')) {request.nextUrl.pathname = `/notfound`return I18nMiddleware(request)}}",
    //     )
    //   }

    //   // eslint-disable-next-line @typescript-eslint/no-shadow
    //   fs.writeFile('./src/middleware.ts', newData, 'utf8', (err) => {
    //     if (err) {
    //       console.error(err)
    //       return
    //     }
    //     console.log('File has been updated')
    //   })
    // })
  } catch (error) {
    console.log(error)
  }
}

main()
