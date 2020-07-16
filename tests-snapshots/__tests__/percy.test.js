const puppeteer = require('puppeteer')
const {percySnapshot} = require('@percy/puppeteer')

describe('Percy Visual Test',()=>{
    let browser
    let page

    beforeAll(async ()=>{
        browser = await puppeteer.launch({headless:false})
        page = await browser.newPage()
    })

    afterAll(async ()=>{
        await  browser.close()
     })


     test('Full Page Percy Snapshot',async  ()=>{
        await page.goto('http://example.com/')
        await page.waitForSelector('h1')
        await page.evaluate(()=>{
            (document.querySelectorAll('h1') || []).forEach(el => el.remove())
        })
        await percySnapshot(page,'Example Page')
     })









})