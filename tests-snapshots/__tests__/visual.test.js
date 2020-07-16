const puppeteer = require('puppeteer')
const{ toMatchImageSnapshot } = require ('jest-image-snapshot')

expect.extend({toMatchImageSnapshot })

describe('Visual Testing', function(){

    let browser
    let page

    beforeAll(async ()=>{
        browser = await puppeteer.launch({headless:false})
        page = await browser.newPage()
    })



    afterAll(async ()=>{
       await  browser.close()
    })


    test('Full page snapshot',async ()=>{
        await page.goto('http://example.com/')
        await page.waitForSelector('h1')
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot({
            failureThreshold:500,
            failureThresholdType:'pixel'
        })
    })

    
    test('Single Element Snapshot',async ()=>{
        await page.goto('http://example.com/')
        const h1 = await page.waitForSelector('h1')
        const image = await h1.screenshot()
        expect(image).toMatchImageSnapshot({
            failureThreshold:0.01,
            failureThresholdType:'percent'
        })
        
    })


    
    test('Mobile Snapshot',async ()=>{
        await page.goto('http://example.com/')
        await page.waitForSelector('h1')
        await page.emulate(puppeteer.devices['iPhone X'])
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot({
            failureThreshold:0.01,
            failureThresholdType:'percent'
        })
        
    })

    test('Tablet Snapshot',async ()=>{
        await page.goto('http://example.com/')
        await page.waitForSelector('h1')
        await page.emulate(puppeteer.devices['iPad landscape'])
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot({
            failureThreshold:0.01,
            failureThresholdType:'percent'
        })
        
    })

    test.only('Remove Elements before snapshot',async ()=>{
        await page.goto('http://example.com/')
        await page.evaluate(()=>{
                (document.querySelectorAll('h1') || []).forEach(el => el.remove())
        })

        await page.waitFor(5000)

    /*    const image = await page.screenshot();
        expect(image).toMatchImageSnapshot({
            failureThreshold:0.01,
            failureThresholdType:'percent'
        })
        */
    })
})