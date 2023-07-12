import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
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
import { ReqProductList } from '../products/dto/req-product.dto';
import axios from 'axios';
import { ProductDetail } from '../product_details/entities/product_detail.entity';

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
  async findAll(@Req() req) {
    let _product = null;
    do {
      _product = await this.redis.lpop('product_viator');
      if (_product) {
        _product = JSON.parse(_product);
        try {
          console.log(_product);
        } catch (exce: any) {
          console.log(exce.stack);
          console.log(_product);
          this.redis.rpush('product_viator', _product);
        }
      }
    } while (_product);
    // const reqProductList = new ReqProductList();
    // reqProductList.projectId = 5;
    // const list = await this.productsService.list(req, reqProductList);
    // console.log(list.total);
    // const browser = await puppeteer.launch({
    //   headless: true,
    //   args: ['--no-sandbox'],
    // });
    // const page = await browser.newPage();
    // for (const item of list.rows) {
    //   const fullUrl = `${item.linkExternal}`;
    //   console.log(`begin for ${fullUrl}`);
    //   const dataObj = {};
    //   await page.goto(fullUrl, {
    //     waitUntil: 'domcontentloaded',
    //     timeout: 30000,
    //   });
    //   dataObj['title_detail'] = await page.$eval(
    //     'h1.title2__C3R7',
    //     (item) => item.innerHTML,
    //   );
    //   dataObj['price'] = await page.$eval(
    //     '.availabilitySearchWrapper__2t0X > h2 > span.moneyView__2HPx.defaultColor__1NL9',
    //     (item) => item.textContent,
    //   );
    //   await page.waitForTimeout(1000);
    //   dataObj['Overview'] = await page.$eval(
    //     '.productInfoCol__26F0 .overviewWrapper__bMs4',
    //     (item) => item.innerHTML,
    //   );
    //   const contents = await page.$$eval(
    //     '.productInfoCol__26F0 > .section__3AOF',
    //     (links) => {
    //       const content = links.map((el) => ({
    //         content_child: el.querySelector('.sectionContentWrapper__2gNE')
    //           .innerHTML,
    //       }));
    //       return content;
    //     },
    //   );
    //   dataObj['contents'] = '';
    //   for (const item of contents) {
    //     dataObj['contents'] = dataObj['contents'] + item.content_child;
    //   }
    //   const product = await page.evaluate(async () => {
    //     // use window.readfile to read contents of a file
    //     return await (window as any).__PRELOADED_DATA__.pageModel.product;
    //   }); // .taLocationId;productCode
    //   const supplierImages = [];
    //   product.mediaGallery.supplierImages.forEach((item) => {
    //     supplierImages.push({
    //       src: item.fullSizeImage.src,
    //       alt: item.fullSizeImage.alt,
    //     });
    //   });
    //   const travellerImages = [];
    //   product.mediaGallery.travellerImages.forEach((item) => {
    //     travellerImages.push({
    //       src: item.fullSizeImage.src,
    //       alt: item.fullSizeImage.alt,
    //     });
    //   });
    //   console.log(dataObj);
    //   const rs_pro_detail = await this.productDetailsService.findByName(
    //     dataObj['title_detail'],
    //   );
    //   if (!rs_pro_detail) {
    //     const product_detail = new ProductDetail();
    //     product_detail.name = dataObj['title_detail'];
    //     product_detail.shortDescription = dataObj['Overview'];
    //     product_detail.description = dataObj['contents'];
    //     product_detail.imageThumnail = JSON.stringify(supplierImages);
    //     product_detail.travellerImages = JSON.stringify(travellerImages);
    //     product_detail.price =
    //       parseInt(dataObj['price'].replace('$', '')) * 23672;
    //     product_detail.productId = item.id;
    //     product_detail.projectId = 5;
    //     await this.productDetailsService.addOrUpdate(product_detail);
    //   } else {
    //     console.log('sản phẩm đã tồn tại');
    //   }
    // }
    // await page.close();
    // await browser.close();
  }
  @Get('setCateViator')
  public async cate_viator() {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
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
      const lis = await page.$$(
        '.productsListProducts__2m5A > .productListCardWithDebug__3lZY',
      );
      for (const content of lis) {
        await page.waitForTimeout(1000);
        const title = await content.$eval(
          'h2.title__1Wwg',
          (item) => item.innerText,
        );
        const link = await content.$eval(
          'a.productListCardWrapper__PO7V',
          (item) => item.href,
        );
        const image = await content.$('.imageContainer__13XR > img');
        image.scrollIntoView();
        const src_image = await page.evaluate(
          (el) => el.getAttribute('src'),
          image,
        );
        const alt_imge = await content.$eval(
          '.imageContainer__13XR > img',
          (item) => item.getAttribute('alt'),
        );
        const desc_short = await content.$eval(
          '.description__2Knx > div',
          (item) => item.innerText.trim(),
        );

        const rs_url: any = await this.uploadService.add([], src_image);
        if (rs_url) {
          console.log(rs_url);
          const search_product = await this.productsService.findByLink(link);
          if (search_product.length == 0) {
            const product = new Product();
            const _title = title.split('-')[0].trim();
            product.name = _title;
            product.slug = Helper.convertToSlug(_title);
            product.projectId = 5;
            product.linkExternal = link;
            product.imageThumnail = JSON.stringify({
              src: rs_url[0].externalLink,
              alt: alt_imge,
            });
            product.descShort = desc_short;
            const rs_product = await this.productsService.addOrUpdate(product);
            this.redis.rpush('product_viator', JSON.stringify(rs_product));
            console.log(rs_product);
          } else {
            console.log('sản phẩm bị trùng lặp');
          }
        }
      }
    }
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
