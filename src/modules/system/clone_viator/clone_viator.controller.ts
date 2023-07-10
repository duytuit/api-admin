import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CloneViatorService } from './clone_viator.service';
import { CreateCloneViatorDto } from './dto/create-clone_viator.dto';
import { UpdateCloneViatorDto } from './dto/update-clone_viator.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { CategoriesService } from '../categories/categories.service';
import { ChapterDetailService } from '../chapter_detail/chapter_detail.service';
import { GenresService } from '../genres/genres.service';
import { ProductDetailsService } from '../product_details/product_details.service';
import { ProductsService } from '../products/products.service';
import { ProjectsService } from '../projects/projects.service';
import { UploadService } from '../upload/upload.service';
import { Public } from 'src/common/decorators/public.decorator';
import puppeteer from 'puppeteer';
import { Product } from '../products/entities/product.entity';
import { Helper } from 'src/common/utils/helper';

@Controller('system/clone-viator')
@Public()
export class CloneViatorController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly genresService: GenresService,
    private readonly productDetailsService: ProductDetailsService,
    private readonly projectsService: ProjectsService,
    private readonly uploadService: UploadService,
    private readonly chapterDetailService: ChapterDetailService,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}
  @Get('list')
  async findAll() {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    // await page.setJavaScriptEnabled(true);
    // await page.setDefaultNavigationTimeout(0);
    const array_item = [];
    for (let index = 1; index < 5; index++) {
      const new_url =
        index == 1
          ? `https://www.viator.com/Hanoi/d351-ttd/`
          : `https://www.viator.com/Hanoi/d351-ttd/${index}`;
      console.log(new_url);
      await page.goto(new_url, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
      // await page.setViewport({
      //   width: 1200,
      //   height: 800,
      // });
      //await this.autoScroll(page);
      // scroll down end of page
      // await page.evaluate(() => {
      //   window.scrollTo(0, 60000);
      // });
      // extract the titles from web page
      //   const titles = await page.evaluate(() => {
      //     const links = Array.from(document.querySelectorAll('h3.spot__heading'));
      //     return links.map(a => ({
      //         title: a.innerText,
      //     }));
      // });
      // const imgUrl = await page.evaluate(() => {
      //   return document
      //     .querySelector('.imageContainer__13XR > img')
      //     .getAttribute('src');
      // });
      // console.log('imgUrl', imgUrl);
      // const getThemAll = await page.$$('.imageContainer__13XR > .image__zGpq');
      // getThemAll.forEach((element: any) => {
      //   console.log(element.getAttribute('src'));
      // });
      const element = await page.waitForSelector('.productsListProducts__2m5A'); // select the element
      const lis = await page.$$(
        '.productsListProducts__2m5A > .productListCardWithDebug__3lZY',
      );
      for (const content of lis) {
        await page.waitForTimeout(1000);
        const name = await content.$('.imageContainer__13XR > img');
        name.scrollIntoView();
        const gameName = await page.evaluate(
          (el) => el.getAttribute('src'),
          name,
        );
        console.log('Game Name: ', gameName);
      }
      // const value = await element.evaluate((el) => el.getAttribute('src'));
      // console.log(value);

      // await page.evaluate(() => {
      //   const elements = document.getElementsByClassName('image__zGpq');
      //   for (const element of elements) {
      //     const _element: any = element;
      //     console.log(_element);
      //   }
      // });
      // const list_data: any = await page.$$eval(
      //   '.productsListProducts__2m5A > .productListCardWithDebug__3lZY',
      //   (links) => {
      //     // Make sure the book to be scraped is in stock
      //     // Extract the links from the data
      //     // this.delays(2000);
      //     return links.map((el) => ({
      //       title: el.querySelector<HTMLElement>('h2.title__1Wwg').innerText,
      //       link: el.querySelector<HTMLLinkElement>(
      //         'a.productListCardWrapper__PO7V',
      //       ).href,
      //       img:
      //         el
      //           .querySelector<HTMLImageElement>('.imageContainer__13XR > img')
      //           ?.getAttribute('src') || '',
      //       alt_imge:
      //         el
      //           .querySelector<HTMLImageElement>('.imageContainer__13XR > img')
      //           .getAttribute('alt') || '',
      //       desc_short: el
      //         .querySelector<HTMLDivElement>('.description__2Knx > div')
      //         .innerText.trim(),
      //     }));
      //   },
      // );
      // console.log(list_data);

      // array_item.push(...list_data);
    }
    // console.log(array_item);
    // if (array_item.length > 0) {
    //   for (let index = 0; index < array_item.length; index++) {
    //     const element = array_item[index];
    //     console.log(element);
    //     console.log(element.img.lastIndexOf('/'));
    //     const filename = element.img.substring(
    //       element.img.lastIndexOf('/') + 1,
    //     );
    //     console.log(filename);
    //     if (filename) {
    //       const re_uoload = await this.uploadService.findByName(filename);
    //       if (!re_uoload) {
    //         const rs_url: any = await this.uploadService.add([], element.img);
    //         if (rs_url) {
    //           console.log(rs_url);
    //           const search_product = await this.productsService.findByLink(
    //             element.link,
    //           );
    //           if (search_product.length == 0) {
    //             // const search_cate = await this.categoriesService.findByLink(
    //             //   dataObj[item].link_cat,
    //             // );
    //             const product = new Product();
    //             const title = element.title.split('-')[0].trim();
    //             product.name = title;
    //             product.slug = Helper.convertToSlug(title);
    //             product.projectId = 1;
    //             product.linkExternal = element.link;
    //             product.imageThumnail = JSON.stringify({
    //               src: rs_url[0].externalLink,
    //               alt: element.alt_imge,
    //             });
    //             product.descShort = element.desc_short;
    //             //  product.categoryId = search_cate ? search_cate.id : null;
    //             const rs_product = await this.productsService.addOrUpdate(
    //               product,
    //             );
    //             console.log(rs_product);
    //           } else {
    //             console.log('sản phẩm bị trùng lặp');
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    await page.close();
    await browser.close();
  }
  private delay(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }
  private async scrollRight(page) {
    const elem = await page.$('body');
    const boundingBox = await elem.boundingBox();
    await page.mouse.move(
      boundingBox.x + boundingBox.width / 2, // x
      boundingBox.y + boundingBox.height / 2, // y
    );

    await page.mouse.wheel({ deltaX: 2500 });
  }
  async autoScroll(page) {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = 2000;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight - window.innerHeight) {
            clearInterval(timer);
          }
        }, 100);
      });
    });
  }
  delays(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
}
